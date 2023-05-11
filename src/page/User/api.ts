import axios from 'axios'
import { IUser } from '../../types/blog'

axios.defaults.baseURL = 'http://127.0.0.1:8080'

export async function fetchAllUsers (){
    const response = await axios.get('/user')
    return  response.data.data.users as IUser[]
}