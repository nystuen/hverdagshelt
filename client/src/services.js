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
 * User: {mail: string, firstName: string, lastName: string, password: string, typeName: string, phone: string, points: number, countyId: number,active: number}
 * Admin: {mail: string, firstName: string, lastName: string, typeName: string, phone: string, points: number, countyId: number, active: number}
 * Employee: {mail: string, firstName: string, lastName: string, typeName: string, phone: string, points: number, countyId: number, active: number}
 * Issue: {issueId: number, userMail: string, latitude: number, longitude: number, text: string, pic: string, date: string, statusName: string, categoryId: number, countyId: number, active: number}
 * Company: {typeName: string, active: number, companyMail: string, companyName: string, description: string}
 *
 * @class UserServices
 *
 */
export class UserService {

    /**
     * POST /add_user
     *
     * @method addUser
     * @param {User} newUser
     * @returns void
     */
  addUser(newUser: User): Promise<Response> {
    return axios.post("/add_user", newUser);
  } //end method
    /**
     * GET /verify_user/:email
     *
     * @method getUserLogin
     * @param {String} email
     * @returns {User}
     */
  getUserLogin(email: string): Promise<string[]> {
    return axios.get("/verify_user/" + email);
  } //end method
    /**
     * GET /verify_company/:email
     *
     * @method getCompanyLogin
     * @param {String} email
     * @returns {Company}
     */
  getCompanyLogin(email: string): Promise<Object> {
    return axios.get("/verify_company/" + email);
  } //end method
    /**
     * GET /user/get_current_user
     *
     * @method getCurrentUser
     * @return {User} OR {Company}
     */
  // returns currently logged in user or company
  getCurrentUser(): Promise<User> {
    return axios.get("/user/get_current_user", { headers: authHeader() });
  } //end method
    /**
     * POST /login
     *
     * @method login
     * @param {Object}{email: string, typeId: number}
     * @returns void
     */
  login(userMail: Object<JSON>): Promise<void> {
    return axios.post("/login/", userMail);
  } //end method
    /**
     * GET /user/getMyIssues
     *
     * @method getMyIssues
     * @return {Issue[]}
     */
  getMyIssues(): Promise<JSON> {
    return axios.get("/user/getMyIssues", { headers: authHeader() });
  } //end method
    /**
     * GET /user/getAllIssuesWithCat
     *
     * @method getAllIssuesWithCat
     * @returns {Issue[]}
     */
  getAllIssuesWithCat(): Promise<JSON> {
    return axios.get('/user/getAllIssuesWithCat', { headers: authHeader() });
  }

    /**
     * GET /getCompanyIssues
     *
     * @method getCompanyIssues
     * @param {String} companyMail
     * @returns {Issue[]}
     */
  getCompanyIssues(companyMail: string): Promise<JSON> {
    return axios.get("/getCompanyIssues/" + companyMail);
  } //end method
    /**
     * GET /getCompanyIssuesWithCat/:companyMail
     *
     * @method getCompanyIssuesWithCat
     * @param {String} companyMail
     * @returns {Issue[]}
     */
  getCompanyIssuesWithCat(companyMail: string): Promise<JSON> {
    return axios.get("/getCompanyIssuesWithCat/" + companyMail);
  } //end method
    /**
     * PUT user/updateUser
     *
     * @method updateUser
     * @param {User} user
     * @returns void
     */

  updateUser(user: User): Promise<Response> {
    return axios.put("/user/updateUser", user, { headers: authHeader() });
  }

    /**
     * POST /registrateCompany
     *
     * @method addCompany
     * @param {Company} json
     * @returns void
     */
  addCompany(json: Object): Promise<Response> {
    return axios.post("/registrateCompany", json);
  }

    /**
     * POST /add_admin
     *
     * @method addAdmin
     * @param {Admin} newAdmin
     * @returns void
     */
  addAdmin(newAdmin: Admin): Promise<Response> {
    return axios.post("/add_admin", newAdmin, {headers: authHeader()});
  }

