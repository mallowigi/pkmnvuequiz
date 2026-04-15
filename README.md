# Pokémon Quiz (pkmnquiz)

A web-based Pokémon quiz application built with Vue 3 and Vite. Test your Pokémon knowledge by identifying Pokémon
through various game modes and generations.

## Features

- **Generation Selection**: Choose specific Pokémon generations to quiz yourself on.
- **Multiple Game Modes**: Includes Normal, Chaos, and Order modes for different challenge levels.
- **Type Selection**: Filter or quiz by specific Pokémon types.
- **Region Support**: Explore Pokémon from different regions.
- **Interactive UI**: Features a header with game stats, various dialogs for settings (timer, mode, reset), and smooth
  transitions.
- **Responsive Design**: Designed to work across different screen sizes.

## Prerequisites

- **Node.js**: `^20.19.0` or `>=22.12.0`
- **npm** or another package manager (yarn, pnpm)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pkmnquiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

#### Development Mode

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (by default).

#### Production Build

Build the project for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

#### Preview Production Build

Preview the built application locally:

```bash
npm run preview
```

## Project Structure

- `src/assets/`: Static assets like images, SVGs, and global CSS.
- `src/components/`: Vue components organized by category (background, common, dialogs, genSelection, header).
- `src/data/`: Static data files (JSON/JS) for Pokémon, regions, modes, translations, etc.
- `src/stores/`: State management logic.
- `index.html`: Main entry point.
- `vite.config.js`: Vite configuration.

## Built With

- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework.
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
- [Vue DevTools](https://devtools.vuejs.org/) - For enhanced development experience.
