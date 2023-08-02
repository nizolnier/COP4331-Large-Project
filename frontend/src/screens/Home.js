import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { useProtectedPage } from '../hooks/useProtectedPage'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header'
import ToggleSBContext from '../context/ToggleSBContext'
import Scroller from '../components/Scroller'

import { baseUrl } from '../constants/url'
import axios from 'axios'
import Rating from '../components/Rating'

const Home = () => {
    const {toggle} = useContext(ToggleSBContext)
    const [allCartoons, setAllCartoons] = useState([])
    const [comedyCartoons, setComedyCartoons] = useState([])
    const [dramaCartoons, setDramaCartoons] = useState([])
    const [profile, setProfile] = useState({})
    const [recentReviews, setRecentReviews] = useState([])
    const [reviewDeets, setReviewDeets] = useState([])
    const imageAspectRatio = '2/3'
    const [sortType, setSortType] = useState('ascending')

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    const user = {
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name")
    }

    let calledOnce = false;

    useProtectedPage()

    useEffect(() => {
        getUser(user.username, setProfile)
        getAllCartoons() 
        getGenre('Comedy', setComedyCartoons)   
        getGenre('Drama', setDramaCartoons)  
        getReviews()   
    }, [])

    useEffect(() => {
        getReviews()
    }, [sortType])

    const getAllCartoons = async () => {
        axios.get(`${baseUrl}/shows/all`, {headers: {
            Authorization: localStorage.getItem("token")
        }}).then(res => {
            setAllCartoons(res.data)
        })
        .catch(err => {
            console.error(err)
        })
    }

    const getGenre = async (genre, setCartoons) => {
        axios.get(`${baseUrl}/shows/search`, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            params: {
                input: genre,
                page: 1,
                limit: 70
            }
        }).then(res => {
            setCartoons(res.data.cartoons)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getUser = async (userId, setterMethod) => {
        axios.get(`${baseUrl}/users/oneuser/${userId}`, {headers: {
            Authorization: localStorage.getItem("token")
        }}).then((res) => { 
            if (setterMethod != null)
                setterMethod(res.data)
            else
                return res.data
        }).catch((err) => {
            if (err.response) {
                console.log(err.response)
            }
        })
    }

    const getReviewUser = async (review) => {
        return axios.get(`${baseUrl}/users/one/${review.userid}`, {headers: {
            Authorization: localStorage.getItem("token")
        }}).then((res) => {
            return res.data.username
        }).catch((err) => {
            if (err.response) {
                console.log(err.response)
            }
        })
    }

    const getReviewShow = async (review) => {
        return axios.get(`${baseUrl}/shows/one/${review.showid}`, {headers: {
            Authorization: localStorage.getItem("token")
        }}).then((res) => { 
            return res.data.showExists
        }).catch((err) => {
            if (err.response) {
                console.log(err.response)
            }
        })
    }

    const getReviews = async () => {
        return axios.get(`${baseUrl}/reviews/all/`, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            params: {
                sort: sortType,
                limit: 10
            }
        }).then(res => {
            setRecentReviews(res.data.reviews)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (recentReviews.length > 0 && !calledOnce) {
            calledOnce = true;
            getReviewDetails()
        }
    }, [recentReviews])

    const getReviewDetails = async () => {
        let reviews = recentReviews
        for await (const r of reviews) {
            r.username = await getReviewUser(r)
            r.show = await getReviewShow(r)
        }
        setReviewDeets(reviews)
    }

    let reviewsRender = null;
    if (reviewDeets) {
        reviewsRender = reviewDeets.map((review) => {
            if (review) {
                return (
                    <div className="m-2 w-full flex flex-row bg-[#E9A6A60D] rounded-xl p-4" key={review._id}>
                        <div className={`h-auto w-24 aspect-[${imageAspectRatio}]`}>
                            <img className="rounded-xl" src={review.show?.picture}/>
                        </div>
                        <div className="flex flex-col pl-2 shrink">
                            <p>
                                <a href={`/cartoons/${review.show._id}`} className="font-bold hover:underline">{review.show?.title}</a>
                            </p>
                            <p className="flex flex-row gap-1 font-bold text-gray-500 pr-2">
                                Review by 
                                <a href={`/user/${review.username}`} className="text-rose-300 hover:underline"> {review.username}</a>
                                <Rating rating={review.stars}/>
                            </p>
                            <p className="text-sm">
                                {review.dateWatched ? "Watched on " + (new Date(review.dateWatched)).toDateString() : ''}
                            </p>
                            <p>{review.comment}</p>
                        </div>
                    </div>
                )
            }
        })
    } else {
        reviewsRender = (
            <div>
                Loading Reviews...
            </div>
        )
    }

    return (
        <div className="flex bg-[#1F1D36] overflow-hidden">
            <div className="flex flex-col">
                {toggle || !isMobile ? <Sidebar username={user.username} name={user.name} /> : <></>}
            </div>
            <div className="w-1/6"></div>
            <div className={`justify-center h-[100%] ${!isMobile ? 'w-5/6 ' : 'w-screen'} bg-[#1F1D36] min-h-screen text-white`} >
                <Header username={user.username} />
                <div>
                    <Scroller cartoons={allCartoons} heading="Popular"></Scroller>
                    <Scroller cartoons={profile.watchlist} heading="Watchlist"></Scroller>
                    <Scroller cartoons={comedyCartoons} heading="Comedy"></Scroller>
                    <Scroller cartoons={dramaCartoons} heading="Drama"></Scroller>
                </div>
                <div className="flex flex-col mx-4 mr-8">
                    <div>
                        <h2 className="text-xl font-bold">Recent Reviews</h2>
                        { sortType == 'ascending' ? 
                        <span className="inline-block hover:bg-rose-300 hover:text-black cursor-pointer bg-[#E9A6A60D] rounded-lg m-2 p-2" onClick={() => setSortType('descending')}>Get Latest</span> : <span className="inline-block hover:bg-rose-300 hover:text-black cursor-pointer bg-[#E9A6A60D] rounded-lg m-2 p-2" onClick={() => setSortType('ascending')}>Get Oldest</span>}
                    </div>
                    { reviewsRender }
                </div>
                <footer className="flex flex-end bg-[#1F1D36]">
                    {isMobile? <NavBar userid={user.userid} screen="home" /> : <></>}
                </footer>
            </div>
        </div>
    )
}

export default Home