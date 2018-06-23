import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import '../css/styles.scss';

// createStore allows you to create a store. combineReducers allows you to combine multiple reducers for a single store
import { createStore, combineReducers } from 'redux';
// Provider allows you to pass the state from the store to your react components. This will be used at the end
import { Provider } from 'react-redux'
// connect allows you to pass the state from the store to individual react components. This will be used at the end
import { connect } from 'react-redux'
// Import all the reducers from './reducers'
import { countReducer } from './reducers/count'
import { peopleReducer } from './reducers/people'
import { animalsReducer } from './reducers/animals'
// Import all the actions from './actions'
import { increaseCount, reduceCount, resetCount, setCount } from './actions/count'
import { addPerson, removePerson } from './actions/people'
import { addAnimal, removeAnimal } from './actions/animals'
// Import all the selectors from './selectors'
// import { getCount } from '../selectors/count'
// import { getPeople } from '../selectors/people'
// import { getAnimals } from '../selectors/animals'


// We need five things for Redux to work:
// 1. Store - This is the store of the app's state. The state object has three parameters: count, people, and animals
const store = createStore(
  combineReducers({
    count: countReducer,
    people: peopleReducer,
    animals: animalsReducer
  }),

  // For use with the Redux DevTools. More info at https://github.com/zalmoxisus/redux-devtools-extension#usage
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
// 2. Reducers - These reducers contain the logic that will process incoming actions and return updated states
// The reducers are imported above. They need to come before the store because they've been delcared as variables


// 3. Actions - These actions allow the App to change the state inside the store
// The action functions are imported above and used here:

// Subscribe to the store so it console logs the state after we make a change
store.subscribe(() => {
  console.log(store.getState())
})
// Console log the initial state
console.log(store.getState())
// Action - Increase the count by 2
store.dispatch(increaseCount(2))
// Action - Set count to 76
store.dispatch(setCount(76))
// Action - Add person
store.dispatch(addPerson("Steve", 30, "Road Auditor", "Brisbane"))
// Action - Add person
store.dispatch(addPerson("Nat", 28, "Doctor", "Singapore"))
// Action - Reduce the count by 12 
store.dispatch(reduceCount(12))
// Action - Reset count
store.dispatch(resetCount())
// Action - Add animal
store.dispatch(addAnimal("Wombo", "Wombat", "Big Nose", 17))
// Action - Remove person
store.dispatch(removePerson("Maxi"))
// Action - Remove animal
store.dispatch(removeAnimal("Catto"))
// Action - Increase the count by 17
store.dispatch(increaseCount(17))


// 4. Selectors - These selector functions allow components to get the states they need from the stores
// The selector functions are imported above and used below

// 5. The Provider Component and connection function that allow you to pass the state from the store to your react components.
// These are the normal React Components, before the state gets passed into them. These need to be made first.
const Count = (props) => {
  return (
    <div>
      <h2>Count from the store! :D</h2>
      <p>Count: {props.count}</p>
      <p>These handlers run actions defined in src/js/actions/count.js :D</p>
      <button onClick={() => {
        props.dispatch(increaseCount(1))
      }}>+1</button>
      <button onClick={() => {
        props.dispatch(reduceCount(1))
      }}>-1</button>
      <button onClick={() => {
        props.dispatch(resetCount())
      }}>Reset</button>
    </div>
  )
}

const People = (props) => {
  return (
    <div>
      <h2>People from the store! :D</h2>
      {props.people.map((current, index) => {
        return (
          <div key={index}>
            <h4>Name: {current.name}</h4>
            <p>Age: {current.age}</p>
            <p>Occupation: {current.occupation}</p>
            <p>Location: {current.location}</p>
          </div>
        )
      })}
    </div>
  )
}

const Animals = (props) => {
  return (
    <div>
      <h2>Animals from the store! :D</h2>
      {props.animals.map((current, index) => {
        return (
          <div key={index}>
            <h4>Name: {current.name}</h4>
            <p>Species: {current.species}</p>
            <p>Breed: {current.breed}</p>
            <p>Age: {current.age}</p>
          </div>
        )
      })}
    </div>
  )
}


// These are the connected React components. These components act as higher order components (HOCs) that pass on the state to the normal React components created above.
// import { connect } from 'react-redux' is above
const ConnectedCount = connect((state) => {
  return {
    count: state.count
  }
})(Count);
// Alternative syntax:
// const mapStateToProps = (state) => {
//   return {
//     count: state.count
//   }
// }
//const ConnectedCount = connect(mapStateToProps)(Count)

const ConnectedPeople = connect((state) => {
  return {
    people: state.people
  }
})(People);

const ConnectedAnimals = connect((state) => {
  return {
    animals: state.animals
  }
})(Animals);

// This is the main app. We pass the connected components (that have the state passed in as props) instead of the normal React components
const App = () => {
  return (
    <div>
      <h1>React components with access to state stored through Redux!</h1>
      <h3>The state is being passed into the components below without passing them through the main App Component!</h3>
      <ConnectedCount />
      <ConnectedPeople />
      <ConnectedAnimals />
    </div>
  )
}

// Wrap the App component with the Provider component with store as a prop to pass
// import { Provider } from 'react-redux' is above
const jsx = (
  <Provider store={store}>
    <App/>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))

// Additional actions that run on a timer
// Action - Create a person named Maxi every second
setInterval(() => {
  store.dispatch(addPerson("New Person :D New one every 3 seconds!", Math.floor(Math.random() * 100), "Unemployed", "Somewhere in the World"))
}, 3000)

setInterval(() => {
  store.dispatch(addAnimal("New Animal (,,,/(;,,;)/,,,) New one every 5 seconds!", "Pokemon", "Water", Math.floor(Math.random() * 100)))
}, 5000)