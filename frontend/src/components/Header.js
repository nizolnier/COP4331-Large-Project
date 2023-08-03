import { useContext } from 'react'
import side from '../assets/side.svg'
import ToggleSBContext from '../context/ToggleSBContext'
import { useMediaQuery } from 'react-responsive'


const Header = ({username}) => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    const {toggle, setToggle} = useContext(ToggleSBContext)

    const click = () => {
        setToggle(!toggle)
    }
 
    const user = {
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name")
    }

    return <div className="flex justify-between items-center pt-4 p-6">
        {isMobile? <img onClick={click} src={side}/> : <></>} 
        <div className={`${isMobile? "pl-4" : ""}`}>
            <h1 className="text-white font-open-sans lg:text-3xl text-base font-bold">Hello, <span className="text-red-300">{user.name}</span>!</h1>
            <h2 className="text-white lg:py-5 font-open-sans lg:text-lg text-sm font-normal">Review or track cartoons you've watched...</h2>
        </div>
        <img className="cursor-pointer w-12 h-12 bg-stone-300 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`} />
    </div>
}

export default Header