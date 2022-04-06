import pokemonData from './pokemon.json'

const pokemonList = []
for (const pokemonKey in pokemonData) {
  if (!Object.hasOwnProperty.call(pokemonData, pokemonKey)) continue

  const pokemon = pokemonData[pokemonKey]
  if (pokemon.num === pokemonList.length) continue

  pokemonList.push(pokemon)
}
pokemonList.length = 300

export default pokemonList