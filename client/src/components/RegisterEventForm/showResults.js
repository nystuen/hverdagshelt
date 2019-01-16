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
  fetch("http://localhost:3000/add_event", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      title: values.title,
      text: values.text,
      latitude: values.latitude,
      longitude: values.longitude,
      date: day.day + "." + day.month + "." + day.year,
      userMail: values.userMail,
      eventCategoryId: values.categoryid,
      countyId: values.countyId
    })
  });
});
