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

/* Components */
import LogoTitle from './components/LogoTitle'

/* Drawer Customization */
const Drawer = createDrawerNavigator();

/* Icons aren't supported in Drawer Screens :( */
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
      <DrawerItem
        label="Zain"
        icon={() => <Ionicons name="person-circle" size={72}/>}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Home"
        icon={() => <Ionicons name="home-outline" />}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Search"
        icon={() => <Ionicons name="search-outline" />}
        onPress={() => props.navigation.navigate("Search")}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("Profile")}
        icon={() => <Ionicons name="person-outline" />}
      />
      <DrawerItem
        label="Watchlist"
        icon={() => <Feather name="clock" />}
        onPress={() => props.navigation.navigate("Watchlist")}
      />
      <DrawerItem
        label="Reviews"
        icon={() => <Feather name="align-left" />}
        onPress={() => props.navigation.navigate("Reviews")}
      />
    </DrawerContentScrollView>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Landing' drawerContent={(props) => <CustomDrawerContent {...props}/>}>
        <Drawer.Screen
            name="Landing"
            component={Landing}
            options={{
              headerShown: false,
              swipeEnabled: false,
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Search"
            component={Search}
            options={{
              title: "Search",
              headerTitle: '',
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Watchlist"
            component={Watchlist}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Reviews"
            component={Reviews}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Signup"
            component={Signup}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Cartoon"
            component={Cartoon}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Verify"
            component={VerificationCode}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="Error"
            component={Error}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;