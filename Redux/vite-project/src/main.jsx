import { createStore } from 'redux'
import ReactDOM from 'react-dom/client'

const counterReducer = (state = 0, action) => {
  switch(action.type){
    case 'INCREMENT' : return state + 1
    case 'DECREMENT' : return state - 1
    case 'ZERO' : return 0
    default : return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <div>
        <button onClick={() => store.dispatch({ type : 'INCREMENT'})}>plus </button>
      </div>
      <div>
        <button onClick={() => store.dispatch({ type : 'DECREMENT'})}>minus</button>
      </div>
      <div>
        <button onClick={() => store.dispatch({ type : 'ZERO'})}>zero</button>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)


