import React from "react";
import TIMETABLE from "../public/stundenplan.json" with { type: "json" };
import SubjectItem from "./SubjectItem";

const DATE_FORMAT = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  month: "long",
  day: "2-digit",
});

const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

export default function App() {
  const [activeDate, changeDate] = React.useReducer(
    (date, type: "increment" | "decrement") => {
      const newDateTime =
        date.getTime() + (type === "increment" ? 1 : -1) * 86_400_000; // ±24h;
      return new Date(newDateTime);
    },
    new Date(),
  );

  return (
    <main className="w-screen h-screen grid grid-rows-[auto_1fr_auto] gap-8 p-4">
      <nav className="flex justify-between items-center rounded bg-indigo-500 gap-2 overflow-hidden text-white">
        <button
          type="button"
          className="active:bg-indigo-200 active:text-gray-900 transition w-8 h-full grid place-items-center"
          onClick={() => changeDate("decrement")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Left Chevron</title>
            <path
              d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <h1 className="font-bold text-lg truncate py-2">
          {DATE_FORMAT.format(activeDate)}
        </h1>

        <button
          type="button"
          className="focus:bg-indigo-200 focus:text-gray-900 transition w-8 h-full grid place-items-center"
          onClick={() => changeDate("increment")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Right Chevron</title>
            <path
              d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </nav>

      <ol className="space-y-4 overflow-y-auto overflow-x-hidden">
        {TIMETABLE.plan[WEEKDAYS[activeDate.getDay() - 1]]?.map((name, idx) => (
          <SubjectItem
            key={`${name}-${idx.toString()}`}
            activeDate={activeDate}
            idx={idx}
          />
        )) || <SubjectItem activeDate={activeDate} idx={-1} />}
      </ol>

      <footer className="flex overflow-hidden gap-2 items-center justify-between p-2 text-white bg-indigo-500 rounded">
        <h1 className="font-bold text-lg mx-auto truncate">{TIMETABLE.name}</h1>
      </footer>
    </main>
  );
}