    /**
     * POST /add_employee
     *
     * @method addEmployee
     * @param {Employee} newEmployee
     * @returns void
     */
  addEmployee(newEmployee: Employee): Promise<Promise> {
    return axios.post("/add_employee", newEmployee, {headers: authHeader()});
  }

    /**
     * POST /registrateCompany
     *
     * @method addCompany
     * @param {Company} json
     * @returns void
     */
  addCompany(json: Object) {
    return axios.post("/registrateCompany", json);
  }

    /**
     * PUT /user/change_password
     *
     * @method resetPassword
     * @param {Object} {newPassword: string}
     * @returns void
     */
  resetPassword(json: Object): Promise<Response> {
    return axios.put("/user/change_password", json, { headers: authHeader() });
  }

    /**
     * GET /getHomeCounty
     *
     * @method getHomeCounty
     * @returns {number} countyId
     */
  getHomeCounty(): Promise<Object> {
    return axios.get("/getHomeCounty", { headers: authHeader() });
  }

    /**
     * GET /companyCategories/:categoryId/:countyId
     *
     * @method getCompanyCategories
     * @param {number} categoryId
     * @param {number} countyId
     * @returns {Object[]}
     */
  getCompanyCategories(
    categoryId: number,
    countyId: number
  ): Promise<Object[]> {
    return axios.get("/companyCategories/" + categoryId + "/" + countyId);
  } //end method
    /**
     * POST /assignIssue/:issueId/:companyMail
     *
     * @method assignIssueToCompany
     * @param {number} issueId
     * @param {number} companyMail
     * @returns void
     */
  assignIssueToCompany(issueId: number, companyMail: string): Promise<void> {
    return axios.post("/assignIssue/" + issueId + "/" + companyMail);
  } //end method
    /**
     * PUT /updatepoints
     *
     * @method updatePoints
     * @param {Object} points: number, userMail: string
     * @returns void
     */
  updatePoints(json: Object) {
    return axios.put("/updatePoints", json);
  }
} //end class
/**
 * EventCategory: {eventCategoryId: number, name: string, active: number}
 * Event: {eventId: number, title: string, text: string, latitude: double, longitude: double, date: string, userMail: string, countyId: number, active: number}
 *
 * @class EventCategoryService
 *
 */
export class EventCategoryService {
    /**
     * GET /get_eventCategory
     *
     * @method getEventCategory
     * @returns {EventCategory}
     */
  getEventCategory(): Promise<EventCategory[]> {
    return axios.get("get_eventcategory");
  }

    /**
     * GET /event/:eventId
     *
     * @method getEvent
     * @param {number} eventId
     * @returns {Event}
     * */
  getEvent(eventId: number): Promise<Event> {
    return axios.get("/event/" + eventId);
  }

    /**
     * GET /importantEvents
     *
     * @method getImportantEvents
     * @param {number} countyId
     * @returns {Event[]}
     */
  getImportantEvents(countyId: number): Promise<Event[]> {
    return axios.get("/importantEvents/" + countyId);
  }

    /**
     * GET /allEventsInCounty
     *
     * @method getAllEventsInOneCounty
     * @param countyId
     * @returns {Event[]}
     */
  getAllEventsInOneCounty(countyId: number): Promise<Object[]>{
    return axios.get("/allEventsInCounty/" + countyId);
  }//end method
    /**
     * POST /updateEvent
     *
     * @method updateEvent
     * @param {Event} event
     * @returns void
     */
  updateEvent(event: Object): Promise<void>{
    return axios.post("/updateEvent", event);
  }//end method
    /**
     * POST /deleteEvent/:eventId
     *
     * @method deleteEvent
     * @param {number} eventId
     * @returns void
     */
  deleteEvent(eventId: number): Promise<void>{
    return axios.post("/deleteEvent/" + eventId);
  }//end method
}//end class

/**
 *
 * @class ImageService
 *
 */
export class ImageService {

