// @flow
import axios from 'axios';
import {User, Issue, Category, Company, Event, Type} from "./classTypes";

axios.interceptors.response.use(response => response.data);



class UserService {

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }
}