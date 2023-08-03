import { useForm } from '../hooks/useForm'
import bgw from '../assets/bg-test.png'
import bgm from '../assets/bg-mobile.png'
import { goToLogin, goToVerify } from '../router/coordinator'
import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive';
import Button from '../components/Button'
import { useState } from 'react'
import PasswordIcon from '../components/PasswordIcon'
import logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {
    const navigate = useNavigate()
    const { form, onChange, reset } = useForm({ email: "", password: "", name: "", username: "" })
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const validateInput = () => {
        let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (form.password.length > 0 && !pattern.test(form.password)) {
            toast.warning("Passwords must have 8 characters, at least 1 capital letter and 1 number", {
                position: toast.POSITION.TOP_RIGHT
            })
            return false
        }
        pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (form.email.length > 0 && !pattern.test(form.email)) {
            toast.warning("Invalid email address", {
                position: toast.POSITION.TOP_RIGHT
            })
            return false
        }
        pattern = /^[A-Za-z]+$/
        if (form.name.length > 0 && !pattern.test(form.name)) {
            toast.warning("Invalid name", {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        pattern = /^[A-Za-z0-9_.]+$/
        if (form.username.length > 0 && !pattern.test(form.username)) {
            toast.warning("Username must use only letters, numbers, underscores, or periods", {
                position: toast.POSITION.TOP_RIGHT
            })
            return false
        }

        return true
    }

    const doSignUp = (e) => {
        e.preventDefault()

        if (!validateInput()) {
            return
        }
        try {

            axios.post(`${baseUrl}/users/signup`, form)

            axios.post(`${baseUrl}/users/send-email`, { email: form.email })


            toast.success('Success! Check your email', {
                position: toast.POSITION.TOP_RIGHT
            })

            localStorage.setItem("email", form.email)

            reset()

            setTimeout(() => { goToVerify(navigate) }, 3000)


        } catch (err) {
            console.log(err)
        }


    }

    return (<div className="text-white flex flex-col w-screen h-screen bg-[#1F1D36] bg-cover" style={{ backgroundImage: `url(${isMobile ? bgm : bgw})` }} >
        <div className="w-screen h-[30%]">
            <ToastContainer />
        </div>
        <div className="flex flex-col justify-between items-center w-screen h-[75%]">
            <div className="h-[30%] flex justify-around items-center flex-col mb-2">
                <img src={logo} className="w-[50%] mb-2" />
                <h1 className="text-center text-white text-4xl font-bold pb-2">Sign Up</h1>
                <p className="text-center text-white text-md font-normal">Create an account to continue</p>
            </div>
            <form onSubmit={doSignUp} className="flex flex-col justify-around items-center w-4/5 lg:w-1/4 h-[75%]">
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <input required placeholder="Enter your name" value={form.name} onChange={onChange} name="name" className="bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />
                </div>
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <input required placeholder="Create a username" value={form.username} onChange={onChange} name="username" className="bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />
                </div>
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input required placeholder="Enter your email" type="email" onChange={onChange} value={form.email} name="email" className="bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />
                </div>
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                        </svg>
                    </div>

                    <input onBlur={validateInput} required placeholder="Enter a password" type={isPasswordVisible ? "text" : "password"} value={form.password} onChange={onChange} name="password" className="z-0 bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />

                    <span onClick={togglePasswordVisibility} className="cursor-pointer absolute z-10 inset-y-0 right-0 flex items-center pr-3.5 pl-3.5">
                        <PasswordIcon isPasswordVisible={isPasswordVisible} />
                    </span>
                </div>
                <Button title="Sign up" type="submit" />
                <p className=" cursor-default text-red-300 text-[9px] font-normal">Already have an account? Go to the <b onClick={() => goToLogin(navigate)} className="cursor-pointer text-fuchsia-800 text-[9px] font-bold">Login Page</b>.</p>
            </form>

        </div>
    </div>
    )
}

export default SignUp