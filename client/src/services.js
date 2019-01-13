// @flow
import axios from 'axios';
import {User, Issue, Category, Company, Event, Type, County} from "./classTypes";

axios.interceptors.response.use(response => response.data);



export class UserService {

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }//end method

    getUserLogin(mail: string): Promise<string[]>{
        return axios.get('/verify_user', mail);
    }//end method

    getUser(mail: string): Promise<User>{
        return axios.get('/get_user/' + mail);
    }//end method

}//end class


export function getAllCounties(usermail:string): Promise<County[]> {
    return axios.get('/getAllCountiesMinusUsers/'+ usermail);
}

export function getUsersCounties(usermail: string): Promise<County[]>{
    return axios.get('/getSubscribedCounties/'+ usermail);
}

export function deleteSubscription(usermail: string){
    return axios.delete('/deleteAllSubscribedCounties/'+ usermail);
}

export function addSubscription(json: Object){
    return axios.post('/addSubscription', json);
}


