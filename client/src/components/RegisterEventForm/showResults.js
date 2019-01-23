import { NotificationSettingsService } from '../../services';
import { MailService } from '../../services';
import { history } from '../../index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let notificationSettingsService = new NotificationSettingsService();
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

  fetch('http://localhost:3000/add_event', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      title: values.title,
      text: values.text,
      latitude: values.latitude,
      longitude: values.longitude,
      date: day.day + '.' + day.month + '.' + day.year,
      userMail: values.userMail,
      eventCategoryId: values.categoryid,
      countyId: values.countyId
    })
  }).then(res => {
    notificationSettingsService.getUsersWithNotificationsLikeThis(values.countyId, values.categoryid).then(res => {
      to = res;

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

      console.log('event: ', event);
      console.log('recipients: ', to);

      mailService.sendEventMail(to, event).then(res => {

        console.log('eventMail:', res);

        history.push('/events/' + values.countyId)
      });

    });
  });




});
