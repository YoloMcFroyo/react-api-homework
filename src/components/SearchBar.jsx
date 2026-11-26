import { useEffect, useState } from 'react';
import './SearchBar.css';

const suggestions = ['Pikachu', 'MewTwo', 'Dialga', 'Groudon', 'Samurott', 'Gyarados', 'Raikou']

export default function SearchBar({ onSearch }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % suggestions.length)
      }, 4000);

      return () => clearInterval(interval);
    }, []);

    function handleSearch(e){
        e.preventDefault();

        const searchInput = new FormData(e.currentTarget).get('search');
        if (!searchInput) return;

        onSearch(searchInput.trim().toLowerCase());
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                name='search'
                className='search-input'
                placeholder={suggestions[index]}
            />
            <button type='submit'>Find Pokemon</button>
        </form>
    )
}