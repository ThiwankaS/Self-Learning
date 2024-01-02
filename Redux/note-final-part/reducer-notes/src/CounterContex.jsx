import { createContext,useReducer,useContext } from 'react'

const counterReducer = (state,action) => {
    switch(action.type){
      case 'INC' : return state + 1 
      case 'DEC' : return state - 1
      case 'ZEO' : return 0
      default : return state
    }
  }

const CounterContex = createContext()

export const CounterContexProvider = (props) => {
    const [ counter, counterDispatch ] = useReducer(counterReducer,0)
    return (
        <CounterContex.Provider value={[ counter, counterDispatch ]}>
            {props.children}
      </CounterContex.Provider>
    )
}

export const useCounterValue = () => {
    const counterAndDispatch = useContext(CounterContex)
    return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
    const counterAndDispatch = useContext(CounterContex)
    return counterAndDispatch[1]
}

export default CounterContex