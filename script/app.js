const timetableMainDIV = document.querySelector(".main");
const timetableFilename = "klasse9e_2019.json";
const noAppointmentDIV = document.querySelector(".noAppointment");
const timetableHeaderDIV = document.querySelector(".header");
const loadTimetable = async name =>
  await (await fetch(`../timetables/${name}`)).json();
let timetable = loadTimetable(timetableFilename);
let date = new Date();
function updateTimetable() {
  timetable.then(timetable => {
    // clear timetableDIv
    document.querySelectorAll(".subject").forEach(e => e.remove());
    const plan = Object.entries(timetable.plan)[date.getDay() - 1];
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
      plan[1].forEach(subjectName => {
        const teacher = timetable.subjects.find(s => s.name === subjectName)?.teacher || "";
        const subjectDIV = document.createElement("div");
        subjectDIV.classList.add("subject");
        subjectDIV.innerHTML = `<span class="name">${subjectName}</span>
                                  <span class="info">${teacher}</span>`;
        timetableMainDIV.appendChild(subjectDIV);
      });
      noAppointmentDIV.hidden = true;
    }
  });
}
updateTimetable();

timetableHeaderDIV.querySelector(".last").addEventListener("click", function(){
  date.setDate(date.getDate()-1)
  updateTimetable()
})
timetableHeaderDIV.querySelector(".next").addEventListener("click", function(){
  date.setDate(date.getDate()+1)
  updateTimetable()
})