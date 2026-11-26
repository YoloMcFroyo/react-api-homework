import { useState, useEffect } from 'react';

export default function PokemonDetails({ name }) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function fetchDetails() {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}/`
            );

            if (!response.ok) return;

            const data = await response.json();

            if (!ignore) {
                setPokemon(data);
            }
        }

        fetchDetails();

        return () => {
            ignore = true;
        };
    }, [name]);

    if (!pokemon) return <p>Loading Pokémon...</p>;

    return (
        <main>
            <a href="/">← Back to Search</a>

            <h1>{pokemon.name}</h1>

            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />

            <p>
                Types: {pokemon.types.map(t => t.type.name).join(', ')}
            </p>

            <p>
                Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}
            </p>

            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
        </main>
    );
}