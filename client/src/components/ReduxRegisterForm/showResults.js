import {UserService, NotificationSettingsService, IssueService, MailService} from '../../services';
import { history } from '../../index';

let notificationSettingsService = new NotificationSettingsService();
let userService = new UserService();
let issuesService = new IssueService();
let mailService = new MailService();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
  let day = new FindDate();
  await sleep(500); // simulate server latency

  let issuesRegistered = -1;
  await userService.getMyIssues()
      .then(r => {
        r.map(e => {
          if(e.statusName === 'Registered') {
            issuesRegistered++;
          }
        })
      });

  if (issuesRegistered < 15) {

      let theBody = {
          userMail: values.userMail,
          latitude: values.latitude,
          longitude: values.longitude,
          address: values.address,
          text: values.text,
          pic: values.imagePath,
          date: day.day + '.' + day.month + '.' + day.year,
          statusName: 'Registered',
          categoryId: values.categoryid,
          categoryLevel: values.categorylevel,
          countyId: values.countyId
      };

      await issuesService.addIssue(theBody)
          .then(res => {
              notificationSettingsService.getIssueNotificationSettingsFromUser(values.userMail).then(res => {
                  if (res[0].registered === 1) {

                      mailService.sendIssueRegisteredMail()
                          .catch(err => {
                              alert("Feil: " + err.message)
                          })
                  }
              })
          });

      /*
      await fetch('http://localhost:3000/add_issue', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
              userMail: values.userMail,
              latitude: values.latitude,
              longitude: values.longitude,
              address: values.address,
              text: values.text,
              pic: values.imagePath,
              date: day.day + '.' + day.month + '.' + day.year,
              statusName: 'Registered',
              categoryId: values.categoryid,
              categoryLevel: values.categorylevel,
              countyId: values.countyId
          })
      }).then(res => {
          notifiationSettingsService.getIssueNotificationSettingsFromUser(values.userMail).then(res => {
              if (res[0].registered == 1) {

                  fetch('http://localhost:3000/sendIssueRegistratedMail', {
                      method: 'POST',
                      headers: {
                          'Content-type': 'application/json; charset=utf-8'
                      },
                      body: JSON.stringify({
                          to: values.userMail
                      })
                  });
              }
          }).then(res => {

          });
      });

      */

      window.location.href="/#min_side/mine_saker";
      //history.push("min_side/mine_saker");
  } else {
    confirm('Du kan kun ha 15 ubehandlede saker inne om gangen. Vennligst vent til en av sakene dine har endret status til "under behandling"');
  }

});
