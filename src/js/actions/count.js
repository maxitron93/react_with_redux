// INCREASE_COUNT
const increaseCount = (increaseBy) => {
  return {
    type: 'INCREASE_COUNT',
    increaseBy: increaseBy
  }
}

// REDUCE_COUNT
const reduceCount = (reduceBy) => {
  return {
    type: 'REDUCE_COUNT',
    reduceBy: reduceBy
  }
}

// RESET_COUNT
const resetCount = () => {
  return {
    type: 'RESET_COUNT'
  }
}

// SET_COUNT
const setCount = (setCountTo) => {
  return {
    type: 'SET_COUNT',
    setCountTo: setCountTo
  }
} 

export { increaseCount, reduceCount, resetCount, setCount }