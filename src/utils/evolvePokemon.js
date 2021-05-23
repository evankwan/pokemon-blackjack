const evolvePokemon = (playerPokemon) => {
  const evolutionLine = [...playerPokemon];
  evolutionLine.shift();
  
  return evolutionLine
}

export default evolvePokemon