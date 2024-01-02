import { useReducer,useContext } from 'react'
import CounterContex from './CounterContex'

const counterReducer = (state,action) => {
  switch(action.type){
    case 'INC' : return state + 1 
    case 'DEC' : return state - 1
    case 'ZEO' : return 0
    default : return state
  }
}

const Display = () => {
  const [counter,dispatch] = useContext(CounterContex) 
  return <div>{counter}</div>
}

const Button = ({type,lable}) => {
  const [counter,dispatch] = useContext(CounterContex)
  return (
    <button onClick={() => dispatch({type})}>{lable}</button>
  ) 
}

const App = () => {

  const [ counter, counterDispatch ] = useReducer(counterReducer,0)

  return (
    <CounterContex.Provider value={[ counter, counterDispatch ]}>
      <Display counter={counter} />
      <div>
        <Button lable='+' type='INC' />
        <Button lable='-' type='DEC' />
        <Button lable='0' type='ZEO' />
      </div>
    </CounterContex.Provider>
  )
}

export default App
