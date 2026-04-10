<script setup>
</script>

<template>
  <div class='playtext' id='playtext'>
    <div id='startfull' class='padfull'>
      <div class='pad rad-bl-tr green' id='gen0'>Full quiz</div>
    </div>

    <div class='row2'>
      <div class='pad rad-bl green' id='gen1'>
        <div class='hidden'>1</div>
        <div class='inline-block'>Gen 1</div>
        <img id='gen1img' alt='Gen 1 sprite'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAADA0lEQVR4nO2aMWgTURjH/2eFF3GozdRsKTiY4iClBHqlSBIdDkGHdqpO7SySUJwiFhoXqYYidNPJujRVEDVLm6PIpVAkdGuHQrNlq+1QyBvkHK53vfuSaJXeq5HvN917ueO+/O573733OM22bTAnXDjvAP41WAiBhRBYCIGFEFgIgYUQWAiBhRBYCIGFEFgIgYUQWAiBhRBYCIGFEFgIgYUQWAiBhRBYCIGFEFgIgYUQWAiBhRBYCIGFEFgIgYUQWAiBhRAuqriJpmmBthDC+2xJSqm1XHAKwvrySYkQF1fEzGbT65tPRmzg78WcNZqKb8w0TYMQwk4XyxgaTbX8XrNMVLJGWyn+bAJOxIUVt1Ih/sygtJNCr/GfE1bcSoqqEMI+PDxs6a9Z5i+voTIAIF0st2TNWaLsLdPb2xtory4t4sOUjvlkJNDf7s/WLBOyVMB+fTvcIKFQyP07g4F2NJ5okaTrOvLTmYAUV4aYyCMaT4Qep7K3TOxpLdAeGk2hAkeUf+ikByPAdAbmTjPQv1/fRjSe6Fh8zwolGSKl1PxDY3VpEYDz+m3cegEAaC7P4dPnL3hd2XOk+DgaHsfWQi50GYDCDDmWYqeLZUTjCe/pN5fnAAD5fCFwfupaBObxUNlayCmbpygTIoSwdV33BLikE5dw8+4A1leeoboCvHpbxcMHOgb6Y6pCC6BkHhKJOJmxX9/G5W8rmH0cLI7rH/dQvT6DodEUNrIZxK98BwDUD/pgWVbb7OjqeQgAVLIGovEELMvCWNJAz24DY0kDY0kD5k7Tm8GOFNdQP+jDQH+so4wwUVZUpZRaJWsAAKrv3gAAvm6WvWO3ptQsEyPFNZg7nWe1YaJ0+e8+7SfvD6BPTqFntwF9cgprpRxkySmqslTARjYTOF8lytYygFNYbzx6CQBeLenZbeDH1RhmnzuzUDGRhywVfjtc/ovlv5+j4XHcvpfz2uli2TsWE3nAMs4jLLUZAnTeHHK3B047I+365f9p+JOdtK4W0k3wJjOBhRB+AoK8SfJxWYV+AAAAAElFTkSuQmCC'
             class='sprite cropped'>
      </div>

      <div class='pad rad green' id='gen2'>
        <div class='hidden'>2</div>
        <div class='inline-block'>Gen 2</div>
        <img id='gen2img' alt='Gen 2 sprite'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAACO0lEQVR4nO2aIWzbQBSGf0+T/MICU2hYWLPIqIEJq1nG1rKGbSyGKUvYBlc2s401bC7KzFxY1oMtW4J27AYmO+6LS98FvE+ydH42eP509+7p5MA5B2XPO98JHBsqhKFCGCqEoUIYKoShQhgqhKFCGCqEoUIYKoShQhgqhKFCGCqEoUIYKoShQhgqhKFCGCqEoUIYKoShQhgqhKFCGCqEoUIYKoShQhgqhKFCGO99J9CGiF79zmStDaRzOAohtYj0Pu2MS4oJfP9jRkSOi2hjKoPqUyUmxesMISIXr+KDeC2hRnKGeBNCRC5JEgziAV6ylya+2WwA+KkfgKclQ0QutzMUucHjty2uf53BlAbz8ztvImrEhRCRu7mfIBpGnc+n9MWrFNE+hIjcbrdDNIxwhnETL3KDIjeSqbyJeGP29+MSAPCANQDAlAYfsgKrNEeRG+R2dtCPSCIu5LFcvrqfxTlOh58BAFH3KhJFXMjz0yVMuV8e1emgGdd1JV7FICLnY6aIbrvW2qC9w0QRgKdLPOMPgHnzXhqfoJckGC/6ICInWWTFi2rdiI2mUedOs/z6GwAwXvSxzraS6QEQFmKtDXo/ewD2H94em9IgjU+a+HjRl0wPgKc+5Op2gtH0/+xo15MupJs1L+chF4MMP24eDmSY1u0622IW58KZeWzd6/HV7aTZbqtii3jUx/z8rnlXvGt1znm9wjB01lp3/f3ChWHowjB0PvPxfh4C+DkIeoujEHJM6CEzQ4Uw/gF8gYrgkokvggAAAABJRU5ErkJggg=='
             class='sprite cropped'>
      </div>

      <div class='pad rad-tr green' id='gen3'>
        <div class='hidden'>3</div>
        <div class='inline-block'>Gen 3</div>
        <img id='gen3img' alt='Gen 3 sprite'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAAB+0lEQVR4nO3aoU8jQRjG4Xcvl+znCo51ULeyklTiKquruDpwleQkjv4HnOPsucPdOahjHHXtua0DOW4Qk9ntvSEENd+K75ds2m4rJk9mZ6dNixACrK4v2gPoWwZCGQhlIJSBUAZCGQhlIJSBUAZCGQhlIJSBUAZCGQhlIJSBUAZCGQhlIJSBUAZCGQhlIJSBUAZCGQhlIJSBUAZCGQhlIJSBUF+1B7CfiLR/Z/LeFxpjUJ8hCUFEgl8P4ddD1fGogiSE9AgAu1XVvqcxJvUZAgD7GEenjeos6QVI6ui0AdDNEo1UQEQkiEh4XcaZsL6OALtVhbN5hePzB7VFNftdZh8CiBgno6ZF+T1tsJRxXFcUUIqcf9xljI86WGxUZkn2S6aYu099zs3GKnea7CCDwQBbV2Hr9BbOj8oO4mZjHC5qHC5qLO87lGLucLDYAIAqVlYQ730xunvA0/0jAODbTUTZugqTyQRAhzG607nTZF1UUyISvp+NAQDTdybD5Rb4c9tA6vwLqxqIXw+xW1V4+RvP1VdNu1MF4p5EYz+isjHz3hdSb/DjZ3fu+vJ/jP33cqYyQ1J86fyKHphWemuI6u8h3vtCRMI/N8fx6BZuFnESjEohBNWjLMtQlmVIz5vni/a1xqF6yXBpZ6r1xQ5QXkP6WK9+D+lDBkK9Aa/UdSkRxURxAAAAAElFTkSuQmCC'
             class='sprite cropped'>
      </div>
    </div>

    <div class='row2'>
      <div class='pad rad-bl green' id='gen4'>
        <div class='hidden'>4</div>
        <div class='inline-block'>Gen 4</div>
        <img id='gen4img' alt='Gen 4img'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAACK0lEQVR4nO3asW/aQBTH8Z+rSPeYTP6EdEs2smFPdcZuHTNnKxts0Klkczb+hWYzW9icTE43vHUsfwLZuE6vQ2SwX1Rl6r1IeR8JgYyH46vj7oSImBnm4IP2AN4aCyJYEMGCCBZEsCCCBREsiGBBBAsiWBDBgggWRLAgggURLIhgQQQLIlgQwYIIFkSwIIIFESyIYEEECyJYEMGCCBZEsCCCBREsiGBBhCPtARBR5y9M3vtIayyAYpAmxPnoAccnAwDAdlPvr2uFiTT+Y0ZE3A4hbTc11otPKlHU1pB/xXjtvf8teJBmdrzmfPTwYn0JQWWGHJ8MkCTUuba8irC8ijr3aFAJ0sRIEkKSUCdE+7WG4EG899H3IWFXzAAAk7M/AIA4jjv3leO+yqIafNslIn56+ghgifkcwNk3AM9rRmO7qUMP64CZgz+cc/xYnPJjccplecfee/bec1necZZl7JxjjXExs87BzHsfERGnaYrpFKiqEgBwfX0DoLvDhP7aqB3M0jTFbjDvXG92Fr/8jN1gjl49Q1VVQaOoHcwGX3P06ueFtVfPOjGyvESvnr0IFkLwGUJEPLr9icXlEACQpimyvMT95AIAkOXl/t77ycX7mCGLy+H+Q65WK7Sf20LHAJTOIc2H9N5HcRxjXdwi/+U6M6V5Dk5re5Pbr3OOv0x/8LhYc5ZlPC7WKtuvyi7T1t5eD4c2oN//rXJSVQ8ivcsfiN4y+5FZsCDCX3bZPjY6utf0AAAAAElFTkSuQmCC'
             class='sprite cropped'>
      </div>

      <div class='pad rad green' id='gen5'>
        <div class='hidden'>5</div>
        <div class='inline-block'>Gen 5</div>
        <img id='gen5img' alt='Gen 5img'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAACW0lEQVR4nO2aLZDaQBTH/+l0Jk9ikcEht66s67niGte63rnWUXmSuuBaybmrAwfucEll3NU15yKDXLcVkA8e3Dl2mc77zexMZtkZwm/eV5gE1loILa9838ClIUIYIoQhQhgihCFCGCKEIUIYIoQhQhgihCFCGCKEIUIYIoQhQhgihCFCGCKEIUIYIoQhQhgihCFCGCKEIUIYIoQhQhgihCFCGCKEIUIYIoQhQhgihPHa1xcT0dHLbcaYwMe9dPEihIisnmmoETV7eWZARNa3lMD1W4hEZL/+vnr28x9vH7xGytlrCBHZ7tIzjWj4/Hk90yfTyRVOUoZHRPGnvZ72CwDAbRkBANSIkHbO1nJcRY2TLjMdXiPPzPH+Xga/BtrIeim9zsHZI8QYExCR3W5/AQCKYoO5KRBPCb3VX8yuNG6Wa9hKAdgVV601VELIv7USXUWKkwgxxgS93kdkywWi6B2mw2uo+08AgDfUOzibTtqEUcmuC2mtj9LuXDhru3Wk4PMCeX4DAKijxlYK40Uf6eShOafQCqjFuMDpHFKHex3+67sKAPC96mMVl0A8aGYRIrLbp0FTbE/VoHPgfHSvC6XWGqMPMQBgFZcYL/rINgrbp8FR280zg3SSOuk0XgYzoE0XABjPf0KNDovo6r7cp9GupvxXbbdL/cOKYtNuLtEMayohqIRwW0ZNVLicXL093JV5BWAnRSWE5fiwRvga4Z2nTA0R2fVdjPf7rjM3u8HMZb04ibXWywrD0IZhaOvrx8cvtrvna3mLkC6un1de4iKEXBLyFyJDhDD+Ac4yrKlT97MrAAAAAElFTkSuQmCC'
             class='sprite cropped'>
      </div>

      <div class='pad rad-tr green' id='gen6'>
        <div class='hidden'>6</div>
        <div class='inline-block'>Gen 6</div>
        <img id='gen6img' alt='Gen 6img'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAACXUlEQVR4nO3aIWzbQBTG8S/TJL+whs1jLuvYwiyjJSxlLdvCUhg22MLBwZYtbIMbW1hbtrCWOcyGhU2Qj70C69z4zZNG+i7g/aVIkW0pl5/ufFaUHjPDeu5V6AHsWwYiMhCRgYgMRGQgIgMRGYjIQEQGIjIQkYGIDERkICIDERmIyEBEBiIyEJGBiAxEZCAiAxEZiMhARAYiMhCRgYgMRGQgIgMRGYjIQETqIES0139ZUgUhIt6sp3uN8lrrg4iIb4f9/7rOv3fO9V50UB2pL5myrNA1S4iI/QzarKfaw2pSAfGzIx3E2FwsO8/vQtx/+onbYT/I0lJbMukg7jzuMYAaon1toTG0VmogvnQQ42qRI8uyvzA8xOrxAR/uqiD3kJ7WH3f9srnoD3F5/gZJ0kdZVkiSfgujuf66gHOuR0SsCaM2Q/yX26yT5liSdO86YxcDKEBE7MaH0ERR22WIiO+Xp53n3v84xerxAWMXY+xinKT1TuTGh1rDa1JdMrvb6fFZCQD4/a2eMb23VwCAyWTSHPMdHH1Xu5+obbtZljVf+visxHK5xJfqDkAb4yStNIb075j5xV9RFLFzrvX6kx4wT47YOcd5nvNoNOL8+iNXxYwvz1OuilnzPooi1hgnM+suGQDYbrcAgKKonzHm8zkANDsPACwWOQDg89d6BmnuMmogPg+TZRmAGgKod5zFIsds9g6A7n1jN3UQn991bm7KFgIAbNbTYCBBfiDaxfi1qpfJLkAoDCDAozvw/JAG1LOhLKvWuRBj8gVbMj4PExrCFxxk37IfmUUGInoCeQGqtI3RraUAAAAASUVORK5CYII='
             class='sprite cropped'>
      </div>
    </div>

    <div class='row2'>
      <div class='pad rad-bl green' id='gen7'>
        <div class='hidden'>7</div>
        <div class='inline-block'>Gen 7</div>
        <img id='gen7img' alt='Gen 7img'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAACT0lEQVR4nO2aoW/bQBSHf54m+TGvbDDefzA6aMOwhDVFTdjCBjMa1rCVLWYZi9lgEjaYslGbpbBhx95AdBf7NZNW0Lsoe58UyT6fpfOXd787WY6YGcqRN6EHcG6oEIEKEagQgQoRqBCBChGoEIEKEagQgQoRqBCBChGoEIEKEagQgQoRqBCBChGoEIEKEagQgQoRqBCBChGoEIEKEagQgQoRqBCBChGoEMHb0AMgomdf7BhjohBjAQILISLujgpQmrk2U61BRBxKSuTzkypbDcaYiIi4P63/2nc56QSpFG8ZQkT8OC3xOC1BRJznOUy1bvUpxlfuuDsqTk6n1yZIqD6M7lGWJX7M+k5KMb5CkiROSnMa+cSbEGNM9H7Sw67a4cPsxrVbKUmSIM/z1j22SnxWitdQtdmxn92g1+sBAMqyBADs93sAwHa7BZAewjXN0J/WXoPWa6haiIitgOsvSzc9xp8qfPuVun7LSQc2eH2FbBAhwEHKv6wyzZXJx7iC7UPsw+Z5jnfZvHXtaT1s9fM5riBC7L9e1DV+bys83A9b1z9+/orBfA7f1QEEmDJExEVdv+ie246/TVqwULXHVs5ieKiSwXzeOl+tVpddIRKbI5QOAACmWhza0wF+fr/9PzIEOFZJd1Qc29IMlGYuVJvb94tdZewDnq6K59t12+8iN2ZExJvNBneLyrVZGXbpfVoP3XRpcrGh2gzUU3uQ5aQDIOBLImYO9ovjmI0xfH23Y2MMx3HMIcfDzOexytjjkK8OLcGFnBv61l2gQgR/AEimxqqUo3C+AAAAAElFTkSuQmCC'
             class='sprite cropped'>
      </div>

      <div class='pad rad green' id='gen8'>
        <div class='hidden'>8</div>
        <div class='inline-block'>Gen 8</div>
        <img id='gen8img' alt='Gen 8img'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAACyElEQVR4nO2aMWhTQRjH/1GRW1oEKUVNiza0UMimRTgKBg0ob3OQRqEUOggOcRDJEDRDFQeRDnUIZlCxINncgkKECOGBjW4FhSBKGnEQodblLe1zeN4172vRqfcF/H4QHnfJI5cf393/jrxEGIYQttnHPYB+Q4QQRAhBhBBECEGEEEQIQYQQRAhBhBBECEGEEEQIQYQQRAhBhBBECEGEEEQIQYQQRAhBhBBECEGEEEQIQYQQRAhBhBBECEGEENiFKKV2PI+xW58rWIUopcJC2bMClFKhUipcqufYpBzg+FKKkVIoe0iOD7KOha1ClFLhrB6zbW8+bWVcz1YRBEGCY1ysU2ZieAvN5XUAwIUraQBAtdSB1vr/mzJBECSUUqHWR21lVEsdXM0cAwCkMAalVOi6UlinDADkFkZtX25hFJXGVwDAucxJlnElOJ5CNEnyN7jWEacVYmK1UPbQbW8AgL1SuKLXmRClVHjn4nEAQD6bRj6bRre9Ya/m1QuHFOdryFq7gJm5JoBIjKFXEifOhQwMFXf0FS8/x8xcEwNDxZiUVmkFT4uXnFaJs9g1MZt/ErV/PnoDAEjeegXP83a9Z2J4C68b710NEQBDhXTvnkdFb8baAFCr1fDr+z3b3yqtAIikuMSpkCAIEukHb217sdEBAFT0ppXxsL4KYFvE7RdfnMYv2z5k9eZp236WOhx7v7m8Dt/3AcDKMOvIXsth2bqb9WT+1BF8PHgC06mo35xrfN+P/XAT2SOTU3u+nWc/yyzVz9hUmZ499Ofq7fjhI5NTTsbFJqR3+24Od0ZMcnwwtikzG7q1D609HxfL4c5Ml7MvP1sJ1VK0wJppAwBa65gMFwssW4XcyESn3PvXatBaR1H86Qea2A8gEuT7Pvyee1ykDUvKAPHUMKmz2Ojg8btv9jMcp102IRRXsfov+kZIv8D+v0y/8Ru7nxy+bhKi8gAAAABJRU5ErkJggg=='
             class='sprite cropped'>
      </div>

      <div class='pad rad-tr green' id='gen9'>
        <div class='hidden'>9</div>
        <div class='inline-block'>Gen 9</div>
        <img id='gen9img' alt='Gen 9img'
             src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4CAYAAABE814IAAACyklEQVR4nO2aMWzTUBCGf0cMHVB1yWSxYAkJog5pKxZGbzAg5LDgIUwsHQsqG4ORGFpUiY4VE0OHMDVCHcrmka1phyoMVasOyFNiVR0y5Rgqm/jitGLwcyn3SU9xnGfl8ununu3YYmYof6iUHcB1Q4UIVIhAhQhUiECFCFSIQIUIVIhAhQhUiECFCFSIQIUIVIhAhQhUiECFCFSIQIUIVIhAhQhUiECFCFSIQIUIVIhAhQiMCLEsa2Lwy3nO23/VKJpSMmTUavDZyhxGrca1e/TglukvTGQAwNnKHEZAKqWydVB8ClyB8QypbB1Ys+uHmF0/TPclgq4FzFz4mMao1eC46/PflE7RsZa2yhAR13ZOAQC1nVMQERNR+T2ljAwhIubhMXe9BU62x9+XGa9l4hmz8eWSiHgQ7U2du+834YYniOM4t8EWHa/RkiEiXnvj4/PHtcz+qr2Iqr0IAJhvbyN0HZRVPsaWXZkZiZS79x1EUQTbtk2FcjkmekjSJzzPy7zy8Jh326ucNNRk32X95Eb0kGq1yoNoD987XwEAj70XVx4zrZcUHa+Rkonj2Krai2nJNP3X6Wfb7U8T8/f9pomwcjG6yhARu6576dwAJ+l2GRlibJWRTfXdgzuZkUcZq43RZTcplXEBD9+/xYefvwBks6MsjJUMEXHoOgjgTHyeiAjgZKR0oyEAYLkXpaVTdLzGe0joOrlzpIwADryoBwCoL9XwZPni6ngwGBR6i8D4xV03GsIJ6ukYJ8mecRkA0NvsY6Nu5sTNaMls1G107DqW/Eeg4TcAQDzzLJ232f4B4KKEutEwnQsA/tIq4jguPF6jQlzXhRf10LEvMiP5sQAQbXzBgj2TOS6AgzAMAeDm9pBpc5LsCXCS9pMyzkOMX/5Pg4j46fNXOO8f4XbtHs77RwjD8P8VAkxmUN49kRsh5F9C/7kTqBDBb252CJJQT8tTAAAAAElFTkSuQmCC'
             class='sprite cropped'>
      </div>
    </div>

    <div class='row2'>
      <div id='starttype'>
        <div class='pad rad-bl-tr green buttonice' id='type0' onclick='typeselectmenuInitial()'>
          Types <img id='type-img' alt='Start' src='@/assets/types/ICE.svg' class='inverted-symbol'></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playtext {
  opacity: 1;
}

.pad {
  color: white;
  padding: 14px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 3px;
  cursor: pointer;
  min-height: 30px;
  line-height: 30px;
  font-size: 18px;
  min-width: 80px;
}

.row2::after {
  content: '';
  display: table;
  clear: both;
}

.sprite {
  margin: -3px -10px 0 0;
  padding-right: 2px;
  float: right;
}

.cropped {
  width: 30px;
  height: 30px;
  object-fit: none;
  object-position: 50% 100%;
}

.inverted-symbol {
  width: 42px;
  margin: -5px -12px -15px 8px;
  filter: brightness(0) invert(1);
}
</style>