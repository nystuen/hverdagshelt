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
} from './classTypes';

let authHeader = function authHeader() {
    // return authorization header with jwt token
    let token = window.localStorage.getItem('userToken');

    if (token) {
        return {'Authorization': 'Bearer ' + token};
    } else {
        return {};
    }
};

axios.interceptors.response.use(response => response.data);

export class UserService {
    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    } //end method

    getUserLogin(email: string): Promise<string[]> {
        return axios.get('/verify_user/' + email);
    } //end method

    getCompanyLogin(email: string): Promise<Object> {
        return axios.get('/verify_company/' + email);
    }//end method

    // returns currently logged in user or company
    getCurrentUser(): Promise<User> {
        return axios.get('/user/get_current_user', {headers: authHeader()})
    } //end method

    login(userMail: Object<JSON>): Promise<void> {
        return axios.post('/login/', userMail);
    }//end method

    getMyIssues(): Promise<JSON> {
        return axios.get('/user/getMyIssues', {headers: authHeader()});
    }//end method

    getCompanyIssues(companyMail: string): Promise<JSON> {
        return axios.get('/getCompanyIssues/' + companyMail);
    }//end method

    updateUser(user: User): Promise<Response> {
        return axios.put('/user/updateUser', user, {headers: authHeader()});
    }

    addCompany(json: Object): Promise<Response> {
        return axios.post('/registrateCompany', json);
    }

    getHomeCounty(): Promise<Object> {
        return axios.get('/getHomeCounty', {headers: authHeader()})
    }

    getCompanyCategories(categoryId: number): Promise<Object[]>{
        return axios.get('/companyCategories/' + categoryId);
    }
}//end class

export class EventCategoryService {
    getEventCategory(): Promise<EventCategory[]> {
        return axios.get('get_eventcategory');
    }

    getEvent(eventId: number): Promise<Event> {
        return axios.get('/event/' + eventId);
    }
    getImportantEvents(countyId: number): Promise<Event[]> {
        return axios.get('/importantEvents/' + countyId);
    }

} //end class

export class ImageService {
  uploadImage(image: Object): Promise<JSON> {
    const url = "/upload";
    const formData = new FormData();
    formData.append("avatar", image);
    const config = {
      headers: {
        contentType: "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  }
  getImage(imagePath: string): Promise<JSON> {
    return axios.get("/image/" + imagePath);
  }
}

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

    getOneCategory1(id: number) {
        return axios.get('/getOneCategory1/' + id);
    }//end method

    getOneCategory2(id: number) {
        return axios.get('/getOneCategory2/' + id);
    }//end method

    getOneCategory3(id: number) {
        return axios.get('/getOneCategory3/' + id);
    }//end method

    addCompanyCategories(json: Object) {
        return axios.post('/add_CompanyCategories', json);
    }

    addCategory1(json: Object) {
        return axios.post('/add_category1', json, {headers: authHeader()});
    }

    addCategory2(json: Object) {
        return axios.post('/add_category2', json, {headers: authHeader()});
    }

    addCategory3(json: Object) {
        return axios.post('/add_category3', json, {headers: authHeader()});
    }

}//end class

export class IssueService {
    getIssueAndCounty(issue: number): Promise<Object> {
        return axios.get('/oversiktOverSak/' + issue);
    }//end method

  getAllIssuesInThisCounty(countyId: number, categoryLevel: number): Promise<Object[]>{
    return axios.get('/getIssuesInThisCounty/' + countyId, {categoryLevel: categoryLevel});
  }//end method

  updateStatusOneIssue(id: number, statusName: string) {
    return axios.post('/updateStatusOneIssue/' + id, { statusName: statusName });
  }//end method

  addCommentToIssue(id: number, text: string, companyMail: string){
    return axios.post('/addIssueComments', {id: id, text: text, companyMail: companyMail});
  }//end method

  getCompanyComments(id: number){
    return axios.get('/companyComments/' + id);
  }//end method

  getOneIssue(id: number){
        return axios.get('/Issues/' + id);
  }//end method
}//end class

export class CountyService {
    getCounties(): Promise<County[]> {
        return axios.get('/getCounties');
    }

    addCompanyCounties(json: Object) {
        return axios.post("/add_companyCounties", json);
    }

    getAllCounties(): Promise<County[]> {
        return axios.get('/getAllCountiesMinusUsers', {headers: authHeader()});
    }

    getUsersCounties(): Promise<Object[]> {
        return axios.get('/getSubscribedCounties', {headers: authHeader()});
    }

    deleteSubscription() {
        return axios.delete('/deleteAllSubscribedCounties', {headers: authHeader()});
    }

    addSubscription(json: Object) {
        console.log('addSubscription', json);
        return axios.post('/addSubscription', json, {headers: authHeader()});
    }
}

export class NotificationSettingsService {

    getNotificationSettings(): Promise<Object[]> {
        return axios.get('/get_notification_settings', {headers: authHeader()});
    }

    deleteNotificationSettings(): Promise<void> {
        return axios.delete('/delete_notification_settings', {headers: authHeader()});
    }

    addNotificationSettings(newSetting: NotificationSetting): Promise<Response> {
        return axios.post('/add_notification_settings', newSetting, {headers: authHeader()});
    }

    addIssueNotificationSettings(newSetting: IssueNotificationSetting): Promise<Response> {
        return axios.post('/add_issue_notification_settings', newSetting, {headers: authHeader()});
    }

    getIssueNotificationSettings(): Promise<Object[]> {
        return axios.get('/get_issue_notification_settings', {headers: authHeader()});
    }

    getNotificationSettingsWithNames(): Promise<Object[]> {
        return axios.get('/get_notification_settings_with_names', {headers: authHeader()})
    }

    updateIssueNotificationSettings(newSetting: IssueNotificationSetting): Promise<Response> {
        return axios.put('/update_issue_notification_settings', newSetting);
    }

}



export class MailService {

    sendTextMail(mailObject: Object): Promise<Response> {
        return axios.post('/sendTextMail', mailObject);
    }

    sendResetPasswordMail(to: string): Promise<Response> {
        return axios.post('/sendResetPasswordMail', to);
    }

}