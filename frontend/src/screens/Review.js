import { useEffect, useState } from 'react'
import back from '../assets/back.svg'
import Datepicker from 'tailwind-datepicker-react'
import axios from 'axios'
import { baseUrl } from '../constants/url'
import { useProtectedPage } from '../hooks/useProtectedPage'
import { useNavigate, useParams } from 'react-router-dom'
import { goToCartoon } from '../router/coordinator'

const Review = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const params = useParams()
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [fav, setFav] = useState(0)
    const [date, setDate] = useState("")
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState("")
    const [cartoon, setCartoon] = useState({})

    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")

    const handleChange = (selectedDate) => {
        setDate(selectedDate)
    }
    const handleClose = (state) => {
        setShow(state)
    }

    const onChange = (event) => {
        setComment(event.target.value)
    }

    const doReview = () => {
        let body = {
            showid: params.id,
            dateWatched: date,
            favorite: fav,
            stars: rating,
            comment: comment
        }

        axios.delete(`${baseUrl}/users/watchlist/${params.id}`).then((res) => {

        }).catch((err) => {
            console.log(err)
        })

        axios.post(`${baseUrl}/reviews`, body).then((res) => {

        }).catch((err) => {
            console.log(err)
        })

        body = {
            showid: params.id,
            stars: rating,
            favorite: fav
        }
        axios.patch(`${baseUrl}/shows/update`, body).then((res) => {

        }).catch((err) => {
            console.log(err)
        })

        if (fav) {
            axios.patch(`${baseUrl}/users/favcartoons/${params.id}`).then((res) => {

            }).catch((err) => {
                console.log(err)
            })

        }

        if (!fav) {
            axios.delete(`${baseUrl}/users/favcartoons/${params.id}`).then((res) => {

            }).catch((err) => {
                console.log(err)
            })
        }

        goToCartoon(navigate, params.id)


    }

    const loadCartoon = async () => {
        await axios.get(`${baseUrl}/shows/one/${params.id}`
        ).then((res) => {
            setCartoon(res.data.showExists)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadCartoon()
    }, [])


    // this is for the datepicker
    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date(),
        theme: {
            background: "dark:bg-[#3D3B53] bg-[#3D3B53]",
            icons: "text-white text-xs dark:bg-red-300 bg-red-300 hover:bg-fuchsia-800 dark:hover:bg-fuchsia-800 hover:text-white dark:hover:text-white",
            input: "lg:w-[200%] w-[100%] border border-stone-600  border-opacity-30 dark:border-opacity-30 dark:border dark:border-stone-600 dark:bg-[#3D3B53] bg-[#3D3B53] text-white text-[9px] dark:text-white dark:text-[9px]",
            inputIcon: "dark:text-white text-white",
            text: "hover:bg-red-300 dark:hover:bg-red-300",
            disabledText: "bg-[#323044] dark:bg-[#323044] hover:bg-red-300 dark:hover:bg-red-300",
            selected: "bg-fuchsia-800 dark:hover:bg-red-300",
        },
    }

    return (<div className="text-white items-center flex flex-col w-screen h-screen bg-[#1F1D36]">
        <div className="h-[5%]"></div>
        <div className="flex flex-col lg:w-1/2 w-[90%] h-[40%]">
            <div className="flex">
                <img src={back} onClick={() => goToCartoon(navigate, params.id)} />
                <h1 className="pl-6 text-sm font-semibold" >Write your review</h1>
            </div>
            <div className="pt-10 flex items-center justify-between w-[100%]">
                <div className="flex flex-col justify-between">
                    <h2 className="pb-4 text-lg font-bold">{cartoon?.title}</h2>
                    <div>
                        <p className="pb-2 text-xs font-normal">Specify the date you watched it</p>
                        <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                    </div>
                    <div className="flex flex-col">
                        <p className="py-2 text-xs font-normal">Give your rating</p>
                        <div className="flex lg:w-[150%] w-[100%] align-center justify-between">


                            <div className="flex">
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return <svg key={index} onClick={() => setRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)} className={`w-6 h-6 ${index <= (hover || rating) ? "text-yellow-300" : "text-[#3D3B53]"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                })}
                            </div>

                            <svg onClick={() => setFav(!fav)} className={`w-6 h-6 ${fav ? "text-red-600" : "text-[#3D3B54]"} hover:text-red-600`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div><img src={cartoon?.picture} className="w-[116px] h-[166px] bg-stone-300 rounded-[7px]" /></div>
            </div>

        </div>
        <textarea onChange={onChange} value={comment} placeholder="Write down your review..." className="block p-2.5 lg:w-1/2 w-[90%] h-[40%] text-sm rounded-lg bg-[#3D3B53] border-opacity-30 border border-stone-600 text-white text-opacity-50 font-semibold focus:ring-blue-500 focus:border-blue-500">
        </textarea>
        <div className="self-end my-4 w-[32.5%]"><button onClick={doReview} className="text-gray-800 text-[13px] font-semibold w-[104px] h-9 bg-red-300 rounded-[20px]">Publish</button></div>
        <div className="h-[5%]"></div>
    </div >)
}

export default Review
