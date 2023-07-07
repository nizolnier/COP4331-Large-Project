import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Card = ({...props}) => {
    const [cartoon, setCartoon] = useState(props.cartoon);
    const [className, setClassName] = useState('');

    useEffect(() => {
        setClassName('w-1/' + props.cartoonsPerPage);
    }, [props.cartoonsPerPage])

    return (
        <div className={className}>
            <Link key={props.key} 
                id={cartoon.id} 
                title={cartoon.title}
                to={"/cartoons/" + cartoon.id}
                className={className}>
                <img src={cartoon.image} className={'w-full h-full rounded-md hover:shadow-lg hover:shadow-rose-200 object-cover'}/>
            </Link>
            <p className="flex flex-row p-1 gap-1" title={"Favorited 30 times"}>
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z" fill="#FF8A00"/>
                </svg>
                <small>30</small>
            </p>
        </div>
    )
}

export default Card