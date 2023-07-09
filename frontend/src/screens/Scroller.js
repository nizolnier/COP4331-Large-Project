import Card from './Card'
import { useState, useEffect } from 'react'

import useCardResize from '../hooks/useCardResize.js'

const Scroller = ({...props}) => {
    const [cartoons, setCartoons] = useState(props.cartoons);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCartoons, setCurrentCartoons] = useState([]);
    const [maxPages, setMaxPages] = useState();
    const [animationClass, setAnimationClass] = useState('');
    const [cardWidth, setCardWidth] = useState('');

    const { cartoonsPerPage } = useCardResize(5);
    useEffect(() => {
        // Update current cartoons when number of cartoons per page changes
        let page = currentPage;
        let max = Math.ceil((cartoons.length / cartoonsPerPage));
        // If page expanding causes current page to be greater than the max
        if (currentPage > max)
        {
            page = max;
            setCurrentPage(page);
        }
        setMaxPages(max);

        updateCartoons()

        // Update card widths
        setCardWidth(Math.floor(100*(1/props.cartoonsPerPage)) + '%');
    }, [cartoonsPerPage])

    useEffect(() => {
        updateCartoons()
    }, [currentPage])

    const updateCartoons = () => {
        // Update current cartoons when page number changes
        let lastIndex = currentPage * cartoonsPerPage;
        let firstIndex = lastIndex - cartoonsPerPage;
        setCurrentCartoons(cartoons.slice(firstIndex, lastIndex));
    }

    const paginateLeft = () => {
        setAnimationClass("invisible translate-x-[120%]")
        setTimeout(() => {
            setAnimationClass("invisible translate-x-[-120%]")
            if (currentPage > 1)
                setCurrentPage(currentPage - 1);
            else
                setCurrentPage(maxPages);

            setTimeout(() => {
                setAnimationClass("translate-x-[0]")
            }, 100)
        }, 100)
    }

    const paginateRight = () => {
        setAnimationClass("invisible translate-x-[-120%]")
        setTimeout(() => {
            setAnimationClass("invisible translate-x-[120%]")
            setCurrentPage((currentPage % maxPages) + 1);
            setTimeout(() => {
                setAnimationClass("translate-x-[0]")
            }, 100)
        }, 100)
    }

    let cartoonRender = currentCartoons.map((cartoon, index) => {
        return <Card 
            cartoon={cartoon} 
            key={cartoon.id}
            width={cardWidth}></Card>
    })

    return (
        <div className="flex flex-row gap-5 h-72 overflow-x-hidden p-4">
            <div className="flex flex-column justify-center">
                <button onClick={paginateLeft} className='h-12 w-12 m-auto hover:bg-gray-100 rounded-full'>
                <svg className="w-6 h-6 text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                </svg>
                </button>
            </div>
            <div className={"w-full flex flex-row justify-start gap-4 h-full transition-{translate} duration-100 " + animationClass}>
                { cartoonRender }
            </div>
            <div className="flex flex-column justify-center">
                <button onClick={paginateRight} className='h-12 w-12 m-auto hover:bg-gray-100 rounded-full'>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Scroller