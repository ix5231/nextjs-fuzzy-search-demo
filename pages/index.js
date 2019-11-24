// For styling
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchResult from '../components/search_results'

// Since we handle forms with 'controlled components' manner,
// states are needed.
// See also: https://reactjs.org/docs/forms.html#controlled-components
// For the concept of State Hook, See:
// https://reactjs.org/docs/hooks-intro.html
// and
// https://reactjs.org/docs/hooks-state.html
import React, { useState, useEffect } from 'react'

// Test data
import { data } from '../src/data'
// You may want to fetch this with asynchronous-manner in production

import SearchWorker from '../src/search.worker'

// Sleep function for DEMO
function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// Our main component
const Home = () => {
  // A state keeps query words
  const [query, setQuery] = useState('')
  // Are data loaded?
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  // Do search
  //const searchResult = fuse.search(query)
  const worker = new SearchWorker()

  worker.addEventListener('message', e => setSearchResult(e.data))

  useEffect(() => {
    // Load data only once this component is mounted
    if (loading) {
      // Sleep to demonstrate capability of handle async requests
      (async () => {
        console.log('Loading data...')
        await sleep(3e3); // For demo purposes.
        setSearchResult(data)
        console.log('Data loaded!')

        setLoading(false)
      })();
    }
  }, /* Run this callback only once */ [])
  
  useEffect(() => {
    if (!query) {
      setSearchResult(data)
      return
    }
    worker.postMessage(query)
  }, [query])

  return (
    <Container>
      {/* Search form */}
      <div>
        <TextField placeholder='Search...' onChange={e => {
          {/* Set value of form to query */ }
          setQuery(e.target.value)
        }} />
      </div>
      {/* spacer */}
      <div style={{ 'height': '30px' }}></div>
      {
        loading ?
          <CircularProgress /> :
          <SearchResult candidates={
            // Show every items when the query is empty
            searchResult
          } />
      }
    </Container>
  )
}

export default Home