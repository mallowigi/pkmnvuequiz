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
  min-width: 500px;
  height: 70%;
  contain: content;
  background-color: rgba(255, 255, 255, 0.9);
  color: #222;
  padding: 10px 10px;
  position: fixed;
  z-index: 10;
  left: calc(50% - 300px);
  top: 10%;
  border: var(--primary) solid 2px;
}

.paragraph {
  font-size: 1.15em;
  padding-bottom: 10px;
}

.close {
  text-align: right;
  color: var(--primary);
  float: right;
  font-size: 1.5em;
  line-height: 22px;
}

.paragraph {
  font-size: 1.15em;
  padding-bottom: 10px;
}

.credits-popup {
  overflow: auto;
  height: 95.5%;
}
.credits-list {
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.credit-item {
  display: flex;
  border-top: 2px dotted var(--primary);
  padding: 5px 0;
}

.sprites {
  flex: 1;
  border-right: 2px dotted #dcdcdc;
  padding-right: 5px;
}

.author {
  width: 200px;
  padding-left: 5px;
  vertical-align: baseline;
}
</style>
