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
        <div>name : <input {...name}/></div>
        <div>birthdate : <input {...born}/></div>
        <div>height : <input {...height}/></div>
      </form>
      <div>
        {name.value} | {born.value} | {height.value}
      </div>
    </div>
  )
}

export default App
