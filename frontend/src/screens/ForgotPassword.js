import { useForm } from '../hooks/useForm'
import { baseUrl } from '../constants/url.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import bgw from '../assets/bg-test.png'
import bgm from '../assets/bg-mobile.png'
import { goToLogin, goToVerify } from '../router/coordinator'


const ForgotPassword = () => {
    const navigate = useNavigate()
    const { form, onChange, reset } = useForm({ email: "" })
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })


    const doForgot = (e) => {
        e.preventDefault()
        console.log('email===>' + form.email)

        // axios

        reset()
        goToVerify(navigate)
    }

    return (<div className="text-white flex flex-col w-screen h-screen bg-[#1F1D36] bg-cover" style={{ backgroundImage: `url(${isMobile? bgm : bgw})` }} >
    <div className="w-screen h-[35%]">
    </div>
        <div className="flex flex-col justify-around items-center h-[65%]">
            <div className="h-[20%]">
                <h1 className="text-center text-white text-4xl font-bold pb-2">Forgot Password?</h1>
                <p className="text-center text-white text-md font-normal">Don't worry! It happens.<br></br>
Please enter the email associated with your account.</p>
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
                <button type="submit" className="w-[95px] h-[35px] bg-red-300 rounded-[30px] text-center text-gray-800 text-[13px] font-bold tracking-wide">Verify</button>
                <p className=" cursor-default text-red-300 text-[9px] font-normal">Remember password? <b onClick={() => goToLogin(navigate)} className="cursor-pointer text-fuchsia-800 text-[9px] font-bold">Login</b>.</p>
            </form>
            <div className="h-[20%]"></div>

        </div>
    </div>
    )
}

export default ForgotPassword