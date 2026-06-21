<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  languages: {
    type: Array,
    default: () => [],
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
]

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
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12,
        padding: 12,
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
    <h3 class="language-chart__title">Linguagens mais usadas</h3>

    <div v-if="languages.length" class="language-chart__canvas">
      <Pie :data="chartData" :options="chartOptions" />
    </div>

    <p v-else class="language-chart__empty">
      Nenhuma linguagem encontrada nos repositórios públicos.
    </p>
  </section>
</template>

<style scoped>
.language-chart {
  width: 100%;
  max-width: 48rem;
  padding: 1.5rem;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  background-color: #ffffff;
}

.language-chart__title {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #24292f;
}

.language-chart__canvas {
  height: 280px;
}

.language-chart__empty {
  margin: 0;
  font-size: 0.9375rem;
  color: #656d76;
}
</style>
