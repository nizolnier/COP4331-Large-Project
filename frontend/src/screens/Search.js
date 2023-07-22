import { useRequestData } from '../hooks/useRequestData'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Card from '../components/Card'

import useCardResize from '../hooks/useCardResize.js'

// Change this once API endpoints are done
const baseUrl = 'http://localhost:3000';

import {
    useInfiniteQuery,
    useQueryClient
} from 'react-query'

const Search = () => {
    // Access the query client
    const queryClient = useQueryClient()

    // Search query, update this value with input
    const [query, setQuery] = useState('show');

    // To see if last cartoon is in viewport
    const { ref, inView } = useInView();
    // Number of cartoons fetched at a time
    const limit = 20;

    const resizeHook = useCardResize();
    const [cardWidth, setCardWidth] = useState('');

    useEffect(() => {
        // Update card widths
        setCardWidth(Math.floor(100*(1/resizeHook.cartoonsPerPage)) + '%');
    }, [resizeHook.cartoonsPerPage])

    const fetchCartoons = async (pageParam) => {
        const urlEnd = `/search?q=${query}&page=${pageParam}&limit=${limit}`

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
    }, [inView, fetchNextPage, hasNextPage])

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

    return (
        <div>
            <div className='flex flex-row flex-wrap gap-4 p-4 justify-start'>
                { results }
            </div>
            { isFetchingNextPage && <h3>Loading...</h3> }
        </div>
    )
}

export default Search