    /**
     * POST /upload
     *
     * @method uploadImage
     * @param {Object} image
     * @returns void
     */
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

    /**
     * GET /image/:imagePath
     *
     * @method getImage
     * @param {String}imagePath
     * @returns {Object} image
     */
  getImage(imagePath: string): Promise<JSON> {
    return axios.get("/image/" + imagePath);
  }
}

/**
 * Category: {categoryId: number, name: string, priority: number, active: number}
 * Category2: {categoryId: number, category2Id: number, name: string, priority: number, active: number}
 * Category3: {category2Id: number, category3Id: number, name: string, priority: number, active: number}
 *
 * @class CategoryService
 */
export class CategoryService {
    /**
     * PUT /category2/updateCategory2
     *
     * @method updateCategory2
     * @param {number} category2
     * @returns void
     */
  updateCategory2(category2: number): Promise<void> {
      return axios.put("/category2/updateCategory2", {cat2Id: category2}, {headers: authHeader()});
  }

    /**
     * PUT /category1/updateCategory1
     *
     * @method updateCategory1
     * @param {number} category1
     * @returns void
     */
  updateCategory1(category1: number): Promise<void> {
        return axios.put("/category1/updateCategory1", {cat1Id: category1}, {headers: authHeader()});
    }

    /**
     * PUT /category1/updateCategory2
     *
     * @method updateCategory2before1
     * @param {number} category1
     * @returns void
     */
  updateCategory2before1(category1: number): Promise<void>{
      return axios.put("/category1/updateCategory2", {cat1Id: category1}, {headers: authHeader()});
  }

    /**
     * GET /get_category1
     *
     * @method getCategory1
     * @returns {Category}
     */

  getCategory1(): Promise<Category[]> {
    return axios.get("/get_category1");
  }

    /**
     * GET /get_category2
     *
     * @method getCategory2
     * @returns {Category2}
     */

  getCategory2(): Promise<Category2[]> {
    return axios.get("/get_category2");
  }

    /**
     * GET /get_category3
     *
     * @method getCategory3
     * @returns {Category3}
     */

  getCategory3(): Promise<Category3[]> {
    return axios.get("/get_category3");
  }

    /**
     * GET /getOneCategory1/:id
     *
     * @method getOneCategory1
     * @param {number} id
     * @returns {Category}
     */

  getOneCategory1(id: number) {
    return axios.get("/getOneCategory1/" + id);
  } //end method

    /**
     * GET /getOneCategory2/:id
     *
     * @method getOneCategory2
     * @param {number} id
     * @returns {Category2}
     */

  getOneCategory2(id: number) {
    return axios.get("/getOneCategory2/" + id);
  } //end method

    /**
     * GET /getOneCategory3/:id
     *
     * @method getOneCategory3
     * @param {number} id
     * @returns {Category3}
     */

  getOneCategory3(id: number) {
    return axios.get("/getOneCategory3/" + id);
  } //end method

    /**
     * POST /add_CompanyCategories
     *
     * @method addCompanyCategories
     * @param {Object}
     * @returns void
     */

  addCompanyCategories(json: Object) {
    return axios.post("/add_CompanyCategories", json);
  }

    /**
     * POST /add_category1
     *
     * @method addCategory1
     * @param {Category} json
     * @returns void
     */
  addCategory1(json: Object) {
    return axios.post("/add_category1", json, { headers: authHeader() });
  }

    /**
     * POST /add_category2
     *
     * @method addCategory2
     * @param {Category2} json
     * @returns void
     */
  addCategory2(json: Object) {
    return axios.post("/add_category2", json, { headers: authHeader() });
  }

    /**
     * POST /add_category3
     *
     * @method addCategory3
     * @param {Category3} json
     * @returns void
     */

  addCategory3(json: Object) {
    return axios.post("/add_category3", json, { headers: authHeader() });
  }
} //end class

/**
 * Issue: {issueId: number, userMail: string, latitude: number, longitude: number, text: string, pic: string, date: string, statusName: string, categoryId: number, countyId: number, active: number}
 *
 * @class IssueService
 */
