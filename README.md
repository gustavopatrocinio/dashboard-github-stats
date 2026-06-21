# GitHub Stats Dashboard

A Vue 3 dashboard that fetches public data from the GitHub REST API. Search for any username and explore their profile, repository stats, and most used programming languages in a responsive pie chart.

**Live demo:** [https://dashboard-github-stats.vercel.app/](https://dashboard-github-stats.vercel.app/)

## Features

- Search GitHub users by username
- Profile overview: avatar, name, bio, repos, followers, and following
- Language distribution pie chart based on public repositories
- Loading and error states (user not found, API rate limit)
- Mobile-friendly layout
- Optional GitHub token support to increase API rate limits

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Build tool | [Vite](https://vite.dev/) |
| HTTP client | [Axios](https://axios-http.com/) |
| Charts | [Chart.js](https://www.chartjs.org/) + [vue-chartjs](https://vue-chartjs.org/) |
| Routing | [Vue Router](https://router.vuejs.org/) |
| Testing | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) |
| Linting | ESLint, Oxlint, Prettier |

## Getting Started

### Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`
- npm

### Installation

```sh
git clone https://github.com/gustavopatrocinio/dashboard-github-stats.git
cd dashboard-github-stats
npm install
```

### Environment variables (optional)

The GitHub API allows **60 requests/hour** without authentication. To increase the limit to **5,000/hour**, create a personal access token and add it to a local `.env` file:

```sh
cp .env.example .env
```

```env
VITE_GITHUB_TOKEN=your_github_token_here
```

Create a token at [github.com/settings/tokens](https://github.com/settings/tokens) with read-only access to public repositories.

> **Important:** Never commit your `.env` file. It is already listed in `.gitignore`.

### Run locally

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```sh
npm run build       # production build
npm run preview     # preview production build
npm run test:unit   # run unit tests
npm run lint        # lint the codebase
npm run format      # format source files
```

## Project Structure

```
src/
├── components/
│   ├── charts/       # Language pie chart
│   ├── profile/      # User profile card
│   ├── search/       # Username search form
│   └── stats/        # Repos / followers / following cards
├── composables/      # Reusable Vue composables
├── constants/        # Error codes and messages
├── services/         # GitHub API client
└── utils/            # Pure helper functions
```

## API Notes

- Uses the public [GitHub REST API](https://docs.github.com/en/rest)
- Language stats are aggregated from the top 30 public repositories (by stars)
- When the rate limit is exceeded, the app shows a clear message with guidance on how to proceed

## License

This project is for personal/educational use.
