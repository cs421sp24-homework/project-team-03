import { Input } from "./input";

const SearchInput = () => {
    return (
        <div>
            <Input
              id="username"
              className="col-span-3"
              placeholder="Search"
              style={{ color: 'black', width: '600px', borderColor: '#bbb' }}
            />
        </div>
    );
};
  
export default SearchInput;





