<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';

const { state, displayShadows } = useState();
const { setDialog } = useDialogs();
const { showRemainingShadows } = usePokemons();

const { flowState } = useGameFlow();

const toggle = () => {
  if (!state.withShadows) {
    setDialog('shadows', () => {
      displayShadows();
      showRemainingShadows();
    });
  }
};
</script>

<template>
  <RoundedButton
    title="Toggle Pokemon Shadows (this action cannot be undone)"
    class="rad-br-tl shadows-toggle"
    v-game-ended
    :class="{ selected: state.withShadows }"
    @click="toggle"
  >
    Shadows
    <img
      src="@/assets/raichu.png"
      alt="silhouette"
    />
  </RoundedButton>
</template>

<style scoped>
.shadows-toggle {
  padding: 9px 14px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  & img {
    margin: -5px;
    width: 52px;
    height: 39px;
    object-fit: none;
    object-position: 50% 100%;
    filter: brightness(0) invert(0.7);
  }

  &.selected {
    background-color: var(--type-btn-color);
    border-color: var(--type-btn-color);
    pointer-events: none;

    & img {
      filter: brightness(0) invert(0.3);
    }
  }

  &:hover {
    background-color: var(--type-dark-color);
    border-color: var(--type-dark-color);

    & img {
      filter: brightness(0) invert(0.8);
    }
  }
}
</style>
