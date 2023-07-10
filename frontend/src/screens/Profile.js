import pw from '../assets/landing.png'
import pm from '../assets/bg-mobile.png'
import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import ToggleSBContext from '../context/ToggleSBContext'
import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive';

const Profile = () => {
    const user = {
        username: "zain",
        name: "Zain",
        userid: "1",
        numWatchlist: "244",
        numReviews: "67"

    }
    const navigate = useNavigate()
    const { toggle } = useContext(ToggleSBContext)
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })


    return (

        <div className="flex flex-col w-screen bg-[#1F1D36]">
            <div className="w-screen h-[250px] bg-cover z-0"
                    style={{ backgroundImage: `linear-gradient(180deg, transparent 0%, #1F1D36 97%), url(${isMobile ? pm : pw})` }}>
                </div>
            <div>
                <div>
                    {toggle || !isMobile ? <Sidebar username={user.username} name={user.name} userid={user.userid} /> : <></>}
                </div>
                <div className="flex w-screen items-center justify-center">
                    <div class="w-20 h-20 rounded-full flex justify-center items-center bg-stone-300">
                        404
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-screen h-[15%] bg-[#1F1D36]">
                    <h1 className="w-screen pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Hi, {user.name}!</h1>
                    <div className="flex flex-row  w-screen h-[15%] items-center justify-center">
                        <div className="TotalFilms flex flex-col basis-28 items-center justify-center">
                            <div className="basis-1/4 left- top-0 justify-center text-center text-red-300 text-2xl font-bold">{user.numWatchlist}</div>
                            <div className="TotalCartoons flex basis-8 items-center justify-center text-center text-white text-xs font-normal">Watchlist Total</div>
                        </div>
                        <div className="Review flex flex-col basis-28 items-center justify-center">
                            <div className=" left-[8px] top-0 justify-center text-center text-fuchsia-800 text-2xl font-bold">{user.numReviews}</div>
                            <div className="Reviews flex basis-8 items-center justify-center text-center text-white text-xs font-normal">Reviews</div>
                        </div>
                    </div>
                </div>
                <h1 className="w-screen my-8 pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Your Favorites</h1>
                <div className="flex flex-row justify-center items-center w-screen">


                </div>
                <div className="flex basis-36 flex-col justify-center items-center w-screen">
                    <h1 className="w-screen my-8 pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Your Watchlist</h1>
                </div>
                <div className="flex flex-row justify-center items-center w-screen">

                </div>
                <div className="w-screen h=10 flex my-8">

                </div>
            </div>
        </div>

    )

}

export default Profile