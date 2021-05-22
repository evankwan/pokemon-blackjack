// returns value from a random index of an array
const randomizer = (array) => {
  const currentIndex = Math.floor(Math.random() * array.length);
  return array[currentIndex]
}

export default randomizer