import { useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { useProtectedPage } from '../hooks/useProtectedPage'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header'
import ToggleSBContext from '../context/ToggleSBContext'

const Home = () => {
    const {toggle, setToggle} = useContext(ToggleSBContext)

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    useEffect(() => {
        if(!isMobile) {
            setToggle(true)
        }
    }, [])

    useProtectedPage()

    return (
        <div className="w-screen h-screen bg-[#1F1D36] text-white" >
        
        <div>
            {toggle? <Sidebar username="zain" name="Zain" /> : <></>}
        </div>
        <Header username="zain" />
        <footer className="flex flex-end bg-[#1F1D36]">
            {isMobile? <NavBar /> : <></>}
        </footer>
    </div>
    )
}

export default Home