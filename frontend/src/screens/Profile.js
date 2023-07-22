import pw from '../assets/landing.png'
import pm from '../assets/bg-mobile.png'
import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import ToggleSBContext from '../context/ToggleSBContext'
import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive';
import Scroller from '../components/Scroller'
import sampleCartoons from '../tests/sample_cartoons.json'
import Header from '../components/Header'

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

        <div className="flex bg-[#1F1D36] overflow-hidden">
            <div className="flex flex-col">
                {toggle || !isMobile ? <Sidebar username={user.username} name={user.name} userid={user.userid} /> : <></>}
            </div>
            
            <div className="w-1/6"></div>
            <div className={`justify-center h-[100%] ${!isMobile ? 'w-5/6 ' : 'w-6/6'}`}>
                
                <div className="w-[100] h-[300px] bg-cover z-0"
                    style={{ backgroundImage: `linear-gradient(180deg, transparent 0%, #1F1D36 97%), url(${isMobile ? pm : pw})` }}>
                </div>
                <div className="flex w-[100] items-center justify-center">
                    <div class="w-20 h-20 rounded-full flex justify-center items-center bg-stone-300">
                        404
                    </div>
                </div>
                <div className="flex flex-col justify-end items-center w-[100] h-[15%] bg-[#1F1D36]">
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
                <h1 className="w-[100] mt-4 -mb-12 pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Your Favorites</h1>
                <Scroller className="" cartoons={sampleCartoons} heading="Your Favorites"></Scroller>
                <h1 className="w-[100] mt-4 -mb-12 pb-8 text-center justify-center text-white text-lg lg:text-3xl font-bold tracking-wide">Your Watchlist</h1>
                <Scroller className="" cartoons={sampleCartoons} heading="Your Watchlist"></Scroller>
                <div className="w-[100] h=400 flex my-8 "></div>
            </div>
        </div>

    )

}

export default Profile