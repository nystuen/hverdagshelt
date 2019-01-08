// @flow
import axios from 'axios';
import {User, Issue, Type, Company, Category, Event} from 'classTypes';
axios.interceptors.response.use(response => response.data);


