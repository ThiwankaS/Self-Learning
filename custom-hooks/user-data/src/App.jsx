import { useState } from 'react'


const useFeild = (type) => {
  const [value,setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {

  const name = useFeild('text')
  const born = useFeild('text')
  const height = useFeild('text')

  return (
    <div>
      <form>
        <div>name : <input type={name.type} value={name.value} onChange={name.onChange}/></div>
        <div>birthdate : <input type={born.type} value={born.value} onChange={born.onChange}/></div>
        <div>height : <input type={height.type} value={height.value} onChange={height.onChange}/></div>
      </form>
      <div>
        {name.value} | {born.value} | {height.value}
      </div>
    </div>
  )
}

export default App
