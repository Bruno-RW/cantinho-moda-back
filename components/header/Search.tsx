import { GoSearch } from "react-icons/go";

const Search = () => {
    return (
        <div className="relative group">
            <input className="text-black/80 w-96 h-10 px-4 border border-gray-100 rounded-2xl outline-none shadow-lg backdrop-blur-xl backdrop-saturate-200 placeholder:text-black/40"
                placeholder="Type to search..."
                type="search"
                name="search"
                id="search"
            />

            <button className="absolute right-3.5 top-2.5 text-black/50 transition hover:text-black/80 hover:scale-110 focus:scale-110 active:scale-100">
                <GoSearch size={20} />
            </button>
        </div> 
    );
}
export default Search;