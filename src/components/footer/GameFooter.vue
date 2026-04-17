<script setup>
import { useCredits } from '@/stores/useCredits.js';

const { toggleShowCredits } = useCredits();
</script>

<template>
  <footer class="footer rad transition-element">
    <div class="row">
      <p class="p1">
        Project by <a href="https://linktr.ee/adeptcharon" target="_blank">Charon</a>.&emsp; Rewritten in Vue by
        <a href="https://github.com/mallowigi" target="_blank">Mallowigi</a>.
      </p>
    </div>

    <div class="row">
      <p>
        Original Project found at <a href="https://pkmnquiz.com/" target="_blank">https://pkmnquiz.com/</a>.

        <a href="https://ko-fi.com/pkmnquiz" target="_blank">
          <img class="kofi" src="@/assets/kofi-tag.webp" alt="Ko-fi donation button" />
        </a>
      </p>

      <p>
        Custom &amp; modified sprites made by <span class="link" @click="toggleShowCredits()">various artists ≡</span>
        as part of the
        <a
          href="https://www.deviantart.com/pikafan2000/art/National-Pokedex-Version-Delta-Icon-Dex-824897934"
          target="_blank"
          >Icon Dex Project</a
        >.
      </p>

      <p>
        Resource for data: <a href="https://github.com/PokeAPI/" target="_blank">PokéAPI</a>.&emsp; Resource for
        sprites:
        <a href="https://msikma.github.io/pokesprite/overview/dex-gen8.html" target="_blank">Pokésprite Database</a>.
      </p>

      <p>
        This project is an unofficial derivative work based on Pokémon. Official sprites belong to © Nintendo/Creatures
        Inc./GAME FREAK Inc.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #111;
  color: #fff;
  margin: 10px 10px 0;
  padding: 11px 14px;
}

.row {
  line-height: 30px;

  & p {
    font-size: 0.9em;
  }
}

.link {
  cursor: pointer;
  color: var(--primary);
}

.kofi {
  height: 24px;
  vertical-align: middle;
  margin: 0 8px;
}
</style>
