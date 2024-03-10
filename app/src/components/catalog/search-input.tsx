import { useEffect, useState } from 'react';
import { Input } from './input';
import { fetchHousingItems } from '@/lib/api';
import { HousingItem } from '@/lib/types';

const SearchInput = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<HousingItem[]>([]);
    
    useEffect(() => {
        // Define an async function to fetch search results
        const fetchSearchResults = async () => {
            try {
                // Fetch housing items based on the search value
                const housingItems = await fetchHousingItems(searchValue);
                setSearchResults(housingItems);
            } catch (error) {
                console.error('Error fetching housing items:', error);
            }
        };

        // Call the function to fetch search results whenever searchValue changes
        fetchSearchResults();
    }, [searchValue]); // Run the effect whenever searchValue changes


    return (
        <div>
            <Input
              id="username"
              className="col-span-3"
              placeholder="Search"
              style={{ color: 'black', width: '600px', borderColor: '#bbb' }}
              value={searchValue} // Bind the value of the input to the state
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
        </div>
    );
};
  
export default SearchInput;