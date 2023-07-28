import { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CartoonScroller from '../components/CartoonScroller';

const DATA = [
    {
        "_id": "64a7437b62d4733a9c26c60e",
        "title": "Spongebob Squarepants",
        "picture": "https://nick.mtvnimages.com/uri/mgid:arc:content:nick.com:9cd2df6e-63c7-43da-8bde-8d77af9169c7?quality=0.7",
        "director": "Stephen Hillenburg",
        "genre": [
            "Comedy",
            "Family"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A square yellow sponge named SpongeBob SquarePants lives in a pineapple with his pet snail, Gary, in the city of Bikini Bottom on the floor of the Pacific Ocean."
    },
    {
        "_id": "64a744d662d4733a9c26c612",
        "title": "Bojack Horseman",
        "picture": "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
        "director": "Raphael Bob-Waksberg",
        "genre": [
            "Drama",
            "Comedy"
        ],
        "year": 2014,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A humanoid horse, BoJack Horseman -- lost in a sea of self-loathing and booze -- decides it's time for a comeback. Once the star of a '90s sitcom, in which he was the adoptive father of three orphaned kids (two girls and a boy)."
    },
    {
        "_id": "64a7442062d4733a9c26c60f",
        "title": "The Simpsons",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Matt Groening",
        "genre": [
            "Comedy"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "This long-running animated comedy focuses on the eponymous family in the town of Springfield in an unnamed U.S. state."
    },
    {
        "_id": "64a7445862d4733a9c26c610",
        "title": "Star vs the Forces of Evil",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Stephen Hillenburg",
        "genre": [
            "Action",
            "Adventure"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "When magical princess Star Butterfly receives a royal magic wand for her 14th birthday, she proves to her parents that she is not ready for the responsibility that comes with it."
    },
    {
        "_id": "64a7449b62d4733a9c26c611",
        "title": "Gravity Falls",
        "picture": "https://m.media-amazon.com/images/M/MV5BMTEzNDc3MDQ2NzNeQTJeQWpwZ15BbWU4MDYzMzUwMDIx._V1_SY1000_CR0,0,641,1000_AL_.jpg",
        "director": "Alex Hirsch",
        "genre": [
            "Adventure",
            "Comedy"
        ],
        "year": 2012,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "Twins Dipper and Mabel Pines are sent to spend the summer with their great-uncle, Grunkle Stan, in the mysterious town of Gravity Falls, Ore."
    }, {
        "_id": "64a7437b62d4ASfaASc26c60e",
        "title": "Spongebob Squarepants",
        "picture": "https://nick.mtvnimages.com/uri/mgid:arc:content:nick.com:9cd2df6e-63c7-43da-8bde-8d77af9169c7?quality=0.7",
        "director": "Stephen Hillenburg",
        "genre": [
            "Comedy",
            "Family"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A square yellow sponge named SpongeBob SquarePants lives in a pineapple with his pet snail, Gary, in the city of Bikini Bottom on the floor of the Pacific Ocean."
    },
    {
        "_id": "64ASfASF062d4733a9c26c60f",
        "title": "The Simpsons",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Matt Groening",
        "genre": [
            "Comedy"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "This long-running animated comedy focuses on the eponymous family in the town of Springfield in an unnamed U.S. state."
    },
    {
        "_id": "64a74458ASDASF733a9c26c610",
        "title": "Star vs the Forces of Evil",
        "picture": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        "director": "Stephen Hillenburg",
        "genre": [
            "Action",
            "Adventure"
        ],
        "year": 1999,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "When magical princess Star Butterfly receives a royal magic wand for her 14th birthday, she proves to her parents that she is not ready for the responsibility that comes with it."
    },
    {
        "_id": "64a7ASfas2d4733a9c26c611",
        "title": "Gravity Falls",
        "picture": "https://m.media-amazon.com/images/M/MV5BMTEzNDc3MDQ2NzNeQTJeQWpwZ15BbWU4MDYzMzUwMDIx._V1_SY1000_CR0,0,641,1000_AL_.jpg",
        "director": "Alex Hirsch",
        "genre": [
            "Adventure",
            "Comedy"
        ],
        "year": 2012,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "Twins Dipper and Mabel Pines are sent to spend the summer with their great-uncle, Grunkle Stan, in the mysterious town of Gravity Falls, Ore."
    },
    {
        "_id": "64a744aSDAS2asdASDc26c612",
        "title": "Bojack Horseman",
        "picture": "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
        "director": "Raphael Bob-Waksberg",
        "genre": [
            "Drama",
            "Comedy"
        ],
        "year": 2014,
        "nrating": 0,
        "trating": 0,
        "avgrating": 0,
        "nfavorites": 0,
        "description": "A humanoid horse, BoJack Horseman -- lost in a sea of self-loathing and booze -- decides it's time for a comeback. Once the star of a '90s sitcom, in which he was the adoptive father of three orphaned kids (two girls and a boy)."
    },
]

const Profile = ({ navigation }) => {
    useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        navigation.setOptions({
            icon: () => (
                <Ionicons name="person-outline" />
            ),
        });
    }, [navigation])

    const [user, setUser] = useState({
        username: "zain",
        email: "zain@gmail.com",
        fav_cartoon: DATA,
        watch_list: DATA
    });

    return (
        <SafeAreaView className="flex-1 bg-[#1F1D36] p-4">
            <ScrollView scrollEnabled={true}>
                <Text className="self-center text-white font-bold text-lg">Hello, <Text className="text-rose-300 text-transform: capitalize">{user.username}</Text>!</Text>

                <Image className="self-center w-20 h-20 bg-stone-300 rounded-full" source={{uri: `https://avatars.dicebear.com/api/avataaars/${user?.username}.svg`}} />

                <Text className="self-center text-white">Track your reviews and lists!</Text>
                <View>
                    <Text className="basis-1/4 left- top-0 justify-center text-center text-red-300 text-2xl font-bold">{user?.watchlist?.length}</Text>
                    <Text className="TotalCartoons flex basis-8 items-center justify-center text-center text-white text-xs font-normal">Watchlist Total</Text>
                    <Text className="Review flex flex-col basis-28 items-center justify-center"></Text>
                    <Text className=" left-[8px] top-0 justify-center text-center text-fuchsia-800 text-2xl font-bold">{user?.twatched}</Text>
                    <Text className="Reviews flex basis-8 items-center justify-center text-center text-white text-xs font-normal">Reviews</Text>
                </View>
                <CartoonScroller cartoons={DATA} title="My Favorites" />
                <CartoonScroller cartoons={DATA} title="My Watchlist" />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;