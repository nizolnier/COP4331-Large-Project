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

const sampleReviews = [
    {
        "_id": "1",
        "cartoon_id": "1",
        "user_id": "1",
        "comment": "Spongebob slayyyyyy",
        "rating": "4",
        "fav": "true"
    }, 
    {
        "_id": "2",
        "cartoon_id": "1",
        "user_id": "1",
        "comment": "huge slay",
        "rating": "4",
        "fav": "true"
    }, 
    {
        "_id": "3",
        "cartoon_id": "1",
        "user_id": "1",
        "comment": "huge slay",
        "rating": "4",
        "fav": "true"
    }
]

const Home = ({navigation}) => {
    // TESTING PURPOSES ONLY
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const isFocused = useIsFocused()
    const [allCartoons, setAllCartoons] = useState([])
    const [comedyCartoons, setComedyCartoons] = useState([])
    const [dramaCartoons, setDramaCartoons] = useState([])
    const [familyCartoons, setFamilyCartoons] = useState([])
    const [recentReviews, setRecentReviews] = useState([])
    const [reviewDeets, setReviewDeets] = useState([])
    const imageAspectRatio = '2/3'
    const [sortType, setSortType] = useState('ascending')

    useProtectedPage(navigation);

    useEffect(() => {
        if (isFocused) {
            fetchUsername()
            getAllCartoons() 
            getGenre('Comedy', setComedyCartoons)  
            getGenre('Drama', setDramaCartoons)
            getGenre('Family', setFamilyCartoons)   
            getReviews()
        }
    }, [isFocused])

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

    const getGenre = async (genre, setter) => {
        const token = await AsyncStorage.getItem("TOKEN")
        if (token) {
            axios.get(`${baseUrl}/shows/search`, {
                headers: {
                    Authorization: token
                },
                params: {
                    input: genre,
                    page: 1,
                    limit: 70
                }
            }).then(res => {
                setter(res.data.cartoons)
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
            if (username !== null) {
                fetchUser(username, token)
            }
            else {
                // set a guest user
                setUser({
                    username: "Guest",
                    watchlist: DATA,
                    favcartoons: DATA,
                    twatched: DATA
                })
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
        if (recentReviews.length > 0) {
            getReviewDetails()
        }
    }, [recentReviews])

    const getReviewDetails = async () => {
        let reviews = recentReviews
        for await (const r of reviews) {
            r.username = await getReviewUser(r)
            r.show = await getReviewShow(r)
        }
        setReviewDeets(reviews)
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
                <Text className="text-white">Browse by genre and see what the community has reviewed!</Text>
                <CartoonScroller cartoons={allCartoons} title="Popular Cartoons"/>
                <CartoonScroller cartoons={comedyCartoons} title="Browse by Genre: Comedy"/>
                <CartoonScroller cartoons={dramaCartoons} title="Browse by Genre: Drama"/>
                <CartoonScroller cartoons={familyCartoons} title="Browse by Genre: Family"/>
                <ReviewList reviews={reviewDeets} title="Recent Reviews"/> 
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;