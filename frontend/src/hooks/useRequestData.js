import { useState, useEffect } from 'react'
import axios from 'axios'
import {baseUrl} from '../constants/url'

// filling up arrays of data
export const useRequestData = (urlEnd) => {
    const [data, setData] = useState([])

    const getData = () => {
        axios.get(`${baseUrl}${urlEnd}`, {
            headers: {
                Authorization: 'token goes here'
            }
        }).then(response => {
            console.log(response.data)
            setData(response.data)
        }).catch(err => {

            console.log(err.message)
        }) 
    }
    useEffect(() => {
        getData()
    }, [urlEnd])

    return [data, getData]  
}