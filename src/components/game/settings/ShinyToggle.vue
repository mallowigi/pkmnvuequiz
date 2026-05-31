<script setup lang="ts">
import RoundedButton from '@/components/common/RoundedButton.vue';
import { useMessages } from '@/stores/useMessages.js';
import { useState } from '@/stores/useState.js';

const { state, toggleShowShinies } = useState();
const { showUserMessage } = useMessages();

const toggleShiny = () => {
  toggleShowShinies();
  showUserMessage(state.withShinies ? 'Shiny Charm active' : 'Shiny Charm inactive');
};
</script>

<template>
  <RoundedButton
    v-tooltip="'Toggle Shiny Charm On/Off'"
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
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 35px;
  }

  &:hover {
    background-color: #ff7b9a;
    border-color: #ff7b9a;
  }

  &.selected {
    background-color: var(--type-btn-color);
    border-color: var(--type-btn-color);
  }
}
</style>
