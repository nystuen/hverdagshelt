// @flow
import axios from 'axios';
import {
  User,
  Issue,
  Category,
  Category2,
  Category3,
  Company,
  Event,
  Type,
  County,
  NotificationSetting,
  IssueNotificationSetting,
  EventCategory
} from "./classTypes";

axios.interceptors.response.use(response => response.data);

export class UserService {
  addUser(newUser: User): Promise<Response> {
    return axios.post('/add_user', newUser);
  } //end method

  getUserLogin(email: string): Promise<string[]> {
    return axios.get('/verify_user/' + email);
  } //end method

  getUser(mail: string): Promise<User> {
    console.log('service',mail)
    return axios.get('/user/get_user/' + mail);
  } //end method

  login(userMail: Object<JSON>): Promise<void> {
    return axios.post('/login/', userMail);
  }//end method

  getMyIssues(userMail: string): Promise<JSON> {

    return axios.get('/user/getMyIssues/' + userMail);
  }//end method

  updateUser(user: User): Promise<Response> {
    return axios.put('/user/updateUser', user);
  }

    addCompany(json: Object) {
        return axios.post("/registrateCompany", json);
    }
}//end class



export class EventCategoryService {
  getEventCategory(): Promise<EventCategory[]> {
    return axios.get('get_eventcategory');
  }

} //end class


export class CategoryService {

  getCategory1(): Promise<Category[]> {
    return axios.get('/get_category1');
  }

  getCategory2(): Promise<Category2[]> {
    return axios.get('/get_category2');
  }


  getCategory3(): Promise<Category3[]> {
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

    addCompanyCategories(json:Object){
    return axios.post("/add_CompanyCategories",json);
    }


}//end class

export class IssueService{
  getIssueAndCounty(issue: number): Promise<Object>{
    return axios.get('/oversiktOverSak/' + issue);
  }//end method
}//end class




export class CountyService{
    getCounties(): Promise<County[]>{
        return axios.get('/getCounties');
    }

    getCategory3(): Promise<Category3[]> {
    return axios.get("/get_category3");
}
    addCompanyCounties(json:Object){
        return axios.post("/add_companyCounties",json);
    }



}

export class MyPage {


  addCategory1(json: Object) {
    return axios.post('/add_category1', json);
  }

  addCategory2(json: Object) {
    return axios.post('/add_category2', json);
  }

  addCategory3(json: Object) {
    return axios.post('/add_category3', json);
  }
}

export class NotificationSettingsService {

  getNotificationSettings(email: string): Promise<Object[]> {
    return axios.get('/get_notification_settings/' + email);
  }

  deleteNotificationSettings(email: string): Promise<void> {
    return axios.delete('/delete_notification_settings/' + email);
  }

  addNotificationSettings(newSetting: NotificationSetting): Promise<Response> {
    return axios.post('/add_notification_settings', newSetting);
  }

  addIssueNotificationSettings(newSetting: IssueNotificationSetting): Promise<Response> {
    return axios.post('/add_issue_notification_settings', newSetting);
  }

  getIssueNotificationSettings(email: string): Promise<Object[]> {
    return axios.get('/get_issue_notification_settings/' + email);
  }

    getNotificationSettingsWithNames(email: string): Promise<Object[]> {
        return axios.get('/get_notification_settings_with_names/' + email)
    }

    updateIssueNotificationSettings(newSetting: IssueNotificationSetting): Promise<Response> {
        return axios.put('/update_issue_notification_settings', newSetting);
    }

}

export function getImportantEvents(countyId: number): Promise<Event[]> {
  console.log('Id inn til services' + countyId);
  return axios.get('/importantEvents/' + countyId);
}

export function getAllCounties(usermail: string): Promise<County[]> {
  return axios.get('/getAllCountiesMinusUsers/' + usermail);
}

export function getUsersCounties(usermail: string): Promise<Object[]> {
  return axios.get('/getSubscribedCounties/' + usermail);
}

export function deleteSubscription(usermail: string) {
  return axios.delete('/deleteAllSubscribedCounties/' + usermail);
}

export function addSubscription(json: Object) {
  console.log('addSubscription', json);
  return axios.post('/addSubscription', json);
}

export function getCounties() {
    return axios.get('/getCounties');
}

export class MailService {

  sendTextMail(mailObject: Object): Promise<Response> {
    return axios.post('/sendTextMail', mailObject);
  }

  sendResetPasswordMail(to: string): Promise<Response> {
    return axios.post('/sendResetPasswordMail', to);
  }

}