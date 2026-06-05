# AI Agent Instructions for pkmnquiz

This document provides essential context and patterns to help AI agents be productive in this Vue 3 / Vite codebase.

## 🏗 System Architecture & State Management

- **Vue 3 Composition API**: Use `<script setup lang="ts">` exclusively. Avoid Options API and `defineComponent` wrapping unless strictly necessary.
- **Pinia Setup Stores**: Stores in `src/stores/` use the Setup pattern with a single `reactive` object state (e.g., `const state = reactive({...})`) rather than grouping multiple `ref`s.
- **Pinia Auto-Save Plugin**: Game state saves automatically through a custom plugin (`src/stores/piniaStorePlugin.ts`) that listens to store mutations and fires `useSavedData().autoSave`. You rarely need to handle save logic manually unless you're introducing a new store and need to ensure it's not excluded.
- **Store HMR Boilerplate**: Always include the HMR acceptance boilerplate at the very bottom of every new store:
  ```typescript
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useYourStore, import.meta.hot));
  }
  ```

## 🔌 Data & Code Splitting

- **Dynamic Data Loading**: Heavy JSON datasets (like Pokémon species/namings in `src/data/*.json`) are loaded dynamically at runtime via `await import('@/data/...json')` (see `usePkmnStore.ts`). DO NOT import these large files at the top level of stores or components if it can be avoided, to keep initial bundle sizes small.

## 🗺 Component Conventions & Communication

- **Centralized Dialogs**: Do not embed dialog/modal UI into random components. Dialog state is managed globally via `useDialogs.ts` and rendered centrally in `src/components/dialogs/Dialogs.vue`. To open a dialog, use `setDialog('dialogName', callback)`.
- **CSS Theming**: Use CSS variables (e.g., `var(--text)`, `var(--primary)`) defined globally in `App.vue` for all styling. Dark mode swaps styles globally by toggling a `.dark` class on the `<main>` element; avoid hardcoding dark-mode hex codes in individual components.
- **Import Paths**:
  - ALWAYS use the path alias `@/` for imports within `src`.
  - ALWAYS include `.vue` extensions for Vue component imports (e.g. `import GameHeader from '@/components/header/GameHeader.vue'`).

## 🛠 Developer Workflows

- **Node Engine**: Requires Node `^20.19.0` or `>=22.12.0`.
- **Scripts**:
  - Use `npm run dev` to start the Vite dev server with Hot Module Replacement.
  - Use `npm run build` to run `vue-tsc` type-checking before Vite build. No explicit test runner is configured.
