export default function PokemonResults({ pokemon }) {
    return (
        <div>
            {pokemon.map(p => (
                <div key={p.name}>
                    <h2>{p.name}</h2>
                    {p.sprites?.front_default && (
                        <img
                            src={p.sprites.front_default}
                            alt={p.name}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}