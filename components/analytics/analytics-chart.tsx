'use client'

import { BarChart, LineChart } from '@mantine/charts'
import { Tooltip } from '@mantine/core'
export const data = [
  {
    date: 'Mar 22',
    Apples: 1000,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 1250,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 1920,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 2550,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
]
const AnalyticsChart = () => {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey='date'
      series={[{ name: 'Apples', color: 'indigo.6' }]}
      curveType='bump'
    />
  )
}

export default AnalyticsChart
