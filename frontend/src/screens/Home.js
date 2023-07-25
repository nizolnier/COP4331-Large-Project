import { useContext } from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { useProtectedPage } from '../hooks/useProtectedPage'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header'
import ToggleSBContext from '../context/ToggleSBContext'
import Scroller from '../components/Scroller'

import sampleCartoons from '../tests/sample_shows.json'

const Home = () => {
    const {toggle} = useContext(ToggleSBContext)

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    useProtectedPage()

    const user = {
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name")
    }

    return (
        <div className="w-screen bg-[#1F1D36] text-white" >
            <div>
                {toggle || !isMobile ? <Sidebar username={user.username} name={user.name} /> : <></>}
            </div>
            <Header username={user.username} />
            <div>
                <Scroller cartoons={sampleCartoons} heading="Popular"></Scroller>
                <Scroller cartoons={sampleCartoons} heading="Watchlist"></Scroller>
                <Scroller cartoons={sampleCartoons} heading="Have Watched"></Scroller>
            </div>
            <footer className="flex flex-end bg-[#1F1D36]">
                {isMobile? <NavBar userid={user.userid} screen="home" /> : <></>}
            </footer>
        </div>
    )
}

export default Home