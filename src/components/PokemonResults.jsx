export default function PokemonResults({ pokemon }) {
    return (
        <div className="results">
            {pokemon.map(p => (
                <div className="pokemon-card" key={p.name}>
                    <h2>
                        <a href={`/?pokemon=${encodeURIComponent(p.name)}`}>
                            {p.name}
                        </a>
                    </h2>
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