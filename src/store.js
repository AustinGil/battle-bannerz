import { reactive } from 'vue'
import pokemonList from './data/pokemonList.js'
const randomPokemonIndex = Math.floor(Math.random() * pokemonList.length) + 1
const randomPokemon = pokemonList[randomPokemonIndex]
const currentQuery = new URLSearchParams(window.location.search)

const data = reactive({
  // Scene
  width: 600,
  height: 200,
  location: currentQuery.get('location') || 'grass',
  timeOfDay: currentQuery.get('timeOfDay') || 'day',
  // Opponent
  opponentNum: randomPokemon.num,
  opponentName: randomPokemon.name,
  /** @type {string | ArrayBuffer} */
  opponentUrl: `/img/pokemon/${randomPokemon.num}.png`,
  opponentHealth: 100,
  // Trainer
  /** @type {'status'|'text'} */
  trainerBox: 'status',
  trainerName: '',
  trainerHealth: 100,
  customText: false,
  trainerText: `A wild ${randomPokemon.name.toUpperCase()} appeared!`,
})

export default data

export function updateData(event) {
  /** @type {HTMLInputElement} */
  const input = event.target
  const name = input.name
  const type = input.type
  if (!Object.prototype.hasOwnProperty.call(data, name)) return

  /** @type {string | number} */
  let value = input.value

  if (type === 'number') {
    value = Number(value)
    if (input.min) {
      value = Math.max(value, Number(input.min))
    }
    if (input.max) {
      value = Math.min(value, Number(input.max))
    }
  }

  data[name] = value
}