import { useWindowSize } from '@vueuse/core';
import { reactive, onUnmounted, computed } from 'vue';

import { WalkingDirection, type Point, type Rectangle } from '@/types.ts';
import { clamp, randomBetween } from '@/utils/utils.ts';

type WanderingSpriteState = {
  position: Point;
  direction: WalkingDirection;
  isMoving: boolean;
  legDuration: number;
};

const MIN_LEG_MS = 500;

const getLegDurationMs = (distance: number, speed: number) => {
  return Math.max((distance / (speed || 30)) * 1000, MIN_LEG_MS);
};

const pickTarget = (bounds: Rectangle, margin: number, from: Point, maxLeg: number): Point => {
  const left = bounds.x + Math.min(margin, bounds.width / 2);
  const right = bounds.x + bounds.width - Math.min(margin, bounds.width / 2);
  const top = bounds.y + Math.min(margin, bounds.height / 2);
  const bottom = bounds.y + bounds.height - Math.min(margin, bounds.height / 2);

  const origin = {
    x: clamp(from.x, left, right),
    y: clamp(from.y, top, bottom),
  };

  return {
    x: randomBetween(Math.max(left, origin.x - maxLeg), Math.min(right, origin.x + maxLeg)),
    y: randomBetween(Math.max(top, origin.y - maxLeg), Math.min(bottom, origin.y + maxLeg)),
  };
};

const getDirectionFromVector = (dx: number, dy: number): WalkingDirection => {
  const theta = Math.atan2(dy, dx);
  const translatedTheta = Math.PI / 2 - theta;
  const directionIndex = Math.round(translatedTheta / (Math.PI / 4));
  return (directionIndex + 8) % 8;
};

export const useWanderingSprite = ({ speed = 30, margin = 0 }: { speed?: number; margin?: number } = {}) => {
  const wanderingState = reactive<WanderingSpriteState>({
    direction: WalkingDirection.Down,
    isMoving: false,
    legDuration: 0,
    position: { x: 0, y: 0 },
  });

  let timer: ReturnType<typeof setTimeout>;

  const { height, width } = useWindowSize();
  // The walkable area is the whole window; being computed, it follows window resizes.
  const rect = computed<Rectangle>(() => ({
    height: height.value,
    width: width.value,
    x: 0,
    y: 0,
  }));

  const walkTo = (target: Point) => {
    const dx = target.x - wanderingState.position.x;
    const dy = target.y - wanderingState.position.y;
    const distance = Math.hypot(dx, dy);
    const direction = getDirectionFromVector(dx, dy);
    const legDurationMs = getLegDurationMs(distance, speed);

    wanderingState.direction = direction;
    wanderingState.isMoving = true;
    wanderingState.position = target;
    wanderingState.legDuration = legDurationMs;

    // Pause in legDurationMs
    timer = setTimeout(() => {
      wanderingState.isMoving = false;
      pauseThenLoop();
    }, legDurationMs);
  };

  // The wandering loop: walk to a random target, pause for 1 to 4s, then pick a new target and repeat.
  const pauseThenLoop = () => {
    timer = setTimeout(loop, Math.random() * 3000 + 1000);
  };

  const loop = () => {
    walkTo(pickTarget(rect.value, margin, wanderingState.position, 100));
  };

  // Picks a random edge: the sprite starts just outside it and walks in by `margin`.
  const pickEntrance = (): { from: Point; to: Point } => {
    const { width, height } = rect.value;
    const inset = Math.min(margin, width / 2, height / 2);
    const randomX = randomBetween(inset, width - inset);
    const randomY = randomBetween(inset, height - inset);

    switch (Math.floor(Math.random() * 4)) {
      case 0:
        return {
          from: { x: randomX, y: -margin },
          to: { x: randomX, y: inset },
        };
      case 1:
        return {
          from: { x: width + margin, y: randomY },
          to: { x: width - inset, y: randomY },
        };
      case 2:
        return {
          from: { x: randomX, y: height + margin },
          to: { x: randomX, y: height - inset },
        };
      default:
        return {
          from: { x: -margin, y: randomY },
          to: { x: inset, y: randomY },
        };
    }
  };

  const startWandering = () => {
    stopWandering();

    const { from, to } = pickEntrance();
    wanderingState.position = from;

    requestAnimationFrame(() => {
      walkTo(to);
    });
  };

  const resumeWandering = () => {
    stopWandering();
    requestAnimationFrame(() => {
      loop();
    });
  };

  const stopWandering = () => {
    clearTimeout(timer);
    wanderingState.isMoving = false;
  };

  onUnmounted(() => {
    stopWandering();
  });

  return {
    resumeWandering,
    startWandering,
    stopWandering,
    wanderingState,
  };
};
