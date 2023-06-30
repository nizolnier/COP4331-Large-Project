import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LogIn from '../screens/Login'
import SignUp from '../screens/SignUp'


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login">
                    <LogIn />
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router