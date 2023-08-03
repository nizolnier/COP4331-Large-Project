import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator
} from '@react-navigation/drawer';

import { Button, Icon } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

/* Screens */
import Landing from './screens/Landing.js'
import Home from './screens/Home'
import Signup from './screens/Signup'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Search from './screens/Search'
import Watchlist from './screens/Watchlist'
import Reviews from './screens/Reviews'
import VerificationCode from './screens/VerificationCode.js';
import Cartoon from './screens/Cartoon.js';
import Error from './screens/Error.js';
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword.js';
import Logout from './screens/Logout.js';

/* Components */
import LogoTitle from './components/LogoTitle'

/* Drawer Customization */
const Drawer = createDrawerNavigator();
const bgColor = '#1F1D36'

/* Icons aren't supported in Drawer Screens :( */
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
      <DrawerItem
        label="Navigation"
        labelStyle={{color: 'white'}}
        icon={() => <Ionicons color="white" name="person-circle" size={72}/>}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Home"
        labelStyle={{color: 'white'}}
        icon={() => <Ionicons color="white"   name="home-outline" />}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Search"
        labelStyle={{color: 'white'}}
        icon={() => <Ionicons color="white"   name="search-outline" />}
        onPress={() => props.navigation.navigate("Search")}
      />
      <DrawerItem
        label="Profile"
        labelStyle={{color: 'white'}}
        onPress={() => props.navigation.navigate("Profile")}
        icon={() => <Ionicons color="white"   name="person-outline" />}
      />
      <DrawerItem
        label="Log Out"
        labelStyle={{color: 'white'}}
        icon={() => <Ionicons color="white"   name="exit-outline" />}
        onPress={() => props.navigation.navigate("Logout")}
      />
    </DrawerContentScrollView>
  );
}

const App = () => {

  const navigationOptions = (title, headerShown) => {
    return {
      title: title,
      headerShown: headerShown,
      swipeEnabled: headerShown,
      headerStyle: {
        backgroundColor: bgColor
      },
      headerTintColor: 'white',
      drawerItemStyle: { display: 'none' }
    }
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName='Landing' 
      drawerContent={(props) => <CustomDrawerContent {...props}/>}
      screenOptions={{
        drawerStyle: {
          backgroundColor: bgColor
        },
      }}>
        <Drawer.Screen
            name="Landing"
            component={Landing}
            options={navigationOptions("Landing", false)}
        />
        <Drawer.Screen
            name="Home"
            component={Home}
            options={navigationOptions("Home", true)}
        />
        <Drawer.Screen
            name="Search"
            component={Search}
            options={navigationOptions("Search", true)}
        />
        <Drawer.Screen
            name="Profile"
            component={Profile}
            options={navigationOptions("Profile", true)}
        />
        <Drawer.Screen
            name="Watchlist"
            component={Watchlist}
            options={navigationOptions("Watchlist", true)}
        />
        <Drawer.Screen
            name="Reviews"
            component={Reviews}
            options={navigationOptions("Reviews", true)}
        />
        <Drawer.Screen
            name="Signup"
            component={Signup}
            options={navigationOptions("Signup", true)}
        />
        <Drawer.Screen
            name="Login"
            component={Login}
            options={navigationOptions("Login", true)}
        />
        <Drawer.Screen
            name="Cartoon"
            component={Cartoon}
            options={navigationOptions("Cartoon", true)}
        />
        <Drawer.Screen
            name="Verify"
            component={VerificationCode}
            options={navigationOptions("Verify", true)}
        />
        <Drawer.Screen
            name="Error"
            component={Error}
            options={navigationOptions("Error", true)}
        />
        <Drawer.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={navigationOptions("Forgot Password", true)}
        />
        <Drawer.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={navigationOptions("Reset Password", true)}
        />
        <Drawer.Screen
            name="Logout"
            component={Logout}
            options={navigationOptions("Log Out", true)}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;