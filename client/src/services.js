// @flow
import axios from "axios";
import {
  Admin,
  Employee,
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

/**
 * @method authHeader
 * @returns authentication header object
 */
let authHeader = function authHeader() {
  // return authorization header with jwt token
  let token = window.localStorage.getItem("userToken");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

axios.interceptors.response.use(response => response.data);

/**
 * @Class UserServices
 */
export class UserService {

    /**
     * @method addUser
     * @param {Object} {mail: string;firstName: string, lastName: string, password: string, typeName: string, phone: string, points: number, countyId: number,active: number}
     * @returns POST /add_user
     */
  addUser(newUser: User): Promise<Response> {
    return axios.post("/add_user", newUser);
  } //end method
    /**
     * @method getUserLogin
     * @param {string} email
     * @returns GET /verify_user/:email
     */
  getUserLogin(email: string): Promise<string[]> {
    return axios.get("/verify_user/" + email);
  } //end method
    /**
     * @method getCompanyLogin
     * @param {string} email
     * @returns GET /verify_company/:email
     */
  getCompanyLogin(email: string): Promise<Object> {
    return axios.get("/verify_company/" + email);
  } //end method
    /**
     * @method getCurrentUser
     * @return GET /user/get_current_user
     */
  // returns currently logged in user or company
  getCurrentUser(): Promise<User> {
    return axios.get("/user/get_current_user", { headers: authHeader() });
  } //end method
    /**
     * @method login
     * @param {string} userMail
     * @returns GET /login/:userMail
     */
  login(userMail: Object<JSON>): Promise<void> {
    return axios.post("/login/", userMail);
  } //end method
    /**
     * @method getMyIssues
     * @return GET /user/getMyIssues
     */
  getMyIssues(): Promise<JSON> {
    return axios.get("/user/getMyIssues", { headers: authHeader() });
  } //end method
    /**
     * @method getMyIssuesWithCat
     * @returns GET
     */
  getMyIssuesWithCat(): Promise<JSON> {
    return axios.get('/user/getMyIssuesWithCat', { headers: authHeader() });
  }

  getCompanyIssues(companyMail: string): Promise<JSON> {
    return axios.get("/getCompanyIssues/" + companyMail);
  } //end method

  updateUser(user: User): Promise<Response> {
    return axios.put("/user/updateUser", user, { headers: authHeader() });
  }

  addCompany(json: Object): Promise<Response> {
    return axios.post("/registrateCompany", json);
  }
  addAdmin(newAdmin: Admin): Promise<Response> {
    return axios.post("/add_admin", newAdmin, {headers: authHeader()});
  }
  addEmployee(newEmployee: Employee): Promise<Promise> {
    return axios.post("/add_employee", newEmployee, {headers: authHeader()});
  }

  addCompany(json: Object) {
    return axios.post("/registrateCompany", json);
  }

  resetPassword(json: Object): Promise<Response> {
    return axios.put("/user/change_password", json, { headers: authHeader() });
  }

  getHomeCounty(): Promise<Object> {
    return axios.get("/getHomeCounty", { headers: authHeader() });
  }

  getCompanyCategories(
    categoryId: number,
    countyId: number
  ): Promise<Object[]> {
    return axios.get("/companyCategories/" + categoryId + "/" + countyId);
  } //end method

  assignIssueToCompany(issueId: number, companyMail: string): Promise<void> {
    return axios.post("/assignIssue/" + issueId + "/" + companyMail);
  } //end method

  updatePoints(json: Object) {
    return axios.put("/updatePoints", json);
  }
} //end class

export class EventCategoryService {
  getEventCategory(): Promise<EventCategory[]> {
    return axios.get("get_eventcategory");
  }

  getEvent(eventId: number): Promise<Event> {
    return axios.get("/event/" + eventId);
  }

  getImportantEvents(countyId: number): Promise<Event[]> {
    return axios.get("/importantEvents/" + countyId);
  }

  getAllEventsInOneCounty(countyId: number): Promise<Object[]>{
    return axios.get("/allEventsInCounty/" + countyId);
  }//end method

  updateEvent(event: Object): Promise<void>{
    return axios.post("/updateEvent", event);
  }//end method

  deleteEvent(eventId: number): Promise<void>{
    return axios.post("/deleteEvent/" + eventId);
  }//end method
}//end class

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
  updateCategory2(category2: number): Promise<void> {
      return axios.put("/category2/updateCategory2", {cat2Id: category2}, {headers: authHeader()});
  }
  updateCategory1(category1: number): Promise<void> {
        return axios.put("/category1/updateCategory1", {cat1Id: category1}, {headers: authHeader()});
    }

  getCategory1(): Promise<Category[]> {
    return axios.get("/get_category1");
  }

  getCategory2(): Promise<Category2[]> {
    return axios.get("/get_category2");
  }

  getCategory3(): Promise<Category3[]> {
    return axios.get("/get_category3");
  }

  getOneCategory1(id: number) {
    return axios.get("/getOneCategory1/" + id);
  } //end method

  getOneCategory2(id: number) {
    return axios.get("/getOneCategory2/" + id);
  } //end method

  getOneCategory3(id: number) {
    return axios.get("/getOneCategory3/" + id);
  } //end method

  addCompanyCategories(json: Object) {
    return axios.post("/add_CompanyCategories", json);
  }

  addCategory1(json: Object) {
    return axios.post("/add_category1", json, { headers: authHeader() });
  }

  addCategory2(json: Object) {
    return axios.post("/add_category2", json, { headers: authHeader() });
  }

  addCategory3(json: Object) {
    return axios.post("/add_category3", json, { headers: authHeader() });
  }
} //end class

export class IssueService {
  getAllIssuesInThisCounty(
    countyId: number,
    categoryLevel: number
  ): Promise<Object[]> {
    return axios.get("/getIssuesInThisCounty/" + countyId, {
      categoryLevel: categoryLevel
    });
  } //end method

  getIssueAndCounty(issue: number): Promise<Object> {
    return axios.get('/oversiktOverSak/' + issue);
  } //end method

  updateStatusOneIssue(id: number, statusName: string, res: Object) {
    let mailObject = {
      to: res.userMail
    };

    if (statusName == "In progress" && res.inProgress == 1) {
      console.log();
      axios.post("/sendIssueInProgressMail", mailObject);
    }

    if (statusName == "Completed" && res.completed == 1) {
      console.log("completed");
      axios.post("/sendIssueCompleteMail", mailObject);
    }

    return axios.post(
      "/updateStatusOneIssue",
      { statusName: statusName, id: id },
      { headers: authHeader() }
    );
  } //end method

  addCommentToIssue(id: number, text: string, companyMail: string) {
    return axios.post("/addIssueComments", {
      id: id,
      text: text,
      companyMail: companyMail
    });
  } //end method

  getCompanyComments(id: number) {
    return axios.get("/companyComments/" + id);
  } //end method

  getOneIssue(id: number) {
    return axios.get("/Issues/" + id);
  } //end method

  deleteThisIssue(id: number): Promise<void> {
    return axios.post("/deleteThisIssue/" + id);
  } //end method

  deleteIssue(issueId: number) {
    return axios.put("/deleteIssue/" + issueId);
  }

  editIssue(issueId: number, text: string) {
    return axios.put("/editIssue/" + issueId, { text: text });
  }
} //end class

export class CountyService {
  getCounties(): Promise<County[]> {
    return axios.get("/getCounties");
  }

  addCompanyCounties(json: Object) {
    return axios.post("/add_companyCounties", json);
  }

  getAllCounties(): Promise<County[]> {
    return axios.get("/getAllCountiesMinusUsers", { headers: authHeader() });
  }

  getCountyEmployee(id: number): Promise<Object[]> {
    return axios.get("/getEmployeeData/" + id);
  }

  getUsersCounties(): Promise<Object[]> {
    return axios.get("/getSubscribedCounties", { headers: authHeader() });
  }

  deleteSubscription() {
    return axios.delete("/deleteAllSubscribedCounties", {
      headers: authHeader()
    });
  }

  addSubscription(json: Object) {
    console.log("addSubscription", json);
    return axios.post("/addSubscription", json, { headers: authHeader() });
  }
}

export class NotificationSettingsService {
  getNotificationSettings(): Promise<Object[]> {
    return axios.get("/get_notification_settings", { headers: authHeader() });
  }

  deleteNotificationSettings(): Promise<void> {
    return axios.delete("/delete_notification_settings", {
      headers: authHeader()
    });
  }

  addNotificationSettings(newSetting: NotificationSetting): Promise<Response> {
    return axios.post("/add_notification_settings", newSetting, {
      headers: authHeader()
    });
  }

  addIssueNotificationSettings(
    newSetting: IssueNotificationSetting
  ): Promise<Response> {
    return axios.post("/add_issue_notification_settings", newSetting, {
      headers: authHeader()
    });
  }

  getIssueNotificationSettings(): Promise<Object[]> {
    return axios.get("/get_issue_notification_settings", {
      headers: authHeader()
    });
  }

  getNotificationSettingsWithNames(): Promise<Object[]> {
    return axios.get("/get_notification_settings_with_names", {
      headers: authHeader()
    });
  }

  updateIssueNotificationSettings(
    newSetting: IssueNotificationSetting
  ): Promise<Response> {
    return axios.put("/update_issue_notification_settings", newSetting, {
      headers: authHeader()
    });
  }

  getIssueNotificationSettingsFromUser(userMail: string): Promise<Object[]> {
    return axios.get("/get_issue_notification_settings_from_user/" + userMail);
  }

  getUsersWithNotificationsLikeThis(
    countyId: number,
    categoryId: number
  ): Promise<Object[]> {
    return axios.get(
      "/get_users_with_notifications_like_this/" + countyId + "/" + categoryId
    );
  }
}

export class StatisticsService {

  getStatus(countyId: number): Promise<Response>{
    return axios.get('/issueCategories/' + countyId)
  }

  getDaily(countyId: number): Promise<Response>{
    return axios.get('/issuesDaily/'+ countyId)
  }

  getStatusAllCounties(): Promise<Response>{
    return axios.get('/issueCategoriesAllCounties/')
  }

  getDailyAllCounties(): Promise<Response>{
    return axios.get('/issuesDailyAllCounties/')
  }
}

export class MailService {
  sendTextMail(mailObject: Object): Promise<Response> {
    return axios.post("/sendTextMail", mailObject);
  }

  sendResetPasswordMail(to: string): Promise<Response> {
    return axios.post("/sendResetPasswordMail", to);
  }

  sendIssueCompleteMail(to: string): Promise<Response> {
    return axios.post("/sendIssueCompeleteMail", to);
  }

  sendEventMail(to: [String], event: Event): Promise<Response> {
    return axios.post("/sendEventMail", { to: to, event: event });
  }
}

export class EmployeeService {
  getUsersInCounty(countyId: number): Promise<Response> {
    return axios.get("/getUsersInCounty/" + countyId, {
      headers: authHeader()
    });
  }

  blockUser(mail: string) {
    return axios.put("blockUser/" + mail);
  }

  unblockUser(mail: string) {
    return axios.put("unblockUser/" + mail);
  }
}
