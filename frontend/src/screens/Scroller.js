import Card from './Card'
import { useState, useEffect } from 'react'

const Scroller = ({...props}) => {
    const [cartoons, setCartoons] = useState(props.cartoons);
    const [currentPage, setCurrentPage] = useState(1);
    const [cartoonsPerPage, setCartoonsPerPage] = useState(5);
    const [currentCartoons, setCurrentCartoons] = useState([]);
    const [maxPages, setMaxPages] = useState();
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    // Change number of cartoons in scroller depending on window width
    const handleResize = () => {
        let innerWidth = window.innerWidth;
        if (innerWidth > 1280)
        {
            setCartoonsPerPage(6);
        }
        else if (innerWidth > 720)
        {
            setCartoonsPerPage(5);
        }
        else
        {
            setCartoonsPerPage(3);
        }
    }

    useEffect(() => {
        // Update current cartoons when page or number of cartoons per page changes
        let lastIndex = currentPage * cartoonsPerPage;
        let firstIndex = lastIndex - cartoonsPerPage;
        setMaxPages(Math.ceil((cartoons.length / cartoonsPerPage)));
        setCurrentCartoons(cartoons.slice(firstIndex, lastIndex));
    }, [currentPage, cartoonsPerPage])

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
            }, 200)
        }, 300)
    }

    const paginateRight = () => {
        setAnimationClass("invisible translate-x-[-120%]")
        setTimeout(() => {
            setAnimationClass("invisible translate-x-[120%]")
            setCurrentPage((currentPage % maxPages) + 1);
            setTimeout(() => {
                setAnimationClass("translate-x-[0]")
            }, 200)
        }, 300)
    }

    let cartoonRender = currentCartoons.map((cartoon, index) => {
        return <Card 
            cartoon={cartoon} 
            key={cartoon.id}
            cartoonsPerPage={cartoonsPerPage}></Card>
    })

    return (
        <div className="flex flex-row gap-5 h-72 place-space-between overflow-x-hidden">
            <div className="flex flex-column justify-center">
                <button onClick={paginateLeft} className='h-12 w-12 m-auto hover:bg-gray-100 rounded-full'>
                <svg className="w-6 h-6 text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                </svg>
                </button>
            </div>
            <div className={"w-full flex flex-row gap-4 h-72 transition-{translate} duration-300 " + animationClass}>
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