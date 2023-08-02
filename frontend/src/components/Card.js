import React, { useState, useEffect, useRef, memo } from 'react'
import { Link } from 'react-router-dom'

const Card = React.forwardRef(({ ...props }, ref) => {
    const [cartoon, setCartoon] = useState(props.cartoon);
    const [cardWidth, setCardWidth] = useState('');
    const [cardHeight, setCardHeight] = useState('');

    useEffect(() => {
        if (props.width) {
            setCardWidth(props.width);
        }
        else {
            setCardWidth('auto')
        }
    }, [props.width])

    useEffect(() => {
        if (props.height) {
            setCardHeight(props.height)
        }
        else {
            setCardHeight('auto')
        }
    }, [props.height])

    useEffect(() => {
        setCartoon(props.cartoon)
    }, [props.cartoon])

    return (
        <div style={{ width: cardWidth, height: cardHeight }} className={props.className} ref={ref}>
            <Link
                id={cartoon._id}
                title={cartoon.title}
                to={"/cartoons/" + cartoon._id}
                className={"h-[90%] block"}>
                <img src={cartoon.picture} className={'h-full rounded-md transition-transform hover:shadow-lg hover:slay-sm object-cover object-top m-auto hover:scale-[1.1]'} />
            </Link>
            <div class="flex items-center justify-center">
                <svg class="w-3 h-3 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p class="ml-2 text-xs font-bold text-gray-300 dark:text-white">{cartoon.avgrating}</p>
                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <svg class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                </svg>
                <span href="#" class="text-xs ml-2 font-medium text-white">{cartoon.nrating}</span>
            </div>
        </div>
    )
})

export default Card