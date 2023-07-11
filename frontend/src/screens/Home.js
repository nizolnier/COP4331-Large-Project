import { useContext } from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { useProtectedPage } from '../hooks/useProtectedPage'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header'
import ToggleSBContext from '../context/ToggleSBContext'

const Home = () => {
    const user = {
        username: "zain",
        name: "Zain",
        userid: "1"
    }
    const {toggle} = useContext(ToggleSBContext)

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    useProtectedPage()

    return (
        <div className="w-screen h-screen bg-[#1F1D36] text-white" >
        
        <div>
            {toggle || !isMobile ? <Sidebar username={user.username} name={user.name} userid={user.userid} /> : <></>}
        </div>
        <Header username={user.username} />
        <footer className="flex flex-end bg-[#1F1D36]">
            {isMobile? <NavBar userid={user.userid} screen="home" /> : <></>}
        </footer>
    </div>
    )
}

export default Home