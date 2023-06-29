import {goToLogin, goToSignUp} from '../router/coordinator'
import { useNavigate } from 'react-router-dom'


const Landing = () => {
    const navigate = useNavigate()

    return <div>
        <button onClick={() => goToLogin(navigate)}>login</button>
        <button onClick={() => goToSignUp(navigate)}>signup</button>
    </div>
}

export default Landing