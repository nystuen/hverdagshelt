// @flow
import axios from 'axios';
import {User, Issue, Category, Category2, Category3,  Company, Event, Type, County} from "./classTypes";

axios.interceptors.response.use(response => response.data);



export class UserService {

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }//end method

    getUserLogin(email: string): Promise<string[]>{
        return axios.get('/verify_user/' + email);
    }//end method

    getUser(mail: string): Promise<User>{
        return axios.get('/user/get_user/' +  mail);
    }//end method

    login(userMail: Object<JSON>): Promise<void>{
        return axios.post('/login/', userMail);
    }//end method

    getMyIssues(userMail: string): Promise<JSON>{
        return axios.get('/user/getMyIssues/' + userMail);
    }//end method

}//end class

export class CategoryService {

    getCategory1(): Promise<Category[]> {
        return axios.get('/get_category1');
    }

    getCategory2(): Promise<Category2[]>{
        return axios.get('/get_category2');
    }

    getCategory3(): Promise<Category3[]>{
        return axios.get('/get_category3');
    }

    getOneCategory1(id: number){
        return axios.get('/getOneCategory1/' + id);
    }//end method

    getOneCategory2(id: number){
        return axios.get('/getOneCategory2/' + id);
    }//end method

    getOneCategory3(id: number){
        return axios.get('/getOneCategory3/' + id);
    }//end method
}//end class

export class IssueService{
    getIssueAndCounty(issue: number): Promise<Object>{
        return axios.get('/oversiktOverSak/' + issue);
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
