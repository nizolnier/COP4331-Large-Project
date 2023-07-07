import Card from './Card'
import { useState, useEffect } from 'react'

const Scroller = ({...props}) => {
    const [cartoons, setCartoons] = useState(props.cartoons);
    const [currentPage, setCurrentPage] = useState(1);
    const [cartoonsPerPage, setCartoonsPerPage] = useState(5);
    const [currentCartoons, setCurrentCartoons] = useState([]);
    const [maxPages, setMaxPages] = useState();

    useEffect(() => {
        let lastIndex = currentPage * cartoonsPerPage;
        let firstIndex = lastIndex - cartoonsPerPage;
        setMaxPages(Math.ceil((cartoons.length / cartoonsPerPage)));
        setCurrentCartoons(cartoons.slice(firstIndex, lastIndex));
    }, [currentPage])

    const paginateLeft = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1);
        else
            setCurrentPage(maxPages)
    }

    const paginateRight = () => {
        setCurrentPage((currentPage % maxPages) + 1);
    }

    let cartoonRender = currentCartoons.map((cartoon, index) => {
        return <Card 
            cartoon={cartoon} 
            key={cartoon.id}
            cartoonsPerPage={cartoonsPerPage}></Card>
    })

    return (
        <div className="flex flex-row gap-5 h-72 place-space-between">
            <div className="flex flex-column justify-center">
                <button onClick={paginateLeft} className='h-12 w-12 m-auto hover:bg-gray-100 rounded-full'>
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto">
                        <path d="M1.70711 8.26522C1.31659 7.87469 0.683424 7.87469 0.2929 8.26522C-0.0976246 8.65574 -0.0976247 9.28891 0.2929 9.67943L1.70711 8.26522ZM9.73479 16.2929L1.70711 8.26522L0.2929 9.67943L8.32057 17.7071L9.73479 16.2929Z" fill="#5E5B81"/>
                        <path d="M0.292898 8.32057C-0.097626 8.71109 -0.097626 9.34426 0.292898 9.73478C0.683423 10.1253 1.31659 10.1253 1.70711 9.73478L0.292898 8.32057ZM8.32057 0.292893L0.292898 8.32057L1.70711 9.73478L9.73479 1.70711L8.32057 0.292893Z" fill="#5E5B81"/>
                    </svg>
                </button>
            </div>
            <div className="w-full flex flex-row gap-4 h-72">
                { cartoonRender }
            </div>
            <div className="flex flex-column justify-center">
                <button onClick={paginateRight} className='h-12 w-12 m-auto hover:bg-gray-100 rounded-full'>
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto">
                        <path d="M8.32057 9.73478C8.71109 10.1253 9.34426 10.1253 9.73478 9.73478C10.1253 9.34426 10.1253 8.71109 9.73478 8.32057L8.32057 9.73478ZM0.292893 1.70711L8.32057 9.73478L9.73478 8.32057L1.70711 0.292893L0.292893 1.70711Z" fill="#5E5B81"/>
                        <path d="M9.73478 9.67943C10.1253 9.28891 10.1253 8.65574 9.73478 8.26522C9.34426 7.87469 8.71109 7.87469 8.32057 8.26522L9.73478 9.67943ZM1.70711 17.7071L9.73478 9.67943L8.32057 8.26522L0.292893 16.2929L1.70711 17.7071Z" fill="#5E5B81"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Scroller