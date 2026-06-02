<script setup lang="ts">
import { credits } from '@/data/credits';
import { useCredits } from '@/stores/useCredits';

const { toggleShowCredits } = useCredits();
</script>

<template>
  <div class="popuptext rad">
    <div
      class="paragraph pointer"
      @click="toggleShowCredits()"
    >
      Artist and quality control credits for custom sprites:
      <div class="close pointer">🞬</div>
    </div>

    <div class="credits-popup">
      <div class="credits-list">
        <div
          v-for="(credit, index) in credits"
          :key="index"
          class="credit-item"
        >
          <div class="sprites">
            {{ credit.sprites.join(', ') }}
          </div>

          <div class="author">
            {{ credit.author }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popuptext {
  width: 75vw;
  height: 70%;
  contain: content;
  background-color: var(--secondary);
  color: var(--text);
  padding: 10px 10px;
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 10%;
  margin-inline: auto;
  border: var(--type-btn-color, var(--primary)) solid 2px;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.close {
  color: var(--type-btn-color, var(--primary));
  font-size: 1.5em;
  line-height: 22px;
}

.paragraph {
  font-size: 1.15em;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 8px;
}

.credits-popup {
  overflow: auto;
  min-height: 0;
}
.credits-list {
  font-size: 0.9em;
  display: grid;
  grid-auto-rows: minmax(0, auto);
  width: 100%;
}

.credit-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  border-top: 2px dotted var(--type-btn-color, var(--primary));
  padding: 5px 0;
}

.sprites {
  flex: 1;
  border-right: 2px dotted var(--type-btn-color, var(--primary));
  padding-right: 5px;
}

.author {
  padding-left: 5px;
}
</style>
