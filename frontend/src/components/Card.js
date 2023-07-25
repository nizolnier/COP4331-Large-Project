import React, { useState, useEffect, useRef, memo } from 'react'
import { Link } from 'react-router-dom'

const Card = React.forwardRef(({...props}, ref) => {
    const [cartoon, setCartoon] = useState(props.cartoon);
    const [cardWidth, setCardWidth] = useState('');
    const [cardHeight, setCardHeight] = useState('');

    useEffect(() => {
        if (props.width)
        {
            setCardWidth(props.width);
        }
        else
        {
            setCardWidth('auto')
        }
    }, [props.width])

    useEffect(() => {
        if (props.height)
        {
            setCardHeight(props.height)
        }
        else
        {
            setCardHeight('auto')
        }
    }, [props.height])

    useEffect(() => {
        setCartoon(props.cartoon)
    }, [props.cartoon])

    return (
        <div style={{width: cardWidth, height: cardHeight}} className={props.className} ref={ref}>
            <Link 
                id={cartoon._id} 
                title={cartoon.title}
                to={"/cartoons/" + cartoon.id}
                className={"h-[90%] block"}>
                <img src={cartoon.picture} className={'h-full rounded-md hover:shadow-lg hover:slay-sm object-cover object-top m-auto'}/>
            </Link>
            <div className="flex flex-row p-1 gap-1 shrink-0 justify-center ">
                <div className="flex flex-row gap-1 justify-center items-center" title={"Favorited " + cartoon.nfavorites + " times"}>
                    <svg className="w-3 h-3 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
                    </svg>
                    <small className="text-xs">{cartoon.nfavorites}</small>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center" title={"Average Rating: " + cartoon.avgrating + "%"}>
                    <svg className="w-3 h-3 text-orange-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <small>{cartoon.avgrating}%</small>
                </div>
            </div>
        </div>
    )
})

export default Card