import { useForm } from '../hooks/useForm'
import bgw from '../assets/bg-test.png'
import bgm from '../assets/bg-mobile.png'
import logo from '../assets/logo.svg'
import { goToSignUp, goToHome, goToForgot } from '../router/coordinator'
import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import Button from '../components/Button'
import PasswordIcon from '../components/PasswordIcon'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const LogIn = () => {
    const navigate = useNavigate()
    const { form, onChange, reset } = useForm({ username: "", password: "" })
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }


    const doLogIn = (e) => {
        e.preventDefault()

        axios.post(`${baseUrl}/users/login`, form).then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("username", res.data.username)
            localStorage.setItem("name", res.data.name)

            goToHome(navigate)

        }).catch((err) => {
            toast.warning("No user found", {
                position: toast.POSITION.TOP_RIGHT
            })
        })

        reset()


    }

    return (<div className="text-white flex flex-col w-screen h-screen bg-[#1F1D36] bg-cover" style={{ backgroundImage: `url(${isMobile ? bgm : bgw})` }} >
        <div className="w-screen h-[35%]">
            <ToastContainer />
        </div>
        <div className="flex flex-col justify-around items-center h-[65%]">
            <div className="h-[30%] flex justify-around items-center flex-col mb-4">
                <img src={logo} className="w-[50%] mb-4" />
                <h1 className="text-center text-white text-4xl font-bold pb-2">Log In</h1>
                <p className="text-center text-white text-md font-normal">Please sign in to continue</p>
            </div>
            <form onSubmit={doLogIn} className="flex flex-col justify-evenly items-center w-4/5 lg:w-1/4 h-[70%]">
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <input required placeholder="Enter username" value={form.username} onChange={onChange} name="username" className="bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />
                </div>
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                        </svg>
                    </div>
                    <input required placeholder="Enter a password" type={isPasswordVisible ? "text" : "password"} value={form.password} onChange={onChange} name="password" className="z-0 bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />

                    <span onClick={togglePasswordVisibility} className="cursor-pointer absolute z-10 inset-y-0 right-0 flex items-center pr-3.5 pl-3.5">
                        <PasswordIcon isPasswordVisible={isPasswordVisible} />
                    </span>
                </div>
                <p onClick={() => goToForgot(navigate)} className="cursor-pointer self-end text-right pr-1 text-red-300 text-[0.6em] font-normal">Forgot password</p>
                <Button title="Log in" type="submit" />
                <p className=" cursor-default text-red-300 text-[9px] font-normal">Don't have an account? Please <b onClick={() => goToSignUp(navigate)} className="cursor-pointer text-fuchsia-800 text-[9px] font-bold">Sign Up</b> first.</p>
            </form>

        </div>
    </div>
    )
}

export default LogIn