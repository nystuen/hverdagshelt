const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
  await sleep(500); // simulate server latency
  window.alert("You submitted: " + JSON.stringify(values));
  fetch("http://localhost:3000/add_issue", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      userMail: values.userMail,
      latitude: values.latitude,
      longitude: values.longitude,
      text: values.text,
      pic: values.pic,
      date: values.date,
      statusName: "Registered",
      categoryId: values.categoryId,
      categoryLevel: values.categoryLevel,
      countyId: values.countyId
    })
  });
});
