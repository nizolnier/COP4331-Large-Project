import { useForm } from '../hooks/useForm'
import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import bgw from '../assets/bg-test.png'
import bgm from '../assets/bg-mobile.png'
import { goToLogin } from "../router/coordinator"
import Button from '../components/Button'
import PasswordIcon from '../components/PasswordIcon'
import { useState } from 'react'

const ResetPassword = () => {
    const navigate = useNavigate()
    const { form, onChange, reset } = useForm({ password1: "", password2: "" })
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    const [isPassword1Visible, setIsPassword1Visible] = useState(false)
    const [isPassword2Visible, setIsPassword2Visible] = useState(false)
    const email = localStorage.getItem('email')

    const togglePassword1Visibility = () => {
        setIsPassword1Visible(!isPassword1Visible)
    }

    const togglePassword2Visibility = () => {
        setIsPassword2Visible(!isPassword2Visible)
    }


    const doReset = (e) => {
        e.preventDefault()

        if (form.password1 == form.password2) {

            const body = {
                email,
                password: form.password1
            }

            axios.post(`${baseUrl}/users/password`, body).then((res) => {
                localStorage.removeItem("email")
                goToLogin(navigate)
    
            }).catch((err) => {
                console.log(err)
            })

            reset()
            

        } else {
            console.log("password doesnt match")
        }


    }

    return (<div className="text-white flex flex-col w-screen h-screen bg-[#1F1D36] bg-cover" style={{ backgroundImage: `url(${isMobile ? bgm : bgw})` }} >
        <div className="w-screen h-[35%]">
        </div>
        <div className="flex flex-col justify-around items-center h-[65%]">
            <div className="h-[20%]">
                <h1 className="text-center text-white text-4xl font-bold pb-2">Reset Password</h1>
                <p className="text-center text-white text-md font-normal">Please enter something you'll remember.</p>
            </div>
            <form onSubmit={doReset} className="flex flex-col justify-around items-center w-4/5 lg:w-1/4 h-[40%]">
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                        </svg>
                    </div>

                    <input required placeholder="Enter a new password" type={isPassword1Visible ? "text" : "password"} value={form.password1} onChange={onChange} name="password1" className="z-0 bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />

                    <span onClick={togglePassword1Visibility} className="cursor-pointer absolute z-10 inset-y-0 right-0 flex items-center pr-3.5 pl-3.5">
                        <PasswordIcon isPasswordVisible={isPassword1Visible} />
                    </span>
                </div>
                <div className="relative w-[100%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                        </svg>
                    </div>

                    <input required placeholder="Confirm new password" type={isPassword2Visible ? "text" : "password"} value={form.password2} onChange={onChange} name="password2" className="z-0 bg-stone-300 bg-opacity-30 border border-stone-300 border-opacity-30 text-white text-opacity-50 text-sm rounded-[30px] focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" />

                    <span onClick={togglePassword2Visibility} className="cursor-pointer absolute z-10 inset-y-0 right-0 flex items-center pr-3.5 pl-3.5">
                        <PasswordIcon isPasswordVisible={isPassword2Visible} />
                    </span>
                </div>
                <Button title="Reset" type="submit" />
                <p className=" cursor-default text-red-300 text-[9px] font-normal">Already have an account? <b onClick={() => goToLogin(navigate)} className="cursor-pointer text-fuchsia-800 text-[9px] font-bold">Login</b>.</p>
            </form>
            <div className="h-[20%]"></div>

        </div>
    </div>
    )
}

export default ResetPassword