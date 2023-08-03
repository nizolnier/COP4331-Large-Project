import PersonCard from "../components/PersonCard"
import nicole from '../assets/nicole.jpeg'
import cay from '../assets/cay.jpeg'
import mike from '../assets/mike.jpeg'
import viggie from '../assets/viggie.jpeg'
import fei from '../assets/fei.jpeg'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { goToLanding } from '../router/coordinator'
import { useMediaQuery } from 'react-responsive'

const AboutUs = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    return <div className="bg-[#1F1D36] w-screen min-h-screen flex flex-col justify-around">
        <div>
            <img onClick={() => goToLanding(navigate)} className="cursor-pointer lg:w-[10%] w-[35%] m-auto my-10" src={logo} />
            <h1 className="text-center text-white text-2xl font-bold">The great minds behind <a className="text-white underline" target="_blank" href="https://github.com/nizolnier/COP4331-Large-Project">Between Shows</a></h1>
        </div>
        <div className={`${isMobile ? "flex-col flex m-auto h-[100%] mb-4" : "flex items-start justify-center h-[80%] mb-[9em]"}`}>
            <PersonCard pic={nicole} name="Nicole Zolnier" favcartoon="Adventure Time" linkedin="https://www.linkedin.com/in/nicole-zolnier/" github="https://github.com/nizolnier/" />
            <PersonCard pic={cay} name="Cay Henning" favcartoon="Infinity Train" linkedin="https://www.linkedin.com/in/cay-h/" github="https://github.com/cayb0rg" />
            <PersonCard pic={mike} name="Mike Burke" favcartoon="Over the Garden Wall" linkedin="https://www.linkedin.com/in/mike-burke-a2925b143/" github="https://github.com/GrizzlyBurke" />
            <PersonCard pic={viggie} name="Viggie Kontonotas" favcartoon="Foster's Home for Imaginary Friends" linkedin="https://www.linkedin.com/in/evangelos-kontonotas-420ba723b/" github="https://github.com/Viggie1" />
            <PersonCard pic={fei} name="Feifan Cao" favcartoon="How to Train Your Dragon" linkedin="https://www.linkedin.com/in/feifan-cao/" github="https://github.com/FeifanC" />
            <PersonCard pic="https://avatars.dicebear.com/api/avataaars/Juan.png" name="Juan Rodriguez" favcartoon="Avatar The Last Airbender" linkedin="www.linkedin.com" github="https://github.com/juanrodriguez-code" />
        </div>
    </div>
}

export default AboutUs