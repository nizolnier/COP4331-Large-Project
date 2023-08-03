import { useForm } from '../hooks/useForm'
import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import bgw from '../assets/bg-test.png'
import bgm from '../assets/bg-mobile.png'
import { goToLogin, goToVerify, goToVerifyPassword } from '../router/coordinator'
import Button from '../components/Button'
import logo from '../assets/logo.svg'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const { form, onChange, reset } = useForm({ email: "" })
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    const validateInput = () => {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (form.email.length > 0 && !pattern.test(form.email)) {
            toast.warning("Invalid email address", {
                position: toast.POSITION.TOP_RIGHT
            })
            return false
        }

        return true
    }


    const doForgot = (e) => {
        e.preventDefault()

        if (!validateInput()) {
            return
        }

        let message = ""
        axios.get(`${baseUrl}/users/oneemail/${form.email}`).then((res) => {
        }).catch((err) => {
            message = "No user found"
        })

        if (message == "No user found") {
            reset()

            toast.warning("No user found", {
                position: toast.POSITION.TOP_RIGHT
            })

            setTimeout(() => { window.location.reload(false) }, 3000)
        }

        axios.post(`${baseUrl}/users/send-email`, { email: form.email }).then((res) => {
            localStorage.setItem("email", form.email)
            reset()
            toast.success('Success! Check your email', {
                position: toast.POSITION.TOP_RIGHT
            })

            setTimeout(() => { goToVerifyPassword(navigate) }, 3000)

        }).catch((err) => {
            console.log(err)
        })


    }

    return (<div className="text-white flex flex-col w-screen h-screen bg-[#1F1D36] bg-cover" style={{ backgroundImage: `url(${isMobile ? bgm : bgw})` }} >
        <div className="w-screen h-[35%]">
            <ToastContainer />
        </div>
        <div className="flex flex-col justify-around items-center h-[65%]">
            <div className="h-[30%] flex justify-around items-center flex-col mb-10">
                <img src={logo} className="w-[40%] mb-4" />
                <h1 className="text-center text-white text-4xl font-bold pb-2">Forgot Password?</h1>
                <p className="text-center text-white text-md font-normal">Don't worry! It happens.<br></br>Please enter the email associated with your account
                </p>
            </div>
            <form onSubmit={doForgot} className="flex flex-col justify-around items-center w-4/5 lg:w-1/4 h-[40%]">
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input required placeholder="Enter your email" type="email" onChange={onChange} value={form.email} name="email" className="bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />
                </div>
                <Button title="Send Code" type="submit" />
                <p className=" cursor-default text-red-300 text-[9px] font-normal">Remember password? <b onClick={() => goToLogin(navigate)} className="cursor-pointer text-fuchsia-800 text-[9px] font-bold">Login</b>.</p>
            </form>
            <div className="h-[20%]"></div>

        </div>
    </div>
    )
}

export default ForgotPassword