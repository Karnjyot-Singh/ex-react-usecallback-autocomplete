import { useState, useEffect, useCallback } from 'react'

const debounce = (callback, delay) =>{
  let timeout
  return(vlaue) => {
    clearTimeout(timeout)
    timeout= setTimeout(() => {
      callback(value)
    }, delay)
  }
}


function App() {
  const [query, setQuery] = useState("")

  const[suggestions, setSuggestions] = useState([])

  const fetchProducts = async (query) => {
    if(!query.trim()){
      setSuggestions([])
      return
     }
     try{
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      const data = await res.json
      setSuggestions(data)
      console.log('API')
    }catch(error){
      console.error(error)
    }
  }

  const debouncedFetchProducts = useCallback(
     debounce(fetchProducts, 500)
  , [])

  //uso useEffect perché devo dire di fare un'opearzione ad ogni cambio di uno stato
  useEffect(() => {
    debouncedFetchProducts(query)
  }, [query])

  return (
    <>
      <div>
         <h1>Autocomplete</h1>
        <input
           type='text'
           placeholder='cerca'
           value={query}
           onChange={e => setQuery(e.target.value)} 
        />
        {suggestions.length > 0 && (
          <div className="dropdown">
            {suggestions.map((product) => (
              <p key={product.id}>{product.name}</p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App
