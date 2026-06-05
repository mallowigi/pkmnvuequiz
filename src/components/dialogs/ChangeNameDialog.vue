<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Overlay from '@/components/common/Overlay.vue';
import RoundedButton from '@/components/common/RoundedButton.vue';
import TextBox from '@/components/common/TextBox.vue';
import { useDialogs } from '@/stores/useDialogs.ts';
import { useState } from '@/stores/useState.ts';

const { dialogs, closeDialog } = useDialogs();
const { state, setName } = useState();

const { t } = useI18n();

const name = ref('');

const submit = () => {
  setName(name.value);
  closeDialog();

  if (dialogs.callback) {
    dialogs.callback();
  }
};

const cancel = () => {
  closeDialog();
};

const editName = (value: string) => {
  name.value = value;
};
</script>

<template>
  <Overlay
    class="overlay"
    @close="cancel"
  >
    <div class="prompt">
      <h2>{{ t('changeNameDialog.title') }}</h2>
      <p class="desc">{{ t('changeNameDialog.description') }}</p>

      <TextBox
        type="text"
        class="large-text"
        placeholder="Enter your name"
        @input="editName"
      />

      <div class="row">
        <RoundedButton
          @click.stop="submit"
          primary
          :disabled="!name"
        >
          {{ t('submit') }}
        </RoundedButton>

        <RoundedButton
          @click.stop="cancel"
          primary
        >
          {{ t('cancel') }}
        </RoundedButton>
      </div>
    </div>
  </Overlay>
</template>

<style scoped>
.overlay {
  z-index: 4;
}

.desc {
  margin-bottom: 10px;
}

.large-text {
  padding: 6px;
  margin: 1em;
}

.row {
  justify-content: center;
  gap: 8px;
}
</style>

<i18n>
{
  "cn": {
    "changeNameDialog": {
      "title": "修改名字",
      "description": "输入一个新名字来修改你当前的名字。"
    }
  },
  "en": {
    "changeNameDialog": {
      "title": "Change Name",
      "description": "Enter a new name to change your current name."
    }
  },
  "de": {
    "changeNameDialog": {
      "title": "Namen ändern",
      "description": "Gib einen neuen Namen ein, um deinen aktuellen Namen zu ändern."
    }
  },
  "es": {
    "changeNameDialog": {
      "title": "Cambiar nombre",
      "description": "Ingresa un nuevo nombre para cambiar tu nombre actual."
    }
  },
  "fr": {
    "changeNameDialog": {
      "title": "Changer de nom",
      "description": "Entrez un nouveau nom pour changer votre nom actuel."
    }
  },
  "it": {
    "changeNameDialog": {
      "title": "Cambia nome",
      "description": "Inserisci un nuovo nome per cambiare il tuo nome attuale."
    }
  },
  "jp": {
    "changeNameDialog": {
      "title": "名前を変更",
      "description": "新しい名前を入力して、現在の名前を変更してください。"
    }
  },
  "ko": {
    "changeNameDialog": {
      "title": "이름 변경",
      "description": "새 이름을 입력하여 현재 이름을 변경하세요."
    }
  },
  "pt": {
    "changeNameDialog": {
      "title": "Mudar nome",
      "description": "Digite um novo nome para mudar seu nome atual."
    }
  },
  "ru": {
    "changeNameDialog": {
      "title": "Изменить имя",
      "description": "Введите новое имя, чтобы изменить ваше текущее имя."
    }
  },
  "zh": {
    "changeNameDialog": {
      "title": "更改名称",
      "description": "输入新名称以更改当前名称。"
    }
  }
}
</i18n>
