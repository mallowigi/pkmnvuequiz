<script setup lang="ts">
import { useAuth } from '@vueuse/firebase';
import { useI18n } from 'vue-i18n';

import RoundedButton from '@/components/common/RoundedButton.vue';
import { useAppBreakpoints } from '@/composables/useAppBreakpoints.ts';
import { useFirebase } from '@/composables/useFirebase.ts';
import { useAttackDexState } from '@/stores/useAttackDexState.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useCurrentStrategy } from '@/strategies/useCurrentStrategy.ts';

const { t } = useI18n();
const { setGameSelectionState, setChallengeMode } = useGameFlow();
const { enterAttackDex } = useAttackDexState();
const strategy = useCurrentStrategy();

const { isMobile } = useAppBreakpoints();
const { auth } = useFirebase();
const { isAuthenticated } = useAuth(auth);
const { showUserMessage } = useMessages();

const selectFreeMode = () => {
  setGameSelectionState('gen');
  setChallengeMode('free');
};

const selectChallengeMode = () => {
  setGameSelectionState('challengeSetup');
  setChallengeMode('challenge');
};

const selectMultiplayerMode = () => {
  if (!strategy.value.capabilities.hasMultiplayer) {
    showUserMessage(t('attackDexMultiplayerDisabled'), 'warning');
    return;
  }

  if (!auth.currentUser?.uid) {
    showUserMessage('You must be logged in to join a room.', 'error');
    return;
  }

  setGameSelectionState('createRoom');
};

const selectAttackDex = () => {
  enterAttackDex();
  setChallengeMode('free');
  setGameSelectionState('gen');
};
</script>

<template>
  <div class="root">
    <h2>{{ t('typeOfChallenge') }}</h2>

    <div class="top-section">
      <div
        class="twocols"
        :class="{ vertical: isMobile }"
      >
        <div class="side">
          <RoundedButton
            primary
            @click="selectFreeMode"
          >
            {{ t('freeMode') }}
          </RoundedButton>

          <p class="description">
            {{ t('freeModeDescription') }}
          </p>
        </div>

        <div class="separator" />

        <div class="side">
          <RoundedButton
            class="danger-btn"
            primary
            @click="selectChallengeMode"
          >
            {{ t('challengeMode') }}
          </RoundedButton>

          <p class="description">
            {{ t('challengeModeDescription') }}
          </p>
        </div>

        <div
          class="separator"
          v-if="isAuthenticated && !isMobile"
        />

        <div
          class="side"
          v-if="isAuthenticated && !isMobile"
        >
          <RoundedButton
            class="danger-btn"
            primary
            @click="selectMultiplayerMode"
          >
            {{ t('multiplayerInvite') }}
          </RoundedButton>

          <p class="description">
            {{ t('multiplayerModeDescription') }}
          </p>
        </div>
      </div>
    </div>

    <div class="attackdex-section">
      <div class="side">
        <h3 class="attackdex-heading">
          {{ t('attackDexQuiz.title') }}
        </h3>

        <RoundedButton
          @click="selectAttackDex"
          primary
        >
          {{ t('attackDex') }}
        </RoundedButton>

        <p class="description">
          {{ t('attackDexQuiz.description') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.top-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  width: 100%;
  justify-content: center;
  padding: 16px 0;

  .mobile & {
    gap: 16px;
    padding: 8px 0;
  }
}

.attackdex-section {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 8px 0 16px;
}

.attackdex-heading {
  margin: 0;
}

.separator {
  width: 100%;
  border: 0;
  border-top: 1px solid var(--text);
  opacity: 0.2;
  margin: 16px 0;
}

.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
}

.mobile {
  .separator,
  .save-buttons,
  .leaderboards-table {
    display: none;
  }
}

.twocols {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  width: 100%;
  justify-content: center;
  padding: 16px 0;

  &.vertical {
    flex-direction: column;
  }
}

.separator {
  display: inline-block;
  width: 1px;
  margin: 0 0 -10px 10px;
  border: 1px dashed var(--secondary);
  align-self: stretch;
}

.large-text {
  padding: 6px;
  width: 200px;
}

.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.description {
  margin-top: 8px;
  color: var(--secondary);
  max-width: 300px;
  line-height: 1.4;
}
</style>
