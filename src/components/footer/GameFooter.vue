<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import GitHubIcon from '@/components/common/icons/GitHubIcon.vue';
import { useCredits } from '@/stores/useCredits';

const { toggleShowCredits } = useCredits();

const { t } = useI18n();
</script>

<template>
  <footer class="footer rad transition-element">
    <!-- Authors -->
    <div class="footerRow first">
      <i18n-t
        keypath="footer.projectBy"
        class="p1"
        tag="p"
      >
        <template #charon>
          <a
            href="https://linktr.ee/adeptcharon"
            target="_blank"
          >
            Charon
          </a>
        </template>

        <template #mallowigi>
          <a
            href="https://github.com/mallowigi"
            target="_blank"
          >
            Mallowigi
          </a>
        </template>
      </i18n-t>

      <a
        href="https://github.com/mallowigi/pkmnvuequiz"
        target="_blank"
      >
        <GitHubIcon class="github" />
      </a>
    </div>

    <div class="footerRow">
      <!-- Original Project -->
      <i18n-t
        keypath="footer.originalProject"
        class="p2"
        tag="p"
      >
        <template #location>
          <a
            href="https://pkmnquiz.com/"
            target="_blank"
            >https://pkmnquiz.com/</a
          >
        </template>

        <template #donation>
          <a
            href="https://ko-fi.com/pkmnquiz"
            target="_blank"
          >
            <img
              class="kofi"
              src="@/assets/kofi-tag.webp"
              alt="Ko-fi donation button"
            />
          </a>
        </template>
      </i18n-t>

      <!-- Sprites -->
      <i18n-t
        keypath="footer.sprites"
        class="p2"
        tag="p"
      >
        <template #artists>
          <span
            class="link"
            @click="toggleShowCredits()"
            >{{ t('variousArtists') }}
          </span>
        </template>

        <template #project>
          <a
            href="https://www.deviantart.com/pikafan2000/art/National-Pokedex-Version-Delta-Icon-Dex-824897934"
            target="_blank"
            >Icon Dex Project</a
          >
        </template>
      </i18n-t>

      <!-- Resources -->
      <i18n-t
        keypath="footer.resources"
        class="p2"
        tag="p"
      >
        <template #pokeapi>
          <a
            href="https://github.com/PokeAPI/"
            target="_blank"
            >PokéAPI</a
          >
        </template>

        <template #sprites>
          <a
            href="https://msikma.github.io/pokesprite/overview/dex-gen8.html"
            target="_blank"
            >Pokésprite Database
          </a>
        </template>
      </i18n-t>

      <p class="p2">
        {{ t('footer.license') }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--black);
  color: #fff;
  margin: 10px 10px 0;
  padding: 11px 14px;
}

.p1 {
  font-size: 1.15em;
  display: inline-block;
}

.p2 {
  font-size: 0.9em;
}

.footerRow {
  line-height: 30px;

  &.first {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.link {
  cursor: pointer;
  color: var(--type-inline-color, var(--primary));
}

.kofi {
  height: 24px;
  vertical-align: middle;
  margin: 0 8px;
}

.github {
  display: inline-flex;
}
</style>
