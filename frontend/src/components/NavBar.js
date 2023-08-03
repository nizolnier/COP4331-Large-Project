import whiteHome from '../assets/white-navhome.svg'
import whiteSearch from '../assets/white-navsearch.svg'
import whiteProfile from '../assets/white-navprofile.svg'
import pinkHome from '../assets/pink-navhome.svg'
import pinkSearch from '../assets/pink-navsearch.svg'
import pinkProfile from '../assets/pink-navprofile.svg'
import { goToHome, goToProfile, goToSearch } from '../router/coordinator'
import { useNavigate } from 'react-router-dom'


const NavBar = ({screen, userid}) => {
    const navigate = useNavigate()

    return (<div className="bg-[#1F1D36] w-screen flex justify-evenly p-2 shadow-slay-sm">
        <div className="hover:bg-red-200 hover:bg-opacity-50 p-2 hover:rounded-sm" onClick={() => goToHome(navigate)}>
            <img src={screen === "home"? pinkHome : whiteHome} className="pb-1"/> 
            {screen === "home" ? <div className="w-[22px] h-[0px] shadow border border-red-300 rounded-sm"></div> : <></> }
        </div>
        <div className="hover:bg-red-200 hover:bg-opacity-50 p-2 hover:rounded-sm" onClick={() => goToSearch(navigate)}>
            <img src={screen === "search" ? pinkSearch : whiteSearch} className="pb-1"/>
            {screen === "search" ? <div className="w-[22px] h-[0px] shadow border border-red-300 rounded-sm"></div> : <></> }
        </div>
        <div className="hover:bg-red-200 hover:bg-opacity-50 p-2 hover:rounded-sm" onClick={() => goToProfile(navigate, userid)}>
            <img src={screen === "profile" ? pinkProfile : whiteProfile} className="pb-1"/>
            {screen === "profile" ?  <div className="w-[22px] h-[0px] shadow border border-red-300 rounded-sm"></div> : <></> }
        </div>

        
        
    </div>)
}

export default NavBar