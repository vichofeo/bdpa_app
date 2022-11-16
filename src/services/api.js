import axios from 'axios'
import {urlEnd, getHeader} from '@/config/config'

export function http(){
    return axios.create({
        baseURL:urlEnd,
        headers: getHeader()
    })
}