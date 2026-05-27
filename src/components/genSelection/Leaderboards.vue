<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts';
import RoundedButton from '@/components/common/RoundedButton.vue';

const { leaderBoards, createRecord } = useFirebase();

const formatTime = (timeMs: number) => {
  const totalSeconds = Math.floor(timeMs / 1000);
  const ms = String(timeMs % 1000)
    .padStart(3, '0')
    .slice(0, 2);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}.${ms}`;
};

const capitalize = (str: string | null) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div class="leaderboard">
    <h2>Top 10 Fastest Trainers</h2>

    <div
      class="table-container"
      v-if="leaderBoards && leaderBoards.length > 0"
    >
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>Game Mode</th>
            <th>Mode</th>
            <th>Shadows</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in leaderBoards"
            :key="user.id"
          >
            <td class="rank">{{ index + 1 }}</td>
            <td class="run-name">{{ user.name }}</td>
            <td class="run-time">{{ formatTime(user.time) }}</td>
            <td>{{ capitalize(user.gameMode) }}</td>
            <td>{{ capitalize(user.mode) }}</td>
            <td>{{ user.numShadows }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      class="no-records"
    >
      <p>No records yet. Be the first!</p>
    </div>

    <RoundedButton
      primary
      @click="createRecord"
      class="create-btn"
    >
      Create Random Record
    </RoundedButton>
  </div>
</template>

<style scoped>
.leaderboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.table-container {
  width: 100%;
  max-width: 600px;
  overflow-x: auto;
  margin-bottom: 16px;
  background-color: var(--black);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  color: var(--text);
  font-size: 15px;
}

.leaderboard-table th,
.leaderboard-table td {
  padding: 10px 14px;
  text-align: left;
  white-space: nowrap;
}

.leaderboard-table thead {
  background-color: var(--type-btn-color, var(--primary));
  color: white;
}

.leaderboard-table th {
  font-weight: 500;
  letter-spacing: 0.5px;
}

.leaderboard-table tbody tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.leaderboard-table tbody tr:last-child {
  border-bottom: none;
}

.leaderboard-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.04);
}

.rank {
  font-weight: bold;
  color: var(--type-btn-color, var(--primary));
}

.no-records {
  padding: 20px;
  color: var(--text);
}

.create-btn {
  margin-top: 8px;
}
</style>
