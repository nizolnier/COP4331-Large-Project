import { useRequestData } from '../hooks/useRequestData'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useContext } from 'react'
import sampleShows from '../tests/sample_cartoons.json'
//import SearchBar from '../components/Searchbar'
import SideBar from '../components/Sidebar'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useProtectedPage } from '../hooks/useProtectedPage'
import Card from '../components/Card'
import { baseUrl } from '../constants/url'

import useCardResize from '../hooks/useCardResize.js'

import TestContext from '../components/Searchbar.js'

import {
    useInfiniteQuery,
    useQueryClient
} from 'react-query'

const Search = () => {
    useProtectedPage()

    // Access the query client
    const queryClient = useQueryClient()

    // Search query, update this value with input
    const [query, setQuery] = useState('show');
    const [isLoading, setIsLoading] = useState(false)
    const [resultsFound, setResultsFound] = useState(true)

    // To see if last cartoon is in viewport
    const { ref, inView } = useInView();
    // Number of cartoons fetched at a time
    const limit = 20;

    const { cartoonsPerPage } = useCardResize();
    const [cardWidth, setCardWidth] = useState('');

    useEffect(() => {
        // Update card widths
        setCardWidth(Math.floor(100*(1/cartoonsPerPage)) + '%');
    }, [cartoonsPerPage])


    const SearchBar = () => {

    const handleSearch = () => {
        let data = document.getElementById("query")
        setQuery(data.value)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            //setResultsFound(false)
        }, 1200)
    }


        return (
            <div className="relative w-[96%]">
                <form onSubmit={handleSearch}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <button type="button" className="cursor-pointer">
                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>
                    <input type="search" id="query" required placeholder="Search..." className="bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />
                </form>
            </div>        
        );
    }




    const fetchCartoons = async (pageParam) => {
        const urlEnd = `/api/shows/search?input=${query}&page=${pageParam}&limit=${limit}`

        const res = await axios.get(`${baseUrl}${urlEnd}`);

        return {
            result: res.data,
        }
    }

    // Infinite query
    const {
        data,
        isSuccess,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
        } = useInfiniteQuery({
        queryKey: ["cartoons", query],
        queryFn: ({ pageParam = 1 }) => fetchCartoons(pageParam),
        getNextPageParam: (lastPage) => {
            // Return next page number
            // May need to be adjusted when API is done
            if (lastPage.result.page < lastPage.result.pages)
            {
                return lastPage.result.page + 1;
            }
            return undefined;
        }
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    let results = null;
    if (isSuccess && data != null) {
        results = data.pages.map((page) => {
            if (page) {
                return page.result.cartoons.map((cartoon, index) => {
                    if (index == limit - 1)
                    {
                        return <Card cartoon={cartoon} key={index} ref={ref} height={'100px'} width={cardWidth}></Card>
                    }
                    return <Card cartoon={cartoon} key={index} width={cardWidth} height={'200px'}></Card>
                })
            }
        })
    }




    let loadingResults =  (
        <div className='flex items-center justify-center h-screen w-full'>
            <div role="status" >
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
            <span className='text-center'>Loading...</span>

        </div>
    )    

    const width = 700                       
    
    return (
        <div className='w-full bg-[#1F1D36] text-white min-h-screen'>
            <div className='flex flex-row h-full'>

                <SideBar/>
                <div className='w-1/6'></div>
                <div className='ml-5 w-5/6 h-full'>
                    <h1 className='py-5'>Search</h1>
                    <SearchBar/>
                    <div className='flex flex-row flex-wrap gap-10 p-4 justify-start'>
                        {results ? (results.length > 0 ? results : <div>No results found</div>) : loadingResults}
                    </div>
                    { isFetchingNextPage && <h3>Loading...</h3> }


                </div>

            </div>

            {width < 700 ? <NavBar/> : <></>}
        </div>
    )
}

export default Search