export class IssueService {

    /**
     * GET /getIssuesInThisCounty/:countyId
     *
     * @param {number} countyId
     * @param {number} categoryLevel
     * @returns {Issue[]}
     */
  getAllIssuesInThisCounty(
    countyId: number,
    categoryLevel: number
  ): Promise<Object[]> {
    return axios.get("/getIssuesInThisCounty/" + countyId, {
      categoryLevel: categoryLevel
    });
  } //end method
    /**
     * GET /oversiktOverSak/:issue
     *
     * @method getIssueAndCounty
     * @param {number} issue
     * @returns {Object[]}
     */
  getIssueAndCounty(issue: number): Promise<Object> {
    return axios.get('/oversiktOverSak/' + issue);
  } //end method
    /**
     * POST /sendIssueInProgressMail
     * POST /sendIssueCompleteMail
     * POST /updateStatusOneIssue
     *
     * @method updateStatusOneIssue
     * @param {number} id
     * @param {string} statusName
     * @param {Object} res
     * @returns void
     */
  updateStatusOneIssue(id: number, statusName: string, res: Object) {
    let mailObject = {
      to: res.userMail
    };

    if (statusName == "In progress" && res.inProgress == 1) {
      axios.post("/sendIssueInProgressMail", mailObject);
    }

    if (statusName == "Completed" && res.completed == 1) {
      axios.post("/sendIssueCompleteMail", mailObject);
    }

    return axios.post(
      "/updateStatusOneIssue",
      { statusName: statusName, id: id },
      { headers: authHeader() }
    );
  } //end method

    /**
     * POST /addIssueComments
     *
     * @method addCommentToIssue
     * @param {number} id
     * @param {string} text
     * @param {string} companyMail
     * @returns void
     */
  addCommentToIssue(id: number, text: string, companyMail: string) {
    return axios.post("/addIssueComments", {
      id: id,
      text: text,
      companyMail: companyMail
    });
  } //end method
    /**
     * GET /companyComments/:id
     *
     * @method getCompanyComments
     * @param {number} id
     * @returns {Object} comment
     */
  getCompanyComments(id: number) {
    return axios.get("/companyComments/" + id);
  } //end method

    /**
     * GET /Issues/:id
     *
     * @method getOneIssue
     * @param {number} id
     * @returns {Issue}
     */
  getOneIssue(id: number) {
    return axios.get("/Issues/" + id);
  } //end method

    /**
     * POST /deleteThisIssue/:id
     *
     * @method deleteThisIssue
     * @param {number} id
     * @returns void
     */

  deleteThisIssue(id: number): Promise<void> {
    return axios.post("/deleteThisIssue/" + id);
  } //end method
    /**
     * PUT /deleteIssue/:issueId
     *
     * @method deleteIssue
     * @param {number} issueId
     * @returns void
     */

  deleteIssue(issueId: number) {
    return axios.put("/deleteIssue/" + issueId);
  }

    /**
     * PUT /editIssue/:issueId
     * @param {number} issueId
     * @param {String} text
     * @returns void
     */

  editIssue(issueId: number, text: string) {
    return axios.put("/editIssue/" + issueId, { text: text });
  }
} //end class

/**
 * User: {mail: string, firstName: string, lastName: string, password: string, typeName: string, phone: string, points: number, countyId: number,active: number}
 * County: {countyId: number, name: string}
 *
 * @class CountyService
 */
export class CountyService {

    /**
     * GET /getCounties
     *
     * @method getCounties
     * @returns {County[]}
     */
  getCounties(): Promise<County[]> {
    return axios.get("/getCounties");
  }

    /**
     * POST /add_companyCounties
     *
     * @method addCompanyCounties
     * @param {County} json
     * @returns void
     */
  addCompanyCounties(json: Object) {
    return axios.post("/add_companyCounties", json);
  }

