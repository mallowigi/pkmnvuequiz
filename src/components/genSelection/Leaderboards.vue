<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts';
import RoundedButton from '@/components/common/RoundedButton.vue';

const { leaderBoards, createRecord } = useFirebase();
</script>

<template>
  <div class="leaderboard">
    <h2>Top Players</h2>
    <div v-if="leaderBoards">
      <div
        v-for="user in leaderBoards"
        :key="user.id"
      >
        {{ user.name }} &mdash; {{ user.time }}
      </div>
    </div>

    <RoundedButton
      primary
      @click="createRecord"
    >
      Create Random Record
    </RoundedButton>
  </div>
</template>
