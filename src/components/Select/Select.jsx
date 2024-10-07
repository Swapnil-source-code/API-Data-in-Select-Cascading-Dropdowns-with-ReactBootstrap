import '../Select/Select-style.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Select = () => {

  let [countries, setCountries] = useState([])
  let [states, setStates] = useState([])
  let [selectedcountries, setSelectedCountries] = useState([])
  let [selectedstate, setSelectedState] = useState([])

  const fetchData= async () => {
    const res = await axios.get('https://api.countrystatecity.in/v1/countries', {
      headers: {
        'X-CSCAPI-KEY': `${import.meta.env.VITE_API_KEY}`
      }
    })
    console.log(res);
    setCountries(res.data);
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchStates = async(iso2) => {
    const res = await axios.get(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, {
      headers: {
        'X-CSCAPI-KEY': `${import.meta.env.VITE_API_KEY}`
      }
    })
    console.log(res);
    setStates(res.data);
  }

  const handleSelect = (event)=>{
    console.log(event.target.value);
    setStates([]);
    setSelectedState('');
    fetchStates(event.target.value);
    // setSelectedCountries(event.target.value);
  }
  const handleSelectState = (event) => {
    console.log(event.target.value);
    setSelectedState(event.target.value);
  }

  return (
    <>
      <div className='mt-5'>
        <label htmlFor="country" >SELECT COUNTRY</label>
        <select className="form-select mt-2 text-center" aria-label="Default select example" onChange={(e)=>handleSelect(e)}>
            <option value="" disabled selected >Select Country</option>
            {countries.map((index, value )=>(
              <option key={index} value={countries[value]["iso2"]}>{countries[value]["name"]}</option>
            ))}
        </select>
        
        <label htmlFor="state" className='mt-3'>SELECT STATE</label>
        <select className="form-select mt-2 text-center" aria-label="Default select example" onChange={(e)=>handleSelectState(e)}>
            <option value="" disabled selected >Select State</option>
            {states.map((index, value )=>(
              <option key={index} value={states[value]["name"]}>{states[value]["name"]}</option>
            ))}
        </select>
      </div>
        <p className='mt-4 text-center'>{selectedcountries}</p>
        <p className='mt-2 text-center'>{selectedstate}</p>
    </>
  )
}

export default Select