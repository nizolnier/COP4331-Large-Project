import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LogIn from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'
import Cartoon from '../screens/Cartoon'
import Home from '../screens/Home'
import Search from '../screens/Search'
import Profile from '../screens/Profile'
import Landing from '../screens/Landing'

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
                <Route exact path={["/cartoons", "/home"]}>
                    <Home />
                </Route>
                <Route exact path="/cartoons/:id">
                    <Cartoon />
                </Route>
                <Route exact path="/user/:id">
                    <Profile />
                </Route>
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route exact path="/cartoons/search">
                    <Search />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router