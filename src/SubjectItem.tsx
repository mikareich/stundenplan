import TIMETABLE from "../public/stundenplan.json" with { type: "json" };

const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

export default function SubjectItem({
  activeDate,
  idx,
}: {
  activeDate: Date;
  idx: number;
}) {
  const subjectName =
    TIMETABLE.plan[WEEKDAYS[activeDate.getDay() - 1]]?.at(idx) || null;

  const subject =
    TIMETABLE.subjects.find((subject) => subject.name === subjectName) || null;

  const slot = TIMETABLE.times[idx] || null;

  return (
    <li className="w-full px-4 py-2 rounded border bg-indigo-100/50 backdrop-blur-2xl border-gray-400 space-y-1">
      <h2 className="font-bold text-lg text-gray-900 leading-none truncate">
        {subject?.name || "No Appointment"}
      </h2>

      <p className="text-sm text-gray-500 leading-none truncate">
        {[
          slot?.start,
          subject?.teacher,
          subject?.room ? `Raum ${subject.room}` : undefined,
        ]
          .filter((n) => n)
          .join(", ")}
      </p>
    </li>
  );
}
