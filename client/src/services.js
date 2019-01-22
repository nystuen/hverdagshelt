// @flow
import axios from 'axios';
import {User, Issue, Category, Category2, Category3,  Company, Event, Type, County} from "./classTypes";

axios.interceptors.response.use(response => response.data);



<<<<<<< Updated upstream
export class UserService {
=======
  getCompanyLogin(email: string): Promise<Object> {
    return axios.get('/verify_company/' + email);
  } //end method
>>>>>>> Stashed changes

    addUser(newUser: User): Promise<Response> {
        return axios.post('/add_user', newUser);
    }//end method

<<<<<<< Updated upstream
    getUserLogin(email: string): Promise<string[]>{
        return axios.get('/verify_user/' + email);
    }//end method

    getUser(mail: string): Promise<User>{

        return axios.get('/user/get_user/' +  mail);
    }//end method

    login(userMail: Object<JSON>): Promise<void>{
        return axios.post('/login/', userMail);
    }//end method
=======
  login(userMail: Object<JSON>): Promise<void> {
    return axios.post('/login/', userMail);
  } //end method

  getMyIssues(userMail: string): Promise<JSON> {
    return axios.get('/user/getMyIssues/' + userMail);
  } //end method

  getCompanyIssues(companyMail: string): Promise<JSON> {
    return axios.get('/getCompanyIssues/' + companyMail);
  } //end method
>>>>>>> Stashed changes

    getMyIssues(userMail: string): Promise<JSON>{
        return axios.get('/user/getMyIssues/' + userMail);
    }//end method

<<<<<<< Updated upstream
}//end class

export class CategoryService {

    getCategory1(): Promise<Category[]> {
        return axios.get('/get_category1');
    }
=======
  addCompany(json: Object) {
    return axios.post('/registrateCompany', json);
  }
} //end class

export class EventCategoryService {
  getEventCategory(): Promise<EventCategory[]> {
    return axios.get('get_eventcategory');
  }

  getEvent(eventId: number): Promise<Event> {
    return axios.get('/event/' + eventId);
  }
} //end class

export class ImageService {
  uploadImage(image: Object): Promise<JSON> {
    const url = '/upload';
    const formData = new FormData();
    formData.append('avatar', image);
    const config = {
      headers: {
        contentType: 'multipart/form-data'
      }
    };
    return axios.post(url, formData, config);
  }

  getImage(imagePath: string): Promise<JSON> {
    return axios.get('/image/' + imagePath);
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
  } //end method

  getOneCategory2(id: number) {
    return axios.get('/getOneCategory2/' + id);
  } //end method

  getOneCategory3(id: number) {
    return axios.get('/getOneCategory3/' + id);
  } //end method

  addCompanyCategories(json: Object) {
    return axios.post('/add_CompanyCategories', json);
  }

  addCategory1(json: Object) {
    return axios.post('/add_category1', json);
  }

  addCategory2(json: Object) {
    return axios.post('/add_category2', json);
  }

  addCategory3(json: Object) {
    return axios.post('/add_category3', json);
  }
} //end class

export class IssueService {
  getIssueAndCounty(issue: number): Promise<Object> {
    return axios.get('/oversiktOverSak/' + issue);
  } //end method

  updateStatusOneIssue(id: number, statusName: string) {
    return axios.post('/updateStatusOneIssue/' + id, {
      statusName: statusName
    });
  } //end method
} //end class

export class CountyService {
  getCounties(): Promise<County[]> {
    return axios.get('/getCounties');
  }

  getCategory3(): Promise<Category3[]> {
    return axios.get('/get_category3');
  }

  addCompanyCounties(json: Object) {
    return axios.post('/add_companyCounties', json);
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

  addIssueNotificationSettings(
    newSetting: IssueNotificationSetting
  ): Promise<Response> {
    return axios.post('/add_issue_notification_settings', newSetting);
  }

  getIssueNotificationSettings(email: string): Promise<Object[]> {
    return axios.get('/get_issue_notification_settings/' + email);
  }

  getNotificationSettingsWithNames(email: string): Promise<Object[]> {
    return axios.get('/get_notification_settings_with_names/' + email);
  }

  updateIssueNotificationSettings(
    newSetting: IssueNotificationSetting
  ): Promise<Response> {
    return axios.put('/update_issue_notification_settings', newSetting, { headers: authHeader() });
  }

}

export function getImportantEvents(countyId: number): Promise<Event[]> {
  return axios.get('/importantEvents/' + countyId);
}
>>>>>>> Stashed changes

    getCategory2(): Promise<Category2[]>{
        return axios.get('/get_category2');
    }

    getCategory3(): Promise<Category3[]>{
        return axios.get('/get_category3');
    }
}

export function getAllCounties(usermail:string): Promise<County[]> {
    return axios.get('/getAllCountiesMinusUsers/'+ usermail);
}

export function getUsersCounties(usermail: string): Promise<County[]>{
    return axios.get('/getSubscribedCounties/'+ usermail);
}

export function deleteSubscription(usermail: string){
    return axios.delete('/deleteAllSubscribedCounties/'+ usermail);
}

<<<<<<< Updated upstream
export function addSubscription(json: Object){
    return axios.post('/addSubscription', json);
=======
export class MailService {
  sendTextMail(mailObject: Object): Promise<Response> {
    return axios.post('/sendTextMail', mailObject);
  }

  sendResetPasswordMail(to: string): Promise<Response> {
    console.log(to);
    return axios.post('/sendResetPasswordMail', to);
  }
>>>>>>> Stashed changes
}
