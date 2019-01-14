// @flow
import axios from "axios";
import { User, Issue, Category, Company, Event, Type } from "./classTypes";

axios.interceptors.response.use(response => response.data);

export class CategoryService {
  getCategory1(): Promise<Category[]> {
    return axios.get("/get_category1");
  }

  getCategory2(): Promise<Category2[]> {
    return axios.get("/get_category2");
  }

  getCategory3(): Promise<Category3[]> {
    return axios.get("/get_category3");
  }
}
