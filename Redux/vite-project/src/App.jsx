import { createStore } from 'redux'

function App() {
 
  const counterReducer = (state = 0, action) => {
    switch(action.type){
      case 'INCREMNT'  : return state + 1 
      case 'DECREMENT' : return state - 1
      case 'ZERO'      : return 0
      default          : return state 
    }
  }
  const store = createStore(counterReducer)
  store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })
  store.dispatch({ type : 'INCREMNT' })
  store.dispatch({ type : 'INCREMNT' })
  store.dispatch({ type : 'INCREMNT' })
  store.dispatch({ type : 'ZERO' })
  store.dispatch({ type : 'DECREMENT' })
  return (
    <div>
      <h4>Count {store.getState()} </h4>
    </div>
  )
}

export default App
