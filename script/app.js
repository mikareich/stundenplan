const stundenplaene = [
  {
    filename: "klasse9e_2019.json",
    name: "Klasse 9e"
  },
  {
    filename: "klasse9e_2019.json",
    name: "Klasse 9b"
  }
];

const colors = [
  "#ef9a9a",
  "#f48fb1",
  "#ce93d8",
  "#b39ddb",
  "#9fa8da",
  "#90caf9",
  "#81d4fa",
  "#80deea",
  "#80cbc4",
  "#a5d6a7",
  "#c5e1a5",
  "#e6ee9c",
  "#fff59d",
  "#ffe082",
  "#ffcc80",
  "#ffab91",
  "#bcaaa4",
  "#eeeeee",
  "#b0bec5"
];

function openPlan(filename, callback) {
  fetch(`./stundenplaene/${filename}`)
    .then(res => res.json())
    .catch(err => callback(err))
    .then(data => callback(data));
}
const stundenplaeneSelect = document.getElementById("stundenplanSelect");
const stundenplannameElements = document.querySelectorAll("#stundenplanname");
const stundenplanTable = document.querySelector("table>tbody");
const statusDiv = document.getElementById("status")
if (stundenplaene.length !== 0) {
  stundenplaeneSelect.removeAttribute("hidden");
  stundenplaene.forEach((plan, index) => {
    let option = document.createElement("option");
    option.innerText = plan.name;
    option.value = index;
    stundenplaeneSelect.appendChild(option);
  });
}

var x = (function(e) {
  let stundenplan = stundenplaene[0];
  openPlan(stundenplan.filename, stundenplan => {
    stundenplannameElements.forEach(e => (e.textContent = stundenplan.name));
    stundenplan.times.forEach((time, index) => {
      let tr = document.createElement("tr");
      let timeElement = document.createElement("td");
      timeElement.textContent = `${time.start} - ${time.end}`;
      tr.appendChild(timeElement);
      Object.entries(stundenplan.plan).forEach(entry => {
        let faecher = entry[1];
        let day = entry[0];
        let fach = stundenplan.faecher.filter(
          fach => fach.name === faecher[index]
        )[0] || { name: "Freistunde", lehrer: "" };
        let tdFach = document.createElement("td");
        tdFach.textContent = fach.name;
        tdFach.title = fach.lehrer;
        tdFach.style.background =
          colors[stundenplan.faecher.indexOf(fach)] || "#b0bec5";

        let { start, end } = time;
        let timeNow = 500;
        let dayIndexNow = new Date().getDay();
        let hours = {
          start: parseInt(start.split(":")[0]),
          end: parseInt(end.split(":")[0])
        };
        let minutes = {
          start: parseInt(start.split(":")[1]) + 60 * hours.start,
          end: parseInt(end.split(":")[1]) + 60 * hours.end
        };
        if (
          timeNow >= minutes.start &&
          timeNow <= minutes.end &&
          Object.keys(stundenplan.plan)[dayIndexNow] === day
        ) {
          statusDiv.textContent = `${fach.name}/ ${fach.lehrer}`
          tdFach.classList.add("current");
        }

        tr.appendChild(tdFach);
      });
      stundenplanTable.appendChild(tr);
    });
  });
})();
