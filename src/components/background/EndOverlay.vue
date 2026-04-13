<script setup>
import { useCurrentType } from '@/stores/currentType.js';
import { computed } from 'vue';

const { getCurrentType } = useCurrentType();
const sidebarStyles = computed(() => {
  const type = getCurrentType();
  return {
    '--bg-color': type?.bgColor,
  };
});

</script>

<template>
  <div class='overlay'>
    <div class='sidepanel bigbox2 lime'
         :style='sidebarStyles'
    >
      <div class='winbutton pointer tmarg2'>
        <div class='welldone'>Well done!</div>
        <hh>You named
          <div id='currentcount'></div>
          <div id='gen-name'></div>
          Pokémon <br>in
          <div id='timer-score'></div>
          <span id='order-congrats'> in Pokédex order!</span>
        </hh>
        <div id='trychallenge'>
          <br>
          <p>Challenge yourself further <br>try naming them without shadows. (<span id='shadow-count'></span> shadows
            used)</p>
        </div>
      </div>

      <div class='winbutton pointer suppbox' onclick='handleKofiClick(event)'>
        <pp>Project developed/maintained for free.<br> We want to keep it alive and ad-free.<br>
          If you enjoy playing and want to support it, you can do so via Ko-Fi:
        </pp>
        <!--<pp>-->
        <!--  <a href='https://ko-fi.com/pkmnquiz' target='_blank'>-->
        <!--    <img class='kofi2' src='@/assets/kofi-tag.webp'>-->
        <!--  </a>-->
        <!--</pp>-->
        <br>
        <hh>Supporters:</hh>
        <div class='scrollbox'>
          <div id='donors'>
            <ol>
              <li>mandjtv</li>
              <li>Somebody</li>
              <li>The Paw Bakery</li>
              <li>NoraInTheFuture</li>
              <li>Aislinn</li>
              <li>mae</li>
              <li>Gastrodon Best</li>
              <li>LiteSpeed</li>
              <li>the flapple guy</li>
              <li>Fluffy Lego</li>
              <li>Hoenn Fan</li>
              <li>Isaac</li>
              <li>Kuchoo</li>
              <li>Serperior</li>
              <li>Cerberus</li>
              <li>liz</li>
              <li>Shark</li>
              <li>Umbreon374</li>
              <li>Shazza05</li>
              <li>Sam C</li>
              <li>Stottystott</li>
              <li>Sarah</li>
              <li>Maya</li>
              <li>GhostNappa</li>
              <li>Zeyla</li>
              <li>SeidrFox</li>
              <li>DampRegn</li>
              <li>Penelope and JueYan</li>
              <li>Dillon</li>
              <li>Michael</li>
              <li>Lilac1672</li>
              <li>DIana</li>
              <li>Zen</li>
              <li>Danga Smoove</li>
              <li>Aurelio</li>
              <li>Apartemis</li>
              <li>Aliabz</li>
              <li>Dilan</li>
              <li>Danielle and Marco</li>
              <li>Yap</li>
              <li>PinkAura</li>
              <li>Andrés Cárdenas</li>
              <li>NicoVIII</li>
              <li>Mochimanoban</li>
              <li>Lets_go_Lizerax</li>
              <li>limb</li>
              <li>SunnySunkern</li>
              <li>Ry</li>
              <li>aBBy513</li>
              <li>Limo2077</li>
              <li>Ilaria</li>
              <li>Mega Garchomp Z's Biggest Hater</li>
              <li>Angelos</li>
              <li>Petrachor</li>
              <li>gabe</li>
              <li>Giovanni</li>
              <li>jonnitor</li>
              <li>maart18x</li>
              <li>NG</li>
              <li>Danni</li>
              <li>AisMoises</li>
              <li>Rea</li>
              <li>Sn0ppiS</li>
              <li>Lemon</li>
              <li>Fabio</li>
              <li>Christin and Tet</li>
              <li>Crimson Kitty</li>
              <li>petitpois22</li>
              <li>MissBandy</li>
              <li>Tipzies</li>
              <li>MaxDemiboy</li>
              <li>dabe</li>
              <li>pokelover</li>
              <li>FrostySuu</li>
              <li>Curtis</li>
              <li>Swampy</li>
              <li>Tom</li>
              <li>Hedron</li>
              <li>Shannon</li>
              <li>sukka</li>
              <li>Risu</li>
              <li>Josh</li>
              <li>Callum is owned by MemeBible</li>
              <li>Yubel Dark</li>
              <li>Narwhal</li>
              <li>Cyan</li>
              <li>Fire3Falcon</li>
              <li>L</li>
              <li>Atlas_16</li>
              <li>TheMadCroctor</li>
              <li>JoJo</li>
              <li>DONT FORGET ZANGOOSE</li>
              <li>JoshHernandez</li>
              <li>floraCoffea</li>
              <li>EMH_Richard</li>
            </ol>
          </div>
        </div>
        <div class='padtop'>
          <pp>We appreciate every bit of support.</pp>
        </div>
      </div>
      <div class='padtop'>
        <pp>Click anywhere to close</pp>
      </div>
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
  background-color: var(--bg-color, var(--primary));
}

</style>