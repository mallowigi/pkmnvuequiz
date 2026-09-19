<script setup lang="ts">
import Icon from '@/components/common/icons/Icon.vue';

// Split silhouette: left half is Mega Mewtwo X, right half is Mega Mewtwo Y,
// visually representing the "cycle between sprite forms" toggle.
const mewtwoX =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAAElUlEQVR4nO2aIZCjSBSG/1xdVdquXJlzyEQiRzJu44ZVtzLrEjecY9QRGbezjjhGXVrtxS2nDtQVEpfI1JipdqxgXgd6yG52l25yVfxVVKBpCP3x+vXr1wyKokCvo37p+gEuTT0QRT0QRT0QRT0QRT0QRT0QRT0QRT0QRT0QRT0QRcaBMMYKxtjFTqA6sRAexfgWlK7AddZlCIracDrO80Mnz9UZkG36AB7FyPMD8vwgQSy8BbqCAQC/mvwzxljBoxjb9AGzd7e1c3l+wOr+TpZnSdZ4Pe0LIQY6ntEoENLV+M2LsizJMHt3K0E4U7vWaMZY4U+XmIzH8hhoH4wxIOQXsiSDNbFkOQGolp0SwQAA7m/lfduE0mkcQnCqMM4BAwA+9wCUYNocjYwAabIO1VJUqUOzEGJAEADAc3wJxZ8uW4NycZFqkzMlxXGMJE1PHrehTpxqk3W8X7zF7Ob2xBWlhBADxliBqH7sT5fSSn7WnxixECHEYDR61XjOda/xfvEW64/rs+9FW5vPSDJmIfQ28/wAa2KBh2vwlCOOYzw+Pr6orw67pmTMhzDGipW/kseOe4NNtMFvfwgAwOdP/x3PdQQDMOxDHPdG7mdJBh7FABJ8/lSW+ctF+duSP/gRGe8yPIqRZylGVhlkEQQAcF5P5f45UMihtimjkSr3t0cAPAQAePNAAvKXixqULmQ8DvEcH57jAwBcxwUACcNzfBme833UasB1rjoNzEbWGHmWIs/SmmXwfYQ4jr96rY7uAhgEIoQYON5VrYyCs5CH0jJW6RLePMDKX8GL5mePNt9T92sybiHV+QgA6VwBYCs4NtEGztTGyBqfTDXqsg7AkFOlRpXDbDmyePOgFsJvBUfgB/ItyxHpOZtWLdcFAwAGur8gYowVtm3DmwdyhPHmAayJhXDxEW7wu6w7Gr2qAaFUouteS5/SBKOt7gJothB6y0BpFWG4AVA20Hk9xWQ8rlkJWYN6n+p1uqUNSDUIC3nYCAMAkvU/EggP16haBSlLMmzTh8b/adM6AI1dhuYuVRhA2VCKQ0hJmoLvo1o9qttURkN02zAAjRZCobpt23Dda9hX9otMO4nvI3jzQB6r1mFNrBdWogMGoNmHEJSVv6pN7JI0PXaZ54xXtdFNPqPsVm8Q+AFixP/vZYiQhwh5CPvKhuu4CJ/nMarKhHNpRQSDcieOe4M8K+HpnAVrD8yEEIM4juE6LkZsBKCcw/B9VKtHudTV/R1W93e1LnQKoA5pj0NI0p88T+iAsqHkIFU/QqIgLs9SzLyZ9sSRMSBAM5SZN6vVobgFKDNnVZlIGBmdy1D3IdEbr25NEHQmlVVd3LoMUM+imZbx1f9qorlJcu1lfly9M5lbNTrbte1jdzDhIH9E2oFUQ3hypucMo3J+Y9hKjEz/AYC6ysyb1fabGqp+UlVNC2hXURRGtuFwWAyHw0Ldb6q32z0VH/78UOx2T8Xff/1b7HZPJ+u3vRnNqdJbPjWMkmXQOnCWZMiztPw9kStpW0YDs3NEjaYuU10kN9FtLg4ISdc3ZN/SxQLpShcZqXapL/n1gALVgKC2AAAAAElFTkSuQmCC';
const mewtwoY =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAAEnUlEQVR4nO2aL3DrNhzHv9kNiD62sgW6LIEuC3RYw6KwhSUsfugZuiwZe6xXprCU2SO7PlSP2Wj1mMc6lisT80AmRVac9L2bJT/g713v7MjqSZ/76ffP7pVliU5H/dD2Ar43dUA0dUA0dUA0dUA0dUA0dUA0dUA0dUA0dUA0/dj2AgCAEHJSP3DOe22spVUgAkRR7Cu/52kOQkjZBpReW8UdIaQUIPI0BwA4Q0eO52kOb+Jat5RWgOgwvIkrx1Rr6fc/WAfSqlON2VZagfjr9z+0uST7PoQQUvqBL4+J67oVp+q67tm5NmTFQgghpbrp0eAW4cZHwQsEqzWKYo+i2MN1XQSrNYCD9QhYdVHIlKxZSLxLpCWEGx+MRbXPCcfKYgZ35MrnxFzTPsWqD4l3CVz3uElKx6B0DODgXN2RW7le/PJJzhVWZNparPqQOstgLJJQxNhT9liBoSoOn4zmKFaAcM57aqjVde74nJNJKK2GXcYixGx78vtocPvu3HCyMXJ8rEWZc9bh0WnlXoTjPM3ltT5mUlYtRN2srqU/q/29AibnAIA0ywCYsRIrQC5loJSOsfRn2D6cHh1VNqwDsBhlVMfqDB3EbIs4i5EkCd7e3mrnqDVOONkAAP7+J8fPPznyen4zb9TBWgNCCCk/h5/lvUenWAQL5DfXAIDn3/88jv0HQt0kIaSc38wBHECYkrVqV3esdUegDoT+PwQUVffP941lsNaPTLxLUOQZ+s4AwCFZA4AkSVrrkqlqBIjq6S9tSkABjlVtsFqjyDMEq/W79YqYX2clTel/AyGElOFkg+FgIO+By5sSzwmf0ncGcIYOimKPpT9rrX0INGQhAgZwSKvTLLu4KQHDo1PkaS4r3KU/w2L6Cd7Aaw1KY3lIGAfyWgWkS8BgMQMAFHkmx6JdBG/iou8MKu0Cda7J4wI0AIRz3vOCEQIvrEDRJRo9auiN2fYkdeec90S0qYOiq8kIAzR0ZGQECZ8QxsFJxCCElGo3LNz40pmKI6M2lCsRSemBmLYOoMGwq0JJr44+RGxMSMD4GgnfUhR72TNR1bR1AA3XMuL4AMfCS4fBWHTop+YZPDqtbFocq7pjwliEl/KlyeXWqvHETM016mBQOj7bBxG5idpiPNc8MmEdgKFMVYWSbv9A/Lo7ecaj04pTvbR5IcYiiKrZVEg2Wv4//vogr5MkORlXYdT5FbXfqspkfmIMCOe8d/98DwC47l1XxtTCru69rhClYwReiLvZR+Qsw93so6nlShkt7tSjo0acb4k0aZbhpXzB+13WZmS8Yybe2Yprb+KCelRWuUJ1/dNgtUb8uoN3NcHjb1tjjlRVa2//Rfqu+hY1KgGHtH4RLOS9jdqm1dcQ1KMAjlaktgwBYBEsKl8G2FhTq0DEhsV9HRTbsg5EHJd9xmWDWB3/1uKuaVkFIppJ+4wj2K1k91x/xuaadLXy0Z3omge71UlVfDe5k89l2y94XD5YbRZZBaLnJXXPRK8R/OEc/MtfiF4jOFfmS35V1i3kq5rQwwOEJElwa7kb39pnmZdk62uhOn2XQNpU9627pg6Ipn8BsajudJCPHwUAAAAASUVORK5CYII=';
</script>

<template>
  <Icon>
    <div class="cycle-sprites-icon">
      <img
        :src="mewtwoX"
        alt=""
        class="sprite sprite-left"
      />
      <img
        :src="mewtwoY"
        alt=""
        class="sprite sprite-right"
      />

      <div class="divider" />
    </div>
  </Icon>
</template>

<style scoped>
.cycle-sprites-icon {
  position: relative;
  width: 28px;
  height: 28px;
  scale: 2;
  display: flex;
}

.sprite {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: high-quality;
}

.sprite-left {
  clip-path: inset(0 50% 0 0);
}

.sprite-right {
  clip-path: inset(0 0 0 50%);
}

.divider {
  position: absolute;
  top: 10%;
  bottom: 10%;
  left: 50%;
  width: 1px;
  opacity: 0.5;
  border: 0.5px dashed black;
  transform: translateX(-50%);
}
</style>
