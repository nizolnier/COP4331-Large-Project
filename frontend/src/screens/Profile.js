import pw from '../assets/house.jpeg'
import Sidebar from '../components/Sidebar'
import { useContext, useEffect, useState } from 'react'
import ToggleSBContext from '../context/ToggleSBContext'
import { baseUrl } from '../constants/url.js'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive';
import Scroller from '../components/Scroller'
import sampleCartoons from '../tests/sample_cartoons.json'
import Header from '../components/Header'
import { useProtectedPage } from '../hooks/useProtectedPage'

const Profile = () => {
    useProtectedPage()

    const params = useParams()
    const navigate = useNavigate()
    const { toggle } = useContext(ToggleSBContext)
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    const [profile, setProfile] = useState({})


    const user = {
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name")
    }

    const loadProfile = () => {
        axios.get(`${baseUrl}/users/oneuser/${params.username}`, {headers: {
            Authorization: localStorage.getItem("token")
        }}).then((res) => { 
            
            setProfile(res.data)
        }).catch((err) => {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.log("Response data:", err.response.data); // This will log the response data from the server
                console.log("Status code:", err.response.status); // This will log the status code from the server
                console.log("Headers:", err.response.headers); // This will log the headers from the server

                // Now you can customize your error message based on the status code
                if (err.response.status === 401) {
                console.log("Unauthorized: Please log in again.");
                } else if (err.response.status === 500) {
                console.log("Internal Server Error: Please try again later.");
                } else {
                console.log("An error occurred. Please try again.");
                }
            } else if (err.request) {
                // The request was made, but no response was received from the server
                console.log("Request made, but no response received.");
            } else {
                // Something else happened while setting up the request
                console.log("Error:", err.message);
            }
        })
        }

    useEffect(() => {
        loadProfile()
    }, [])


    return (
        <div className="flex bg-[#1F1D36] overflow-hidden">
            <div className="flex flex-col">
                {toggle || !isMobile ? <Sidebar username={user.username} name={user.name} /> : <></>}
            </div>
            
            <div className="w-1/6"></div>
            <div className={`justify-center h-[100%] ${!isMobile ? 'w-5/6 ' : 'w-6/6'}`}>
                
                <div className="w-[100] h-[300px] bg-cover z-0"
                    style={{ backgroundImage: `linear-gradient(180deg, transparent 0%, #1F1D36 97%), url(${pw})` }}>
                </div>
                <div className="flex w-[100] items-center justify-center">
                <img className="w-20 h-20 bg-stone-300 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${profile?.username}.svg`} />
            
                </div>
                <div className="flex flex-col justify-end items-center w-[100] h-[15%] bg-[#1F1D36]">
                    <h1 className="w-screen pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Hi, {profile?.name}!</h1>
                    <div className="flex flex-row  w-screen h-[15%] items-center justify-center">
                        <div className="TotalFilms flex flex-col basis-28 items-center justify-center">
                            <div className="basis-1/4 left- top-0 justify-center text-center text-red-300 text-2xl font-bold">{profile?.watchlist?.length}</div>
                            <div className="TotalCartoons flex basis-8 items-center justify-center text-center text-white text-xs font-normal">Watchlist Total</div>
                        </div>
                        <div className="Review flex flex-col basis-28 items-center justify-center">
                            <div className=" left-[8px] top-0 justify-center text-center text-fuchsia-800 text-2xl font-bold">{profile?.twatched}</div>
                            <div className="Reviews flex basis-8 items-center justify-center text-center text-white text-xs font-normal">Reviews</div>
                        </div>
                    </div>
                </div>
                <div className='justify-center'>
                    <h1 className="w-[100] mt-4 -mb-12 pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Your Favorites</h1>
                    {profile?.favcartoons ? <Scroller className="" cartoons={profile?.favcartoons} ></Scroller> : <div className='flex basis-8 items-center justify-center text-center text-white text-xs font-normal p-10'>No Favorites</div>}
                    <h1 className="w-[100] mt-4 -mb-12 pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Your Watchlist</h1>
                    {profile?.watchlist ? <Scroller className="" cartoons={profile?.watchlist} ></Scroller> : <div className='flex basis-8 items-center justify-center text-center text-white text-xs font-normal p-10'>No Watchlist</div>}
                    <div className="w-[100] h=400 flex my-8 py-20"></div>

                </div>
            </div>
        </div>

    )

}

export default Profile