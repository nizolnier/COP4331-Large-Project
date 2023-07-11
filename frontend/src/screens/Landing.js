import {goToSignUp} from '../router/coordinator'
import { useNavigate } from 'react-router-dom'
import lm from '../assets/landing-mobile.png'
import lw from '../assets/landing.png'
import { useMediaQuery } from 'react-responsive';
import Button from '../components/Button';

const Landing = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    return (
        <div className="flex flex-col w-screen h-screen bg-[#1F1D36]">
            <div className="w-screen h-1/2 lg:h-2/3 bg-cover bg-[#1F1D36]"
                style={{ backgroundImage: `linear-gradient(180deg, transparent 0%, #1F1D36 97%), url(${isMobile? lm : lw})` }}>
            </div>
            <div className="flex flex-col justify-center items-center w-screen h-1/2 bg-[#1F1D36]">
                <h1 className="w-2/3 pb-8 text-center text-white text-lg lg:text-3xl font-bold tracking-wide">“Track cartoons you've watched. Save those you want to see. Tell your friends what's fire.”</h1>
                <Button onc={() => goToSignUp(navigate)} type="button" title="Get started"/>
            </div>
        </div>
    )
}

export default Landing