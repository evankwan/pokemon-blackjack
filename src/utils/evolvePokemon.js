//evolvePokemon handles when a pokemon evolves into the next level in their evolutlion line
//once a pokemon has evolved, their current level is removed from the array with .shift

const evolvePokemon = (playerPokemon) => {
  const evolutionLine = [...playerPokemon];
  evolutionLine.shift();
  
  return evolutionLine
}

export default evolvePokemon