    /**
     * GET /getAllCountiesMinusUsers
     *
     * @method getAllCounties
     * @returns {County[]}
     */
  getAllCounties(): Promise<County[]> {
    return axios.get("/getAllCountiesMinusUsers", { headers: authHeader() });
  }

    /**
     * GET /getEmployeeData/:id
     *
     * @method getCountyEmployee
     * @param {number} id
     * @returns {User}
     */
  getCountyEmployee(id: number): Promise<Object[]> {
    return axios.get("/getEmployeeData/" + id);
  }

    /**
     * GET /getSubscribedCounties
     *
     * @method getUsersCounties
     * @returns {County[]}
     */
  getUsersCounties(): Promise<Object[]> {
    return axios.get("/getSubscribedCounties", { headers: authHeader() });
  }

    /**
     * DELETE /deleteAllSubscribedCounties
     *
     * @method deleteSubscription
     * @returns void
     */
  deleteSubscription() {
    return axios.delete("/deleteAllSubscribedCounties", {
      headers: authHeader()
    });
  }

    /**
     * POST /addSubscription
     *
     * @method addSubscription
     * @param {Object} json
     * @returns void
     */

  addSubscription(json: Object) {
    return axios.post("/addSubscription", json, { headers: authHeader() });
  }
}

/**
 * NotificationSetting{countyId: number, categoryId: number, userMail: string}
 * IssueNotificationSetting {userMail: string, registered: number, inProgress: number, completed: number}
 *
 * @class NotificationSettingsService
 */
export class NotificationSettingsService {
    /**
     * GET /get_notification_settings
     *
     * @method getNotificationSettings
     * @returns {NotificationSetting}
     */
  getNotificationSettings(): Promise<Object[]> {
    return axios.get("/get_notification_settings", { headers: authHeader() });
  }

    /**
     * DELETE /delete_notification_settings
     *
     * @method deleteNotificationSettings
     * @returns void
     */
  deleteNotificationSettings(): Promise<void> {
    return axios.delete("/delete_notification_settings", {
      headers: authHeader()
    });
  }

    /**
     * POST /add_notification_settings
     *
     * @method addNotificationSettings
     * @param {NotificationSetting} newSetting
     * @returns void
     */
  addNotificationSettings(newSetting: NotificationSetting): Promise<Response> {
    return axios.post("/add_notification_settings", newSetting, {
      headers: authHeader()
    });
  }

    /**
     * POST /add_issue_notification_settings
     *
     * @method addIssueNotificationSettings
     * @param {IssueNotificationSetting}newSetting
     * @returns void
     */
  addIssueNotificationSettings(
    newSetting: IssueNotificationSetting
  ): Promise<Response> {
    return axios.post("/add_issue_notification_settings", newSetting, {
      headers: authHeader()
    });
  }

    /**
     * GET /get_issue_notification_settings
     *
     * @method getIssueNotificationSettings
     * @returns {IssueNotificationSetting}
     */
  getIssueNotificationSettings(): Promise<Object[]> {
    return axios.get("/get_issue_notification_settings", {
      headers: authHeader()
    });
  }

    /**
     * GET /get_notification_settings_with_names
     *
     * @method getNotificationSettingsWithNames
     * @returns {Object[]}
     */
  getNotificationSettingsWithNames(): Promise<Object[]> {
    return axios.get("/get_notification_settings_with_names", {
      headers: authHeader()
    });
  }

    /**
     * PUT /update_issue_notification_settings
     *
     * @method updateIssueNotificationSettings
     * @param {IssueNotificationSetting} newSetting
     * @returns void
     */
  updateIssueNotificationSettings(
    newSetting: IssueNotificationSetting
  ): Promise<Response> {
    return axios.put("/update_issue_notification_settings", newSetting, {
      headers: authHeader()
    });
  }

    /**
     * GET /get_issue_notification_settins_from_user/:userMail
     *
     * @method getIssueNotificationSettingsFromUser
     * @param {string} userMail
     * @returns {IssueNotificationSetting[]}
     */
  getIssueNotificationSettingsFromUser(userMail: string): Promise<Object[]> {
    return axios.get("/get_issue_notification_settings_from_user/" + userMail);
  }

