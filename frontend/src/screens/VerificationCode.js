import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import bgw from '../assets/bg-test.png'
import bgm from '../assets/bg-mobile.png'
import { goToLogin, goToReset } from '../router/coordinator'
import VerificationInput from 'react-verification-input'
import './index.css'
import { useState } from 'react'
import Button from '../components/Button.js'


const VerificationCode = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState()
    const email = localStorage.getItem('email')

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })


    const doVerify = (e) => {
        e.preventDefault()
        const body = {
            code,
            email
        }

        axios.post(`${baseUrl}/users/verify`, body).then((res) => {
            if(window.location.pathname === "/verification-code-password") {
                goToReset(navigate)
            } else {
                localStorage.removeItem("email")
                goToLogin(navigate)
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    const sendCode = () => {
        axios.post(`${baseUrl}/users/send-email`, { email: form.email }).then((res) => {
        }).catch((err) => {
            console.log(err)
        })
    }

    return (<div className="text-white flex flex-col w-screen h-screen bg-[#1F1D36] bg-cover" style={{ backgroundImage: `url(${isMobile ? bgm : bgw})` }} >
        <div className="w-screen h-[35%]">
        </div>
        <div className="flex flex-col justify-around items-center h-[65%]">
            <div className="h-[20%]">
                <h1 className="text-center text-white text-4xl font-bold pb-2">Please check your email</h1>
                <p className="text-center text-white text-md font-normal">We've sent you a verification code.</p>
            </div>
            <form onSubmit={doVerify} className="flex flex-col justify-around items-center w-4/5 lg:w-1/4 h-[40%]">
                <VerificationInput value={code} onChange={setCode} classNames={{ character: "character" }} length={5} validChars="0-9" inputProps={{ inputMode: "numeric" }} />
                <Button title="Verify" type="submit" />
                <p className=" cursor-default text-red-300 text-[9px] font-normal"><b onClick={sendCode} className="cursor-pointer text-fuchsia-800 text-[9px] font-bold">Send code again</b> 20 seconds.</p>
            </form>
            <div className="h-[20%]"></div>

        </div>
    </div>
    )
}

export default VerificationCode