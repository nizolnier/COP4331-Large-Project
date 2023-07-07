import MenuItem from './MenuItem'
import cartoon from '../assets/cartoon.svg'
import heart from '../assets/heart.svg'
import home from '../assets/home.svg'
import logout from '../assets/logout.svg'
import review from '../assets/review.svg'
import watchlist from '../assets/watchlist.svg'
import side from '../assets/side.svg'
import { useContext } from 'react'
import ToggleSBContext from '../context/ToggleSBContext'


const Sidebar = ({ username, name }) => {
    const {toggle, setToggle} = useContext(ToggleSBContext)

    const click = () => {
        setToggle(!toggle)
    }

    return (<div className="bg-[#1F1D36] lg:w-1/6 w-[55%] h-screen z-100 p-4 fixed shadow-slay-sm">
        <div className="pt-8 p-6 pl-2">
            <img onClick={click} src={side}/>            
        </div>
        <div className="flex items-center">
            <img className="w-12 h-12 bg-stone-300 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`} />
            <div className="flex flex-col ml-5">
                <h1 className="text-red-300 text-xl font-bold">{name}</h1>
                <p className="text-white text-opacity-50 text-sm font-normal">{username}</p>
            </div>
        </div>
        <div className="py-4 pt-8">
            <MenuItem image={home} title="Home" />
            <MenuItem image={cartoon} title="Cartoons" />
            <MenuItem image={review} title="Reviews" />
            <MenuItem image={watchlist} title="Watchlist" />
            <MenuItem image={heart} title="Likes" />
        </div>

 
        <MenuItem image={logout} title="Logout" />
    </div>)
}

export default Sidebar