const timetableMainDIV = document.querySelector(".main");
const timetableFilename = "klasse9e_2019.json";
const loadTimetable = async name =>
  await (await fetch(`../timetables/${name}`)).json();
let timetable = loadTimetable(timetableFilename);
let date = new Date();

function updateTimetable() {
  timetable.then(timetable => {
    timetableMainDIV.innerHTML = ""
  });
}
updateTimetable();
