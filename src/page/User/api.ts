import axios from 'axios'
import {timeParser} from '../../utils/utils.ts';
import { IUser } from '../../types/blog'

axios.defaults.baseURL = 'http://124.220.198.163:8080'
// axios.defaults.baseURL = 'http://localhost:8080'

export async function fetchAllUsers (){
    const { data } = await axios.get('/user')
    // console.log('data',data.data);
    
  await data.data.users.map((user:IUser) => {
        user.last_login = timeParser(user.last_login)
              console.log(user.last_login);
              user.birthday = (timeParser(user.birthday)).substring(0,9);
                console.log(user.birthday);
    
    });
    console.log('data',data.data.users);

    return  data.data.users as IUser[]
}