// For fuzzy-finding
// See also: https://fusejs.io/
import Fuse from 'fuse.js'

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

// Options for fuse.js
var options = {
  // Sort by score (metrix of similarity)
  shouldSort: true,
  //threshold: 0.3,
  threshold: 1,
  location: 0,
  distance: 10,
  maxPatternLength: 10,
  minMatchCharLength: 1,
  keys: [
    "studentId",
    "name.firstName",
    "name.lastName"
  ]
};

// Sleep function for DEMO
function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const fuse = new Fuse(data, options)

async function search(query) {
  return await fuse.search(query)
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
    setSearchResult(search(query))
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