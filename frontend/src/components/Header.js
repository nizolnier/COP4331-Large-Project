import { useContext } from 'react'
import side from '../assets/side.svg'
import ToggleSBContext from '../context/ToggleSBContext'

const Header = ({username}) => {
    const {toggle, setToggle} = useContext(ToggleSBContext)

    const click = () => {
        setToggle(!toggle)
    }

    return <div className="flex justify-between pt-8 p-6">
        <img onClick={click} src={side}/>  
        <img className="w-12 h-12 bg-stone-300 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`} />
    </div>
}

export default Header