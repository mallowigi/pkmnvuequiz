import { useWindowSize } from '@vueuse/core';
import { reactive, onUnmounted, computed, nextTick } from 'vue';

import { WalkingDirection, type Point, type Rectangle, type WanderingAnimation } from '@/types.ts';
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

  // The wandering loop: make a sprite walk to a given target, then pick a new target and repeat.
  const loop = () => {
    const target = pickTarget(rect.value, margin, wanderingState.position, 100);
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
      // random pause between 1 and 4s
      const pauseMs = Math.random() * 3000 + 1000;
      timer = setTimeout(loop, pauseMs);
    }, legDurationMs);
  };

  const startWandering = () => {
    stopWandering();
    // take a position at random
    wanderingState.position = {
      x: Math.random() * (rect.value.width - margin * 2) + rect.value.x + margin,
      y: Math.random() * (rect.value.height - margin * 2) + rect.value.y + margin,
    };

    requestAnimationFrame(() => {
      loop();
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