    /**
     * GET /get_users_with_notification_like_this/:countyId/:categoryId
     * @param {number} countyId
     * @param {number} categoryId
     * @returns {string[]}
     */
  getUsersWithNotificationsLikeThis(
    countyId: number,
    categoryId: number
  ): Promise<Object[]> {
    return axios.get(
      "/get_users_with_notifications_like_this/" + countyId + "/" + categoryId
    );
  }
}

/**
 * @class StatisticsService
 */
export class StatisticsService {
    /**
     * GET /issueCategories/:countyId
     *
     * @method getStatus
     * @param {number} countyId
     * @returns {number}
     */
  getStatus(countyId: number): Promise<Response>{
    return axios.get('/issueCategories/' + countyId)
  }

    /**
     * GET /issuesDaily/:countyId
     *
     * @method getDaily
     * @param {number} countyId
     * @returns {number}
     */
  getDaily(countyId: number): Promise<Response>{
    return axios.get('/issuesDaily/'+ countyId)
  }

    /**
     * GET /issueCategoriesAlCounties
     *
     * @method getStatusAllCounties
     * @returns {number}
     */
  getStatusAllCounties(): Promise<Response>{
    return axios.get('/issueCategoriesAllCounties/')
  }

    /**
     * GET /issuesDailyAllCounties
     *
     * @method getDailyAllCounties
     * @returns {number}
     */
  getDailyAllCounties(): Promise<Response>{
    return axios.get('/issuesDailyAllCounties/')
  }
}

/**
 * Event: {eventId: number, title: string, text: string, latitude: double, longitude: double, date: string, userMail: string, countyId: number, active: number}
 *
 * @class MailService
 */
export class MailService {
    /**
     * POST /sendTextMail
     *
     * @method sendTextMail
     * @param {Object} mailObject
     * @returns void
     */
  sendTextMail(mailObject: Object): Promise<Response> {
    return axios.post("/sendTextMail", mailObject);
  }

    /**
     * POST /sendResetPasswordMail
     *
     * @method sendResetPasswordMail
     * @param {String} to
     * @returns void
     */
  sendResetPasswordMail(to: string): Promise<Response> {
    return axios.post("/sendResetPasswordMail", to);
  }

    /**
     * POST /sendIssueCompeleteMail
     *
     * @method sendIssueCompleteMail
     * @param {String} to
     * @returns void
     */
  sendIssueCompleteMail(to: string): Promise<Response> {
    return axios.post("/sendIssueCompeleteMail", to);
  }

    /**
     * POST /sendEventMail
     *
     * @method sendEventMail
     * @param {String} to
     * @param {Event} event
     * @returns void
     */
  sendEventMail(to: [String], event: Event): Promise<Response> {
    return axios.post("/sendEventMail", { to: to, event: event });
  }
}

/**
 * User: {mail: string, firstName: string, lastName: string, password: string, typeName: string, phone: string, points: number, countyId: number,active: number}
 *
 * @class EmployeeService
 */
export class EmployeeService {
    /**
     * GET /getUsersInCount/:countyId
     *
     * @method getUsersInCounty
     * @param {number} countyId
     * @returns {User[]}
     */
  getUsersInCounty(countyId: number): Promise<Response> {
    return axios.get("/getUsersInCounty/" + countyId, {
      headers: authHeader()
    });
  }

    /**
     * PUT /blockUser/:mail
     *
     * @method blockUser
     * @param {String} mail
     * @returns void
     */
  blockUser(mail: string) {
    return axios.put("blockUser/" + mail);
  }

    /**
     * PUT /unblockUser/:mail
     *
     * @method unblockUser
     * @param {String} mail
     * @returns void
     */
  unblockUser(mail: string) {
    return axios.put("unblockUser/" + mail);
  }
}
