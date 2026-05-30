<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts';
import { capitalize } from '@/utils/utils.ts';
import type { DocumentData } from 'firebase/firestore';
import { useState } from '@/stores/useState.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';

const { getTopTrainers } = useFirebase();
const { state } = useState();
const { currentTypeState } = useCurrentType();
const { currentGenState } = useCurrentGen();

const topTrainers = getTopTrainers({
  gameMode: state.gameMode!,
  gen: state.gameMode === 'gen' ? currentGenState.gen : undefined,
  type: state.gameMode === 'types' ? currentTypeState.currentType : undefined,
});

const formatTime = (timeInSec: number) => {
  const hours = String(Math.floor(timeInSec / 3600));
  const minutes = String(Math.floor((timeInSec % 3600) / 60));
  const seconds = String(timeInSec % 60);

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

const subType = (user: DocumentData): string => {
  if (user.gameMode === 'types') return user.type ?? '';
  if (user.gameMode === 'gen') return user.gen ?? '';
  return user.gameMode ?? '';
};

const toCapital = (str: string) => capitalize(str);
</script>

<template>
  <div class="leaderboard">
    <div
      class="table-container"
      v-if="topTrainers?.length > 0"
    >
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>Game Mode</th>
            <th>Gen/Type</th>
            <th>Order Mode</th>
            <th>Shadows Used</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in topTrainers"
            :key="user.id"
          >
            <td class="rank">{{ index + 1 }}</td>
            <td class="run-name">{{ user.name }}</td>
            <td class="run-time">{{ formatTime(user.time) }}</td>
            <td>{{ toCapital(user.gameMode) }}</td>
            <td>{{ toCapital(subType(user)) }}</td>
            <td>{{ toCapital(user.mode) }}</td>
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
  overflow-x: auto;
  margin-bottom: 16px;
  background-color: var(--text-inverted);
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
  color: var(--text-inverted);
}

.create-btn {
  margin-top: 8px;
}
</style>
