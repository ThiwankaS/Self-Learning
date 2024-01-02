import { useCounterDispatch } from '../CounterContex'

const Button = ({type,lable}) => {
    const dispatch = useCounterDispatch()
    return (
      <button onClick={() => dispatch({type})}>
        {lable}
      </button>
    ) 
  }

export default Button