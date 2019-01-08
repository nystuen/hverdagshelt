// @flow
import axios from 'axios';
import {User, Issue, Category, Company, Event, Type} from "./classTypes";

axios.interceptors.response.use(response => response.data);


