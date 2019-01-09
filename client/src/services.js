// @flow
import axios from 'axios';
import {User, Issue, Category, Company, Event, Type} from "./classTypes";

axios.interceptors.response.use(response => response.data);



export class UserService {

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }

    getUserLogin(mail: string): Promise<string[]>{
        return axios.get('/verify_user', mail);
    }

    getUser(mail: string): Promise<User>{
        return axios.get('/get_user', mail);
    }

}