import {goToLogin} from '../router/coordinator'
import { useHistory } from 'react-router-dom'


const Landing = () => {
    const history = useHistory()

    return <div>
        <button onClick={() => goToLogin(history)}>login</button>
        <button onClick={() => goToSignUp(history)}>signup</button>
    </div>
}

export default Landing