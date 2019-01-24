import { NotificationSettingsService } from '../../services';
import { history } from '../../index';

let notifiationSettingsService = new NotificationSettingsService();
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
    var day = new FindDate();
    await sleep(500); // simulate server latency
    fetch('http://localhost:3000/add_issue', {
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
    })


    history.push("/min_side/mine_saker")

});
