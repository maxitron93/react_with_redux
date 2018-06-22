// ADD_ANIMAL
const addAnimal = (name = "No name", species  = "No species", breed = "No breed" , age = null) => {
  return {
    type: 'ADD_ANIMAL',
    name: name,
    species: species,
    breed: breed,
    age: age
  }
}

// REMOVE_ANIMAL
const removeAnimal = (name) => {
  return {
    type: 'REMOVE_ANIMAL',
    name: name
  }
}

export { addAnimal, removeAnimal }