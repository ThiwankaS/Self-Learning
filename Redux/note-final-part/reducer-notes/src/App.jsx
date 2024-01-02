import { useReducer } from 'react'

const counterReducer = (state,action) => {
  switch(action.type){
    case 'INC' : return state + 1 
    case 'DEC' : return state - 1
    case 'ZEO' : return 0
    default : return state
  }
}

const Display = ({counter}) => {
  return <div>{counter}</div>
}

const Button = ({lable,dispatch,type}) => {
  return (
    <button onClick={() => dispatch({type})}>{lable}</button>
  ) 
}

const App = () => {

  const [ counter, counterDispatch ] = useReducer(counterReducer,0)

  return (
    <div>
      <Display counter={counter} />
      <div>
        <Button lable='+' dispatch={counterDispatch} type='INC' />
        <Button lable='-' dispatch={counterDispatch} type='DEC' />
        <Button lable='0' dispatch={counterDispatch} type='ZEO' />
      </div>
    </div>
  )
}

export default App
