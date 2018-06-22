// ADD_PERSON
const addPerson = (name, age, occupation, location) => {
  return {
    type: 'ADD_PERSON',
    name: name,
    age: age,
    occupation: occupation,
    location: location
  }
}

// REMOVE_PERSON
const removePerson = (name) => {
  return {
    type: 'REMOVE_PERSON',
    name: name
  }
}

export { addPerson, removePerson }