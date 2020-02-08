const timetableMainDIV = document.querySelector(".main");
const timetableFilename = "klasse9e_2019.json";
const noAppointmentDIV = document.querySelector(".noAppointment");
const timetableHeaderDIV = document.querySelector(".header");
const loadTimetable = async name =>
  await (await fetch(`../timetables/${name}`)).json();
let timetable = loadTimetable(timetableFilename);
let date = new Date(
  "Sat Feb 05 2020 12:20:56 GMT+0100 (Central European Standard Time)"
);
console.log(date);
function updateTimetable() {
  timetable.then(timetable => {
    // clear timetableDIv
    document.querySelectorAll(".subject").forEach(e => e.remove());
    const plan = Object.entries(timetable.plan)[date.getDay() - 1];
    console.log(plan);
    // display used date
    timetableHeaderDIV.querySelector(
      ".date"
    ).textContent = `${date.getDate()}. ${date.toLocaleString("default", {
      month: "long"
    })}`;
    if (!plan) {
      noAppointmentDIV.hidden = false;
    } else {
      // display subjects
      plan[1].forEach((subjectName, i) => {
        // get informations
        const { teacher, room } = timetable.subjects.find(
          s => s.name === subjectName
        )
          ? timetable.subjects.find(s => s.name === subjectName)
          : { teacher: "", room: "" };
        const time = timetable.times[i];
        const subjectDIV = document.createElement("div");

        const is = function() {
          // set start time
          let startTime = new Date(
            date.setHours(time.start.slice(0, time.start.indexOf(":")))
          ).setMinutes(
            time.start.slice(time.start.indexOf(":") + 1, time.start.length)
          );
          // set end time
          let endTime = new Date(
            date.setHours(time.end.slice(0, time.end.indexOf(":")))
          ).setMinutes(
            time.end.slice(time.end.indexOf(":") + 1, time.end.length)
          );
          return (
            new Date(
              "Sat Feb 05 2020 12:20:56 GMT+0100 (Central European Standard Time)"
            ).getTime() <= startTime
          );
        };
        is() ? subjectDIV.classList.add("will") : "";
        // display subject
        subjectDIV.classList.add("subject");
        subjectDIV.innerHTML = `<span class="name">${subjectName}</span>
                                  <span class="info">${time.start}, ${teacher}${
          room === "Unbekannt" ? "" : `, Raum ${room}`
        }</span>`;
        timetableMainDIV.appendChild(subjectDIV);
      });
      noAppointmentDIV.hidden = true;
    }
  });
}
updateTimetable();

timetableHeaderDIV.querySelector(".last").addEventListener("click", function() {
  date.setDate(date.getDate() - 1);
  updateTimetable();
});
timetableHeaderDIV.querySelector(".next").addEventListener("click", function() {
  date.setDate(date.getDate() + 1);
  updateTimetable();
});
