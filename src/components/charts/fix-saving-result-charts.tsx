import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import { useFixSavingForm } from '@/stores/fix-saving-atom'
import { useMemo } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
}

const labels = ['一個月', '三個月', '六個月', '一年']
export default function FixSavingResultCharts() {
  const { fixSavingResults } = useFixSavingForm()

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: '本息總和',
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          data: fixSavingResults.map((item) => item['p&i']),
        },
      ],
    }
  }, [fixSavingResults])

  return <Line className={'mt-5'} options={options} data={data} />
}
