import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import TypeSearch from './components/TypeSearch';
import PokemonResults from './components/PokemonResults';
import PokemonDetails from './components/PokemonDetails';
import './app.css';

function App() {
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);


  useEffect(() => {
    if (!query) return;

    let ignore = false;

    async function fetchPokemon() {
      const url = `https://pokeapi.co/api/v2/${query.kind}/${query.value}/`;
      const response = await fetch(url);

      if (!response.ok) {
        if (!ignore) setResults([]);
        return;
      }

      const data = await response.json();
      if (!ignore) {
        const pokemon = query.kind === 'pokemon'
          ? [data]
          : data.pokemon.map(item => {
            const p = item.pokemon;
            const id = p.url.split('/').filter(Boolean).pop();

            //find pics of pokemon seperately - API doesnt give sprites when called as a collection
            return {
              ...p,
              sprites: {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
              }
            };
          });

        if (!ignore) {
          setResults(pokemon);
        }
      }
    }

    fetchPokemon();

    return () => {
      ignore = true;
    };
  }, [query]);

  const selectedPokemon = new URLSearchParams(window.location.search).get('pokemon');

  if (selectedPokemon) {
    return <PokemonDetails name={selectedPokemon} />;
  }

  return (
    <div className='main'>
      <h1>Pokédex</h1>
      <p>Search for a Pokémon by name or browse by type.</p>
      <img src='./src/assets/Pokeball.png' />
      <SearchBar onSearch={value => setQuery({ kind: 'pokemon', value })} />
      <TypeSearch onSearch={value => setQuery({ kind: 'type', value })} />

      <PokemonResults pokemon={results} />
    </div>
  );
}

export default App;