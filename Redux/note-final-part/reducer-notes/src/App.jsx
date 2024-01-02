import Button from './components/Button'
import Display from './components/Display'

const App = () => {

  return (
    <div>
      <Display />
      <Button lable='+' type='INC'/>
      <Button lable='-' type='DEC'/> 
      <Button lable='0' type='ZEO'/> 
    </div>
    
  )
}

export default App
