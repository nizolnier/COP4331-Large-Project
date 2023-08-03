import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native';
import { baseUrl } from '../constants/url.js'
import { useProtectedPage } from '../hooks/useProtectedPage'
import { View, Text, Button, SafeAreaView, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Rating from '../components/Rating.js';
import Svg, { Path } from 'react-native-svg';



const Reviews = ({ navigation, route, ...props }) => {
    useProtectedPage(navigation)
    const cartoonId = route.params.cartoon
    const [cartoon, setCartoon] = useState({})
    const [user, setUser] = useState({})
    const [onWatchlist, setOnWatchlist] = useState(false)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [fav, setFav] = useState(0)


    const isFocused = useIsFocused()
    



    useEffect(() => {
        if (isFocused) {
            fetchUsername()
            loadCartoon()
        }

    }, [isFocused])

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
        } catch (error) {
            console.log(error)
            console.log("Username")
        }
    }

    const fetchUser = async (username, token) => {
        await axios.get(`${baseUrl}/users/oneuser/${username}`, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setUser(response.data)
        }).catch(err => {
            console.log(err)
            console.log("User")
        })
    }


    const loadCartoon = async () => {
        const token = await AsyncStorage.getItem('TOKEN')
        await axios.get(`${baseUrl}/users/watchlist/${cartoonId}`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            if (res.data.found) {
                setOnWatchlist(true)
            }
        }).catch((err) => {
            console.log(err)
            console.log("load cartoon")
        })


        await axios.get(`${baseUrl}/shows/one/${cartoonId}`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setCartoon(res.data.showExists)
        }).catch((err) => {
            console.log(err)
            console.log("show")
        })
    }



    const addWatchlist = async () => {
        const token = await AsyncStorage.getItem('TOKEN')
        console.log("Add")
        await axios.patch(`${baseUrl}/users/watchlist/${cartoonId}`
            , {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                setOnWatchlist(true)
            }).catch((err) => {
                console.log(err)
                console.log("add w")
            })

    }

    const removeWatchlist = async () => {
        const token = await AsyncStorage.getItem('TOKEN')
        console.log("Remove")
        await axios.delete(`${baseUrl}/users/watchlist/${cartoonId}`
            , {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                setOnWatchlist(false)
            }).catch((err) => {
                console.log(err)
                console.log("remove w")
            })
    }

    const onChange = (event) => {
        setComment(event.target.value)
    }

    const doReview = async () => {
        const token = await AsyncStorage.getItem('TOKEN')
        let body = {
            showid: cartoonId,
            dateWatched: makeDate(),
            favorite: fav,
            stars: rating,
            comment: comment
        }

        axios.delete(`${baseUrl}/users/watchlist/${cartoonId}`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {

        }).catch((err) => {
            console.log(err)
        })

        axios.post(`${baseUrl}/reviews`, body, {
            headers: {
                Authorization: token
            }
        }).then((res) => {

        }).catch((err) => {
            console.log(err)
            console.log("review post")
        })

        body = {
            showid: cartoonId,
            stars: rating,
            favorite: fav
        }
        axios.patch(`${baseUrl}/shows/update`, body, {
            headers: {
                Authorization: token
            }
        }).then((res) => {

        }).catch((err) => {
            console.log(err)
            console.log("show update")
        })

        if (fav) {
            axios.patch(`${baseUrl}/users/favcartoons/${cartoonId}`, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {

            }).catch((err) => {
                console.log(err)
                console.log("if fav")
            })

        }

        if (!fav) {
            axios.delete(`${baseUrl}/users/favcartoons/${cartoonId}`, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {

            }).catch((err) => {
                console.log(err)
                console.log("fav")
            })
        }

        body = {
            twatched: 1
        }

        axios.patch(`${baseUrl}/users/update`, body, {
            headers: {
                Authorization: token
            }
        }).then((res) => {

        }).catch((err) => {
            console.log(err)
            console.log("body")
        })

        goHome()
    }

    const goHome = () => {
        navigation.navigate("Home")
    }

    const makeDate = () => {
        const today = new Date(Date.now());
        

        return today.toUTCString()
    }


    return <View className="bg-[#1F1D36]">
        <View className="flex w-[15%] bg-[#1F1D36] mx-4 my-2" >
            <TouchableOpacity onPress={goHome}>
                <Ionicons name="arrow-back-outline" color="pink" size={36}></Ionicons>
            </TouchableOpacity>
        </View>
        <ScrollView>
            <Text className="text-white w-screen text-2xl font-bold ml-4 mb-8">{cartoon?.title}</Text>
            <View className="flex flex-col bg-[#1F1D36] ">
                <View className="flex flex-col text-white w-screen h-screen justify-start items-center" >
                    <View className="flex flex-row justify-start">
                        <View className="w-[25%] flex flex-col justify-start mx-4">
                            <Image src={cartoon?.picture} style={{ height: 150, width: 100 }} className={`rounded-xl w-full shrink`} />
                            <View className="flex flex-row my-2 items-center justify-between">
                                <View className="flex flex-row justify-between items-left">
                                    <Ionicons name="star" color="gold" size={20}></Ionicons>
                                    <Text className="text-white items-center justify-center text-center text-opacity-50 text-sm font-normal mx-2">{cartoon?.nrating}</Text>
                                </View>
                                <View className="flex flex-row justify-center items-center">
                                    <Ionicons name="heart" color="red" size={20}></Ionicons>
                                    <Text className="text-white text-center text-opacity-50 text-sm font-normal mx-2">{cartoon?.nfavorites}</Text>
                                </View>

                            </View>
                        </View>
                        <View className="flex flex-col justify-center items-center mx-4">

                            <View className="flex flex-col w-1/2 justify-between items-center mb-8">
                                <Text className="text-white lg:text-[4em] text-3xl font-normal">{cartoon?.avgrating}</Text>
                                <Rating rating={cartoon.avgrating}></Rating>
                            </View>

                            <TouchableOpacity onPress={onWatchlist ? removeWatchlist : addWatchlist}>
                                <View className="flex flex-row items-center h-[40px] w-[150px] justify-center rounded-[7px] bg-pink-200">
                                    <Ionicons name="star" color="black" size={18}></Ionicons>
                                    <Text className="text-black ml-2 font-semibold">{onWatchlist ? "Remove Watchlist" : "Add to Watchlist"}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex flex-col mx-4 w-[90%]">
                        <View className="lg:text-base text-[0.6em] font-normal flex justify-between">
                            <Text className="text-white mb-2">Directed by <Text className="text-white font-bold">{cartoon?.director}</Text></Text>
                            <Text className="text-white mb-2">{cartoon?.year}</Text>
                        </View>
                        <Text className="text-justify text-white text-xs font-normal">{cartoon?.description}</Text>
                        <View className="flex flex-row justify-center mt-8 mb-8 items-center">

                        </View>
                        <TouchableOpacity >
                            <View className="items-center mb-4">
                                <View className="flex flex-row">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return <Svg key={index} onPress={() => setRating(index)}
                                            className={`w-6 h-6 ${index <= rating ? "text-yellow-300" : "text-[#3D3B53]"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <Path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </Svg>
                                    })}
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View className="text-white items-center">
                            <TextInput onChange={onChange} multiline={true} value={comment} placeholder="Write down your review..." className="placeholder:text-white text-white block p-2.5 lg:w-1/2 w-[90%] h-[40%] text-sm rounded-lg bg-[#75719f] border-opacity-30 border border-stone-600 focus:ring-pink-200 focus:border-pink-200"></TextInput>
                            <View className="flex flex-row">
                                <TouchableOpacity onPress={() => setFav(!fav)} className="flex flex-row mx-4 mt-4">
                                    <View className="flex flex-row items-center h-[40px] w-[40px] justify-center rounded-[7px] bg-pink-200">
                                        <Ionicons name={`${fav ? "heart" : "heart-outline"}`} color="black" size={18}></Ionicons>
                                    </View>
                                </TouchableOpacity>
                                <TouchableHighlight onPress={doReview} className="mt-4 items-center">
                                    <View className="flex flex-row bg-pink-200 h-[40px] w-[100px] items-center justify-center rounded-[7px]">
                                        <Ionicons name="newspaper" color="black" size={18}></Ionicons>
                                        <Text className="text-black ml-2 font-semibold">Publish</Text>
                                    </View>
                                </TouchableHighlight>

                            </View>
                        </View>
                        <View>

                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    </View >
}

export default Reviews;