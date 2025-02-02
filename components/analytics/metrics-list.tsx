import { List, Paper, Text } from '@mantine/core'

const MetricsList = () => {
  return (
    <div>
      <Paper>
        <List>
          <Text size='sm' c={'gray'}>
            Recent Payments
          </Text>

          <Text size='md'>$ 15.620</Text>
        </List>
      </Paper>
    </div>
  )
}

export default MetricsList
