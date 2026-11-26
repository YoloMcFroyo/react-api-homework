import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import TypeSearch from './components/TypeSearch';
import PokemonResults from './components/PokemonResults';
import PokemonDetails from './components/PokemonDetails';

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
          : data.pokemon.map(item => item.pokemon);

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
    <>
      <SearchBar onSearch={value => setQuery({ kind: 'pokemon', value })} />
      <TypeSearch onSearch={value => setQuery({ kind: 'type', value })} />

      <PokemonResults pokemon={results} />
    </>
  );
}

export default App;