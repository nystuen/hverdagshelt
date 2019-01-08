// @flow
import axios from 'axios';
import {User, Issue, Category, Company, Event, Type} from "./classTypes";

axios.interceptors.response.use(response => response.data);


addPost(newPost: Post): Promise<Response> {
    return axios.post('/add_post', newPost);
}