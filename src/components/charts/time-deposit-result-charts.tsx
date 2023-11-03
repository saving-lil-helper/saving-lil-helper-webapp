'use client'

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
import { useTimeDepositForm } from '@/stores/time-deposit-atom'
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

const labels = ['一個月', '三個月', '六個月', '九個月', '一年']

export default function TimeDepositResultCharts() {
  const { timeDepositResults } = useTimeDepositForm()

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: '本息總和',
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          data: timeDepositResults.map((item) => item['p&i']),
        },
      ],
    }
  }, [timeDepositResults])

  return <Line className={'mt-5'} options={options} data={data} />
}
