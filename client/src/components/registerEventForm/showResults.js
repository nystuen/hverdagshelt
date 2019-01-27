import { NotificationSettingsService, EventCategoryService } from '../../services';
import { MailService } from '../../services';
import { history } from '../../index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let notificationSettingsService = new NotificationSettingsService();
let eventCategoryService = new EventCategoryService();
let mailService = new MailService();

class FindDate {
  day;
  month;
  year;

  constructor() {
    var today = new Date();
    this.day = today.getDate();
    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();
  }
}

export default (async function showResults(values) {
  var day = new FindDate();
  await sleep(500); // simulate server latency
  let to = [];
  let error = '';


  let event = {
    title: values.title,
    text: values.text,
    latitude: values.latitude,
    longitude: values.longitude,
    date: day.day + '.' + day.month + '.' + day.year,
    userMail: values.userMail,
    eventCategoryId: values.categoryid,
    countyId: values.countyId
  };


  eventCategoryService.addEvent(event).then(res => {
    notificationSettingsService
      .getUsersWithNotificationsLikeThis(values.countyId, values.categoryid)
      .then(res => {
        to = res;
        mailService.sendEventMail(to, event).then(res => {
        });
      });
  })
    .catch(e => {
      error = 'error';
    })
    .finally(e => {
      if (!(error == 'error')) {
        history.push = function(s) {
        };
      }
    });

  history.push('/hendelser/' + values.countyId);
});
