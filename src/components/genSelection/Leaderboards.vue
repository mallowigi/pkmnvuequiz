<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts';

const { leaderBoards } = useFirebase();
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
  </div>
</template>
