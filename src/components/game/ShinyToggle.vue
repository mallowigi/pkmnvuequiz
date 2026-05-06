<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useState } from '@/stores/useState.ts';
import { useMessages } from '@/stores/useMessages.ts';

const { state, toggleShowShinies } = useState();
const { showUserMessage } = useMessages();

const toggleShiny = () => {
  toggleShowShinies();
  showUserMessage(state.withShinies ? 'Shinies mode active' : 'Shinies mode disabled');
};
</script>

<template>
  <RoundedButton
    class="rad-br-tl shiny-toggle-icon"
    :class="{ selected: state.withShinies }"
    @click="toggleShiny"
  >
    <img
      src="@/assets/shiny.svg"
      alt="Toggle Shinies"
    />
  </RoundedButton>
</template>

<style scoped>
.shiny-toggle-icon {
  min-width: 0;
  padding: 6px;

  & img {
    width: 35px;
    vertical-align: top;
  }

  &:hover {
    background-color: #ff7b9a;
    border-color: #ff7b9a;
  }

  &.selected {
    background-color: var(--type-btn-color, var(--primary));
    border-color: var(--type-btn-color, var(--primary));
  }
}
</style>
