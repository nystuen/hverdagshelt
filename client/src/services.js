// @flow
import axios from 'axios';
import {User, Issue, Category, Category2, Category3, Company, Event, Type} from "./classTypes";

axios.interceptors.response.use(response => response.data);



export class UserService {

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }//end method

    getUserLogin(mail: string): Promise<string[]>{
        return axios.get('/verify_user', mail);
    }//end method

    getUser(mail: string): Promise<User>{
        return axios.get('/get_user', mail);
    }//end method

}//end class

export class CategoryService {

    getCategory1(): Promise<Category[]>{
        return axios.get('/get_category1');
    }

    getCategory2(): Promise<Category2[]>{
        return axios.get('/get_category2');
    }

    getCategory3(): Promise<Category3[]>{
        return axios.get('/get_category3');
    }
}