const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { height: 900, width: 1280 } });
  page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));

  await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.getByText('New Game', { exact: true }).click();
  await page.waitForTimeout(800);
  await page.locator('div.cell', { hasText: 'AttackDex' }).first().click();
  await page.waitForTimeout(800);
  await page.locator('div.cell', { hasText: 'Full Quiz' }).first().click();
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const sections = document.querySelectorAll('.sprite-container section');
    return { sectionsCount: sections.length };
  });
  console.log('AttackDex sections:', JSON.stringify(info));

  // Also verify pokemon data still loads fine in a normal (non-attackdex) run
  await browser.close();

  const browser2 = await chromium.launch();
  const page2 = await browser2.newPage({ viewport: { height: 900, width: 1280 } });
  await page2.goto('http://localhost:5183/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(2000);
  await page2.getByText('New Game', { exact: true }).click();
  await page2.waitForTimeout(800);
  await page2.locator('div.cell', { hasText: 'Free Mode' }).first().click();
  await page2.waitForTimeout(800);
  await page2.locator('div.cell', { hasText: 'Full Quiz' }).first().click();
  await page2.waitForTimeout(1500);
  const bodyText = await page2.textContent('.header, header, body');
  const pokemonCount = await page2.evaluate(() => document.querySelectorAll('.sprite-container').length);
  console.log('Pokemon mode sprite-containers:', pokemonCount);
  console.log('Score text present:', bodyText.includes('/ 10') || bodyText.includes('1025'));
  await browser2.close();
})();
