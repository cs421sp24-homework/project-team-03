import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { Input } from '../ui/input';
import { fetchPosts } from '@/lib/api';

const SearchInput = () => {
    const [searchValue, setSearchValue] = useState('');
    const setPosts = useStore((state) => state.setPosts);

    useEffect(() => {

        let query = '';
        if (searchValue) {
          query += `&search=${searchValue}`;
        }
        // Define an async function to fetch search results
        const fetchSearchResults = async () => {
            try {
                // Fetch housing items based on the search value
                const searchResults = await fetchPosts(query);
                setPosts(searchResults);
            } catch (error) {
                console.error('Error fetching housing items:', error);
            }
        };

        // Call the function to fetch search results whenever searchValue changes
        fetchSearchResults();
    }, [searchValue, setPosts]); // Run the effect whenever searchValue changes


    return (
        <div>
            <Input
              id="search-bar"
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


