import { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import CartoonScroller from '../components/CartoonScroller';
import ReviewList from '../components/ReviewList';
import { ScrollView } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { baseUrl } from '../constants/url';
import { useIsFocused } from '@react-navigation/native';
import { useProtectedPage } from '../hooks/useProtectedPage';

const Profile = ({navigation}) => {
    // TESTING PURPOSES ONLY
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const isFocused = useIsFocused()
    const [allCartoons, setAllCartoons] = useState([])
    const [recentReviews, setRecentReviews] = useState([])
    const [reviewDeets, setReviewDeets] = useState([])
    const [isLoadingReviews, setIsLoadingReviews] = useState(true)
    const imageAspectRatio = '2/3'
    const [sortType, setSortType] = useState('ascending')

    useProtectedPage(navigation);

    useEffect(() => {
        if (isFocused) {
            fetchUsername()
            getAllCartoons()  
            getReviews()
        }
    }, [isFocused])

    useEffect(() => {
        getReviews()
    }, [sortType])

    const getAllCartoons = async () => {
        const token = await AsyncStorage.getItem("TOKEN")
        if (token) {
            axios.get(`${baseUrl}/shows/all`, {headers: {
                Authorization: token
            }}).then(res => {
                setAllCartoons(res.data)
            })
            .catch(err => {
                console.error(err)
            })
        }
    }

    const fetchUsername = async () => {
        // get it from react native's async storage
        try {
            const username = await AsyncStorage.getItem('USERNAME');
            const token = await AsyncStorage.getItem('TOKEN')
            if (username && token) {
                fetchUser(username, token)
            }
            else {
                navigation.navigate("Login")
            }
        } catch(error) {
            console.log(error)
        }
    }

    const fetchUser = async (username, token) => {
        await axios.get(`${baseUrl}/users/oneuser/${username}`, {headers: {
            Authorization: token
        }}).then((response) => {
            setUser(response.data)
        }).catch(err => {
            console.log(err)
        })
    }



     const getReviewUser = async (review) => {
        const token = await AsyncStorage.getItem('TOKEN')
        return axios.get(`${baseUrl}/users/one/${review.userid}`, {headers: {
            Authorization: token
        }}).then((res) => {
            return res.data.username
        }).catch((err) => {
            if (err.response) {
                console.log(err.response)
            }
        })
    }

    const getReviewShow = async (review) => {
        const token = await AsyncStorage.getItem('TOKEN')
        return axios.get(`${baseUrl}/shows/one/${review.showid}`, {headers: {
            Authorization: token
        }}).then((res) => { 
            return res.data.showExists
        }).catch((err) => {
            if (err.response) {
                console.log(err.response)
            }
        })
    }

    const getReviews = async () => {
        setIsLoadingReviews(true)
        const token = await AsyncStorage.getItem('TOKEN')
        return axios.get(`${baseUrl}/reviews/all/`, {
            headers: {
                Authorization: token
            },
            params: {
                sort: sortType,
                limit: 10
            }
        }).then(res => {
            setRecentReviews(res.data.reviews)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="search-outline" onPress={() => navigation.navigate('Search')} size={20}/>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-[#1F1D36] p-4">
            <ScrollView scrollEnabled={true}>
                <Text className="text-white font-bold text-lg">Hello, <Text className="text-rose-300">{user.name}</Text>!</Text>
                <Text className="text-white">Catch up on your watchlist or see your favorites!</Text>
                <View className="flex-row items-center justify-center mt-8">
                    <View className="flex-col items-center justify-center mx-8">
                        <Text className="TotalCartoons flex items-center justify-center text-center text-white text-xs font-normal">Watchlist Total</Text>
                        <Text className=" justify-center text-center text-fuchsia-800 text-2xl font-bold">{user?.watchlist?.length}</Text>
                    </View>
                    <View className=" flex-col items-center justify-center mx-8">
                        <Text className="Reviews flex items-center justify-center text-center text-white text-xs font-normal">Reviews</Text>
                        <Text className=" justify-center text-center text-fuchsia-800 text-2xl font-bold">{user?.twatched}</Text>
                    </View>
                </View>
                
                {user.watchlist && user.watchlist.length > 0 ? <CartoonScroller cartoons={user.watchlist} title="My Watchlist"/> : <></>}
                {user.favcartoons && user.favcartoons.length > 0 ? <CartoonScroller cartoons={user.favcartoons} title="Your Favorite Cartoons"/> :<></> }
                {user.twatched && user.twatched.length > 0 ? <CartoonScroller cartoons={user.twatched} title="Want To Watch"/> : <></>}
                <CartoonScroller cartoons={allCartoons} title="Popular Cartoons"/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;