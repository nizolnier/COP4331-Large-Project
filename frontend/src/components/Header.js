import { useContext } from 'react'
import side from '../assets/side.svg'
import ToggleSBContext from '../context/ToggleSBContext'

const Header = ({username}) => {
    const {toggle, setToggle} = useContext(ToggleSBContext)
 
    const user = {
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name")
    }

    return <div className="flex justify-between pt-8 p-6">
        <div className='justify-center'>
            <h1 className="text-white font-open-sans text-lg font-bold">Hello, {user.name}!</h1>
            <h2 className="text-white font-open-sans text-xs font-normal">Review or track cartoons you've watched...</h2>
        </div>
        <img className="w-12 h-12 bg-stone-300 rounded-full" src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`} />
    </div>
}

export default Header