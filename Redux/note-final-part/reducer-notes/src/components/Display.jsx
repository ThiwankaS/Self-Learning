import { useCounterValue } from '../CounterContex'

const Display = () => {
    const counter = useCounterValue()
    return <div>{counter}</div>
  }

export default Display