<script setup>
import { useCurrentType } from '@/stores/useCurrentType.js';
import { computed } from 'vue';
import { donors } from '@/data/donors.js';
import { useState } from '@/stores/useState.js';

const { getCurrentType } = useCurrentType();
const { state } = useState();

const sidebarStyles = computed(() => {
  const type = getCurrentType();
  return {
    '--bg-color': type?.bgColor,
  };
});

</script>

<template>
  <div class='overlay'>
    <div class='sidepanel' :style='sidebarStyles'>
      <div class='section rad-bl-tr welldone'>
        <h1>Well done!</h1>

        <h2>
          You named {{ state.numFound }} {{ state.gen }} Pokémon in {{ state.timer.elapsed }} seconds in Pokédex order!
        </h2>

        <p>
          Challenge yourself further, try naming them without shadows. <br>({{ state.numShadows }} shadows used)
        </p>
      </div>

      <div class='section rad-bl-tr supporters'>
        <p class='small'>
          Project developed/maintained for free.<br> We want to keep it alive and ad-free.<br>
          If you enjoy playing and want to support it, you can do so via Ko-Fi:
        </p>

        <p>
          <a href='https://ko-fi.com/pkmnquiz' target='_blank'>
            <img class='kofi2' src='@/assets/kofi-tag.webp' alt='Ko-Fi' />
          </a>
        </p>

        <h2>Supporters:</h2>
        <div class='scrollbox'>
          <ol>
            <li v-for='donor in donors' :key='donor'>
              {{ donor }}
            </li>
          </ol>
        </div>

        <p class='small'>We appreciate every bit of support.</p>
      </div>

      <p class='small'>Click anywhere to close</p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 6;
  cursor: pointer;
  background: linear-gradient(90deg, rgb(0 0 0 / 0%) 0%, rgb(16 17 14 / 10%) 20%, rgb(16 17 14 / 30%) 50%, rgba(16, 17, 14, 0.8015581232492998) 100%);
}

.sidepanel {
  position: absolute;
  right: 0;
  text-align: center;
  width: 330px;
  height: 100%;
  color: white;
  padding: 20px 10px;
  box-sizing: border-box;
  background-color: var(--bg-color, var(--primary));
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
}

.section {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 16px 20px;
}

h1,
h2 {
  margin: 0;
  line-height: 32px;
}

.welldone {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.small {
  font-size: 0.9em;
}

.kofi2 {
  height: 50px;
}

.supporters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  overflow: hidden;
}

.scrollbox {
  overflow: auto;
}

li {
  list-style-type: none;
}

</style>