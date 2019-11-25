// For fuzzy-finding
// See also: https://fusejs.io/
import Fuse from 'fuse.js'
import { data } from '../src/data'

// Options for fuse.js
let options = {
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

const fuse = new Fuse(data, options)

self.addEventListener('message', function(e) {
  //self.postMessage(fuse.search(e.data))
})