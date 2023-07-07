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
import { useNavigate } from 'react-router-dom'
import { goToLogin, goToProfile, goToSearch } from '../router/coordinator'


const Sidebar = ({ username, name, userid }) => {
    const navigate = useNavigate()
    const {toggle, setToggle} = useContext(ToggleSBContext)

    const click = () => {
        setToggle(!toggle)
    }

    const doLogout = () => {
        //remove token here

        goToLogin(navigate)
    }
    const refreshPage = () => {
        window.location.reload(false);
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
            <MenuItem image={home} title="Home" goto={refreshPage} />
            <MenuItem image={cartoon} title="Cartoons" goto={() => goToSearch(navigate)} />
            <MenuItem image={review} title="Reviews"  goto={() => goToProfile(navigate, userid)} />
            <MenuItem image={watchlist} title="Watchlist" goto={() => goToProfile(navigate, userid)} />
            <MenuItem image={heart} title="Likes" goto={() => goToProfile(navigate, userid)} />
        </div>

 
        <MenuItem image={logout} title="Logout" goto={doLogout} />
    </div>)
}

export default Sidebar