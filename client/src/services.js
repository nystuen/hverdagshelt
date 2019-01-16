// @flow
import axios from "axios";
import {
  User,
  Issue,
  Category,
  Category2,
  Category3,
  Company,
  Event,
  Type,
  County
} from "./classTypes";

axios.interceptors.response.use(response => response.data);

export class UserService {
  addUser(newUser: User): Promise<Response> {
    return axios.post("/add_user", newUser);
  } //end method

  getUserLogin(email: string): Promise<string[]> {
    return axios.get("/verify_user/" + email);
  } //end method

  getUser(mail: string): Promise<User> {
    return axios.get("/user/get_user/" + mail);
  } //end method

  login(userMail: Object<JSON>): Promise<void> {
    return axios.post("/login/", userMail);
  } //end method

  getMyIssues(userMail: string): Promise<JSON> {
    return axios.get("/user/getMyIssues/" + userMail);
  } //end method
} //end class

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

    addCompanyCategories(){
        return axios.post("/add_CompanyCategories");
    }
}

export class CountyService{
    getCounties(): Promise<County[]>{
        return axios.get('/getCounties');
    }


}

export class MyPage{


  addCategory1(json: Object) {
    return axios.post("/add_category1", json);
  }

  addCategory2(json: Object) {
    return axios.post("/add_category2", json);
  }

  addCategory3(json: Object) {
    return axios.post("/add_category3", json);
  }
}



export function getImportantEvents(countyId:number): Promise<Event[]> {
    console.log("Id inn til services" + countyId)
        return axios.get('/importantEvents/'+countyId);
}

export function getAllCounties(usermail:string): Promise<County[]> {
    return axios.get('/getAllCountiesMinusUsers/'+ usermail);

}

export function getUsersCounties(usermail: string): Promise<County[]> {
  return axios.get("/getSubscribedCounties/" + usermail);
}

export function deleteSubscription(usermail: string) {
  return axios.delete("/deleteAllSubscribedCounties/" + usermail);
}

export function addSubscription(json: Object) {
  return axios.post("/addSubscription", json);
}

