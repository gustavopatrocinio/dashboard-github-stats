<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { useMediaQuery } from '@/composables/useMediaQuery'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  languages: {
    type: Array,
    default: () => [],
  },
  reposAnalyzed: {
    type: Number,
    default: 0,
  },
  totalPublicRepos: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const CHART_COLORS = [
  '#0969da',
  '#2da44e',
  '#bf3989',
  '#fb8500',
  '#a475f9',
  '#cf222e',
  '#54aeff',
  '#1a7f37',
  '#6639ba',
  '#9a6700',
  '#656d76',
]

const isMobile = useMediaQuery('(max-width: 640px)')

const subtitle = computed(() => {
  if (!props.reposAnalyzed) return null

  if (props.totalPublicRepos > props.reposAnalyzed) {
    return `Based on the top ${props.reposAnalyzed} of ${props.totalPublicRepos} public repositories`
  }

  return `Based on ${props.reposAnalyzed} public ${props.reposAnalyzed === 1 ? 'repository' : 'repositories'}`
})

const chartData = computed(() => ({
  labels: props.languages.map((language) => language.name),
  datasets: [
    {
      data: props.languages.map((language) => language.bytes),
      backgroundColor: props.languages.map(
        (_, index) => CHART_COLORS[index % CHART_COLORS.length],
      ),
      borderWidth: 1,
      borderColor: '#ffffff',
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile.value ? 4 : 0,
  },
  plugins: {
    legend: {
      position: isMobile.value ? 'bottom' : 'right',
      align: 'center',
      labels: {
        boxWidth: 12,
        padding: isMobile.value ? 10 : 12,
        font: {
          size: isMobile.value ? 11 : 12,
        },
      },
    },
    tooltip: {
      callbacks: {
        label(context) {
          const language = props.languages[context.dataIndex]
          return `${language.name}: ${language.percentage}%`
        },
      },
    },
  },
}))
</script>

<template>
  <section class="language-chart">
    <header class="language-chart__header">
      <h3 class="language-chart__title">Most used languages</h3>
      <p v-if="subtitle" class="language-chart__subtitle">{{ subtitle }}</p>
    </header>

    <div v-if="loading" class="language-chart__loading" aria-live="polite">
      Loading language data from public repositories…
    </div>

    <div v-else-if="languages.length" class="language-chart__canvas">
      <Pie :data="chartData" :options="chartOptions" />
    </div>

    <p v-else class="language-chart__empty">
      No languages found in public repositories.
    </p>
  </section>
</template>

<style scoped>
.language-chart {
  width: 100%;
  padding: 1.5rem;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(31, 35, 40, 0.04);
}

.language-chart__header {
  margin-bottom: 1rem;
}

.language-chart__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #24292f;
}

.language-chart__subtitle {
  margin: 0.375rem 0 0;
  font-size: 0.8125rem;
  color: #656d76;
}

.language-chart__canvas {
  height: 280px;
}

.language-chart__loading,
.language-chart__empty {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #656d76;
}

@media (max-width: 640px) {
  .language-chart {
    padding: 1rem;
  }

  .language-chart__title {
    font-size: 1rem;
  }

  .language-chart__subtitle {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  .language-chart__canvas {
    height: min(420px, 70vh);
    min-height: 300px;
  }
}
</style>
