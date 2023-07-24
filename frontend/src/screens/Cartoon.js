import { useParams } from 'react-router-dom'
import PictureCard from '../components/PictureCard'
import back from '../assets/back.svg'
import add from '../assets/add.svg'
import watch from '../assets/watch.svg'
import radd from '../assets/radd.svg'
import rwatch from '../assets/rwatch.svg'
import stars from '../assets/stars.svg'
import stats from '../assets/stats.svg'
import { useMediaQuery } from 'react-responsive'
import { useRequestData } from '../hooks/useRequestData'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import imageToGradient from "../constants/forbiddenMath"

import { useProtectedPage } from '../hooks/useProtectedPage'
import { goToHome } from '../router/coordinator'


const Cartoon = () => {
    useProtectedPage()

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    const params = useParams()
    const navigate = useNavigate()
    const [{ cartoon }, update] = useRequestData(`/cartoons/${params.id}`)
    const [hoverAdd, setHoverAdd] = useState(false)
    const [hoverWatch, setHoverWatch] = useState(false)

    const doWatchlist = () => {
        console.log("Don't say yes, run away now\nI'll meet you when you're out of the church at the back door\nDon't wait, or say a single vow \nYou need to hear me out \nAnd they said, 'Speak now'")
    }

    useEffect(() => {
        imageToGradient(
            cartoon.picture,
            {},
            (err, gradient) => {
                const gradientDiv = document.getElementById("gradient");

                gradientDiv.style.background = gradient;
            }
        );
    }, []);

    return <div >
        <div id="gradient" className="absolute z-10 w-screen h-screen overflow-hidden">
            {!isMobile ? <svg className="absolute h-[100%] bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#1F1D36" fill-opacity="1" d="M0,128L60,106.7C120,85,240,43,360,42.7C480,43,600,85,720,112C840,139,960,149,1080,144C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg> : <svg className="absolute h-[100%] bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320">
                <path fill="#1F1D36" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,64C384,85,480,139,576,138.7C672,139,768,85,864,58.7C960,32,1056,32,1152,74.7C1248,117,1344,203,1392,245.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>

            }
        </div>
        <div className="z-30 absolute">
            <div className="flex flex-col cursor-default text-white w-screen h-screen justify-around items-center" >
                <img onClick={() => goToHome(navigate)} className="cursor-pointer ml-3 lg:ml-8 h-[5%] lg:w-[3%] w-[8%] self-start" src={back} />
                <div className="flex h-[80%] lg:w-[90%] w-screen justify-center">
                    <div className="lg:h-[90%] h-[50%] lg:w-[20%] w-[40%] flex flex-col items-center">
                        <PictureCard pic={cartoon.picture} />
                        <div className="my-2 mb-6 lg:mb-3 w-[50%] h-[10%] flex justify-between">
                            <div className="">
                                <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p className="text-white text-center text-opacity-50 text-sm font-normal">{cartoon.nratings}</p>
                            </div>
                            <div>
                                <svg className="w-6 h-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                                </svg>
                                <p className="text-white text-center text-opacity-50 text-sm font-normal">{cartoon.nfavorites}</p>
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-[74%] w-[75%]  lg:h-[15%] h-[20%] justify-between">
                            <button onClick={() => goToReview(navigate, params.id)} onMouseEnter={() => setHoverAdd(true)}
    onMouseLeave={() => setHoverAdd(false)}  type="button" className="flex items-center justify-center mb-2 hover:bg-fuchsia-800 hover:text-white w[100%] h-[4em] bg-red-300 rounded-[7px] text-center text-gray-800 lg:text-xs text-[0.6rem] font-semibold"><img className="lg:w-[10%] w-[13%] pr-1" src={hoverAdd? radd: add} />Rate or Review</button>
                            <button onClick={doWatchlist} onMouseEnter={() => setHoverWatch(true)} onMouseLeave={() => setHoverWatch(false)}  type="button" className="flex items-center justify-center hover:bg-fuchsia-800 hover:text-white w[100%] h-[4em] bg-red-300 rounded-[7px] text-center text-gray-800 lg:text-xs text-[0.6rem] font-semibold"><img className="lg:w-[10%] w-[13%] pr-1" src={hoverWatch? rwatch : watch} /> Add to Watchlist</button>
                        </div>
                    </div>
                    <div className="flex flex-col lg:h-[75%] h-[50%] w-[55%] justify-around">
                        <h1 className="lg:text-3xl text-lg font-bold">{cartoon.title}</h1>
                        <div className="lg:text-base text-[0.6em] font-normal flex justify-between">
                            <p>Directed by <b>{cartoon.director}</b></p>
                            <p>{cartoon.year}</p>
                        </div>
                        <p className="text-justify lg:text-base text-xs font-normal">{cartoon.description}</p>
                        <h3 className="lg:text-lg text-white text-opacity-50 text-sm font-normal">Ratings</h3>
                        <div className="flex justify-between">
                            <img className="lg:w-[40%] w-[50%]" src={stats} />
                            <div className="w-[40%] flex flex-col items-center lg:justify-around justify-between ">
                                <h1 className="h-[10%] text-red-300 lg:text-[4em] text-3xl font-normal">{cartoon.avgrating}</h1>
                                <img className="lg:w-[40%] w-[50%] " src={stars} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Cartoon