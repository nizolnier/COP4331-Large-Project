import MenuItem from './MenuItem'
import cartoon from '../assets/cartoon.svg'
import heart from '../assets/heart.svg'
import home from '../assets/home.svg'
import logout from '../assets/logout.svg'
import review from '../assets/review.svg'
import watchlist from '../assets/watchlist.svg'
import bcartoon from '../assets/bcartoon.svg'
import bheart from '../assets/bheart.svg'
import bhome from '../assets/bhome.svg'
import blogout from '../assets/blogout.svg'
import breview from '../assets/breview.svg'
import bwatchlist from '../assets/bwatchlist.svg'

import side from '../assets/side.svg'
import { useContext } from 'react'
import ToggleSBContext from '../context/ToggleSBContext'
import { useNavigate } from 'react-router-dom'
import { goToHome, goToLogin, goToProfile, goToSearch } from '../router/coordinator'


const Sidebar = ({ username, name }) => {
    const navigate = useNavigate()
    const {toggle, setToggle} = useContext(ToggleSBContext)

    const click = () => {
        setToggle(!toggle)
    }

    const doLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("name")

        goToLogin(navigate)
    }

    return (<div className="bg-[#1F1D36] lg:w-1/6 w-[55%] h-screen z-100 p-4 fixed shadow-slay-sm z-10">
        <div className="pt-8 p-6 pl-2">
            <img onClick={click} src={side}/>            
        </div>
        <div className="flex items-center cursor-default">
            <img className="w-12 h-12 bg-stone-300 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`} />
            <div className="flex flex-col ml-5">
                <h1 className="text-red-300 text-xl font-bold">{name}</h1>
                <p className="text-white text-opacity-50 text-sm font-normal">{username}</p>
            </div>
        </div>
        <div className="py-4 pt-8">
            <MenuItem rimage={bhome} image={home} title="Home" goto={() => goToHome(navigate)} />
            <MenuItem rimage={bcartoon} image={cartoon} title="Cartoons" goto={() => goToSearch(navigate)} />
            <MenuItem rimage={breview} image={review} title="Reviews"  goto={() => goToProfile(navigate, username)} />
            <MenuItem rimage={bwatchlist} image={watchlist} title="Watchlist" goto={() => goToProfile(navigate, username)} />
            <MenuItem rimage={bheart} image={heart} title="Likes" goto={() => goToProfile(navigate, username)} />
        </div>

 
        <MenuItem rimage={blogout} image={logout} title="Logout" goto={doLogout} />
    </div>)
}

export default Sidebar