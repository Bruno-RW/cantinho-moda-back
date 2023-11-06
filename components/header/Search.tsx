import { GoSearch } from "react-icons/go";

const Search = () => {
  return (
    <div className="relative group">
      <input className="bg-border text-black/80 w-96 h-10 px-4 rounded-2xl outline-none transition-all dark:text-neutral-100 dark:placeholder:text-neutral-300"
        placeholder="Type to search..."
        type="search"
        name="search"
        id="search"
      />

      <button className="absolute right-3.5 top-2.5 text-black/50 transition-all hover:text-black/80 hover:scale-110 focus:scale-110 active:scale-100 dark:text-neutral-200 dark:hover:text-neutral-100">
        <GoSearch size={20} />
      </button>
    </div>
  );
}
export default Search;