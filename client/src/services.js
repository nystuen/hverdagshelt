// @flow
import axios from 'axios';
import {User, Issue, Category, Company, Event, Type} from "./classTypes";

axios.interceptors.response.use(response => response.data);



export class UserService {

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }//end method

    getUserLogin(email: string): Promise<string[]>{
        return axios.get('/verify_user/' + email);
    }//end method

    getUser(mail: string): Promise<User>{
        return axios.get('/get_user/' +  mail);
    }//end method

    login(userMail: string): Promise<void>{
        return axios.post('/login/', userMail)
    }//end method

}//end class

