import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  
  const [ value,setValue ]        = useState('');
  const [ currency,setCurrency ]  = useState(null);
  const [ rates,setRates ]        = useState({});  

  useEffect( () => {
    console.log(`effect run, currency is now ${currency}`); 
    //skip currency is not define 
    if(currency){
      console.log(`feteching rates....`); 
      axios.get(`https://open.er-api.com/v6/latest/${currency}`).then(response => setRates(response.data.rates));  
    }
  },[currency])

  const onSearch = (event) => {
     event.preventDefault();
     setCurrency(value); 
  }

  const handelChange = (event) => {
    setValue(event.target.value); 
  }


  return(
    <div>
      <form onSubmit={onSearch} >
        Currency : <input value={value} onChange={handelChange}/>
        <button type="submit">exchange rates</button>
      </form>
      <pre>
        {JSON.stringify(rates,null,2)} 
      </pre>
    </div>
  )
}

export default App; 
