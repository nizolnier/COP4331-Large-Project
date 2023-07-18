//get results from here and pass it as context

//import { test, setTest } from '../screens/Search'
//onSubmit setQuery

const SearchBar = () => {

    return (
        <div className="relative w-[96%]">
            <form onSubmit={(e) => {e.preventDefault();}}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <button type="button" className="cursor-pointer">
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                </div>
                <input type="text" id="query" required placeholder="Search..." className="bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />
            </form>
        </div>        
    );
}

export default SearchBar