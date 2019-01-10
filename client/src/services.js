// @flow
import axios from 'axios';
import {User, County, Issue, Category, Company, Event, Type} from "./classTypes";

axios.interceptors.response.use(response => response.data);



export class UserService {

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }

}

export class CountyService{
    getCounties(): Promise<County[]>{
        return axios.get('/getCounties');
    }
}