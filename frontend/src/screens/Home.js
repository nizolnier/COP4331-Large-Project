import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { useProtectedPage } from '../hooks/useProtectedPage'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header'
import ToggleSBContext from '../context/ToggleSBContext'
import Scroller from '../components/Scroller'

import sampleCartoons from '../tests/sample_cartoons.json'
import { baseUrl } from '../constants/url'
import axios from 'axios'

const Home = () => {
    const {toggle} = useContext(ToggleSBContext)
    const [allCartoons, setAllCartoons] = useState([])

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    useProtectedPage()

    const getAllCartoons = async () => {
        axios.get(`${baseUrl}/shows/all`, {headers: {
            Authorization: localStorage.getItem("token")
        }}).then(res => {
            console.log(res)
            setAllCartoons(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getAllCartoons()        
    }, [])

    useEffect(() => {
        console.log(allCartoons)
    }, [allCartoons])

    const user = {
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name")
    }

    return (
        <div className="w-screen bg-[#1F1D36] min-h-screen text-white" >
            <div>
                {toggle || !isMobile ? <Sidebar username={user.username} name={user.name} /> : <></>}
            </div>
            <Header username={user.username} />
            <div>
                <Scroller cartoons={allCartoons} heading="Popular"></Scroller>
            </div>
            <footer className="flex flex-end bg-[#1F1D36]">
                {isMobile? <NavBar userid={user.userid} screen="home" /> : <></>}
            </footer>
        </div>
    )
}

export default Home