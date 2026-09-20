import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { setGlobalOptions, logger } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';

setGlobalOptions({ maxInstances: 10 });

initializeApp();

export const cleanupExpiredRooms = onSchedule('every 1 hours', async () => {
  const db = getDatabase();
  const roomsRef = db.ref('rooms');
  const expirationThreshold = Date.now() - 60 * 60 * 1000;

  try {
    const snapshot = await roomsRef.get();
    if (!snapshot.exists()) {
      logger.info('No rooms found for cleanup.');
      return;
    }

    const updates: Record<string, null> = {};
    let deletedCount = 0;

    snapshot.forEach((roomSnapshot) => {
      const activeUsersSnapshot = roomSnapshot.child('active_users');
      const ownerId = roomSnapshot.child('ownerId').val();
      const lastActivityAt = roomSnapshot.child('lastActivityAt').val();
      const ownerOnline = typeof ownerId === 'string' && activeUsersSnapshot.child(ownerId).exists();
      const isInactive = !activeUsersSnapshot.exists() || activeUsersSnapshot.numChildren() === 0;
      const isExpired = typeof lastActivityAt === 'number' && lastActivityAt <= expirationThreshold;

      if (!ownerOnline && isInactive && isExpired && roomSnapshot.key) {
        updates[roomSnapshot.key] = null;
        deletedCount++;
      }
    });

    if (deletedCount === 0) {
      logger.info('No expired rooms found for cleanup.');
      return;
    }

    await roomsRef.update(updates);
    logger.info(`Cleaned up ${deletedCount} expired rooms.`);
  } catch (e) {
    logger.error('Error cleaning up expired rooms', e);
  }
});

/**
 * Proxies a move's Bulbapedia artwork through our own server.
 *
 * The client can't hotlink Bulbapedia's image CDN directly: cross-origin requests from a real browser (unlike
 * server-to-server calls) get blocked (403s from anti-hotlink/bot protection), depending on the requester's network.
 * Fetching server-side sidesteps that entirely, and the long Cache-Control header lets browsers/CDNs cache the response
 * so we only hit Bulbapedia once per move per cache window.
 */
export const moveArtwork = onRequest({ cors: true, region: 'us-central1' }, async (req, res) => {
  const title = typeof req.query.title === 'string' ? req.query.title : '';
  if (!title) {
    res.status(400).send('Missing "title" query parameter');
    return;
  }

  try {
    const apiUrl = `https://bulbapedia.bulbagarden.net/w/api.php?${new URLSearchParams({
      action: 'query',
      format: 'json',
      piprop: 'original',
      prop: 'pageimages',
      titles: title,
    })}`;

    const apiResponse = await fetch(apiUrl);
    if (!apiResponse.ok) {
      res.status(502).send('Failed to query Bulbapedia');
      return;
    }

    const data = (await apiResponse.json()) as {
      query?: { pages?: Record<string, { original?: { source?: string } }> };
    };
    const page = Object.values(data.query?.pages ?? {})[0];
    const imageUrl = page?.original?.source;

    if (!imageUrl) {
      res.status(404).send('No artwork found for this article');
      return;
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      res.status(502).send('Failed to fetch artwork image');
      return;
    }

    const contentType = imageResponse.headers.get('content-type') ?? 'image/png';
    const buffer = Buffer.from(await imageResponse.arrayBuffer());

    res.set('Cache-Control', 'public, max-age=2592000, immutable'); // 30 days
    res.set('Content-Type', contentType);
    res.status(200).send(buffer);
  } catch (e) {
    logger.error('Failed to proxy move artwork', e);
    res.status(502).send('Failed to fetch artwork');
  }
});
