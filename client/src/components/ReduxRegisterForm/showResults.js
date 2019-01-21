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
  fetch("http://localhost:3000/add_issue", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      userMail: values.userMail,
      latitude: values.latitude,
      longitude: values.longitude,
      address: values.address,
      text: values.text,
      pic: values.imagePath,
      date: day.day + "." + day.month + "." + day.year,
      statusName: "Registered",
      categoryId: values.categoryid,
      categoryLevel: values.categorylevel,
      countyId: values.countyId,
    })
  });

  fetch("http://localhost:3000/sendIssueRegistratedMail", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      to: values.userMail
    })
  });



});
