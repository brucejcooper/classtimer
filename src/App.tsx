import React, { useEffect, useState } from 'react';
import './App.css';
import 'react-clock/dist/Clock.css';
import * as ReactSound from 'react-sound';

const Sound = ReactSound.default;

function timeToMinutes(hour: number, minute: number) {
  return hour * 60 + minute
}

interface ScheduleEntry {
  name: string;
  warningTime?: number;
  start: number, // Stored as a number of minutes past the start of the day, in local time zone..  e.g. 9 * 60 + 30
  duration: number
}

interface ScheduleOverride {
  day: string;
  schedule: ScheduleEntry[];
}

interface Schedule {
  standard: ScheduleEntry[][];
  overrides: ScheduleOverride[];
}


const schedule: Schedule = {
  standard: [
    // Monday
    [
      {
        name: "Period 1",
        start: timeToMinutes(8, 45),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 2",
        start: timeToMinutes(9, 49),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Recess",
        start: timeToMinutes(10, 53),
        duration: 21,
      },
      {
        name: "Period 3",
        start: timeToMinutes(11, 14),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 4",
        start: timeToMinutes(12, 18),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Lunch",
        start: timeToMinutes(13, 22),
        duration: 29,
      },
      {
        name: "Period 5",
        start: timeToMinutes(13, 51),
        duration: 64,
        warningTime: 6,
      },
    ],
    // Tuesday
    [
      {
        name: "Period 1",
        start: timeToMinutes(9, 2),
        duration: 61,
        warningTime: 6,
      },
      {
        name: "Period 2",
        start: timeToMinutes(10, 3),
        duration: 61,
        warningTime: 6,
      },
      {
        name: "Recess",
        start: timeToMinutes(11, 4),
        duration: 20,
      },
      {
        name: "Period 3",
        start: timeToMinutes(11, 24),
        duration: 61,
        warningTime: 6,
      },
      {
        name: "Period 4",
        start: timeToMinutes(12, 25),
        duration: 61,
        warningTime: 6,
      },
      {
        name: "Lunch",
        start: timeToMinutes(13, 26),
        duration: 28,
      },
      {
        name: "Period 5",
        start: timeToMinutes(13, 54),
        duration: 61,
        warningTime: 6,
      },
    ],
    // Wednesday
    [
      {
        name: "Period 1",
        start: timeToMinutes(8, 45),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 2",
        start: timeToMinutes(9, 49),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Recess",
        start: timeToMinutes(10, 53),
        duration: 21,
      },
      {
        name: "Period 3",
        start: timeToMinutes(11, 14),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 4",
        start: timeToMinutes(12, 18),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Lunch",
        start: timeToMinutes(13, 22),
        duration: 29,
      },
      {
        name: "Period 5",
        start: timeToMinutes(13, 51),
        duration: 64,
        warningTime: 6,
      },
    ],
    // Thursday
    [
      {
        name: "Period 1",
        start: timeToMinutes(8, 45),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 2",
        start: timeToMinutes(9, 49),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Recess",
        start: timeToMinutes(10, 53),
        duration: 21,
      },
      {
        name: "Period 3",
        start: timeToMinutes(11, 14),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 4",
        start: timeToMinutes(12, 18),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Lunch",
        start: timeToMinutes(13, 22),
        duration: 29,
      },
      {
        name: "Period 5",
        start: timeToMinutes(13, 51),
        duration: 64,
        warningTime: 6,
      },
    ],
    // Friday
    [
      {
        name: "Period 1",
        start: timeToMinutes(8, 45),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 2",
        start: timeToMinutes(9, 49),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Recess",
        start: timeToMinutes(10, 53),
        duration: 26,
      },
      {
        name: "Period 3",
        start: timeToMinutes(11, 19),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Period 4",
        start: timeToMinutes(12, 23),
        duration: 64,
        warningTime: 6,
      },
      {
        name: "Lunch",
        start: timeToMinutes(13, 27),
        duration: 24,
      },
      {
        name: "Period 5",
        start: timeToMinutes(13, 51),
        duration: 64,
        warningTime: 6,
      },
    ],
    // Saturday
    [],

    // Sunday
    [],
  ],
  overrides: [],
}


interface ScheduleEntryViewProps {
  hourMin: number;
  entry?: ScheduleEntry;
}

function ScheduleEntryView(props: ScheduleEntryViewProps) {
  if (!props.entry) {
    return (
      <NoCurrentPeriod/>
    )
  }

  const periodEnd = props.entry.start + props.entry.duration;
  const cleanupTime = periodEnd - (props.entry.warningTime||0);

  if (props.hourMin >= cleanupTime) {
    return <InCleanup {...props}/>
  } else {
    return <InPeriod {...props}/>
  }
}

function InCleanup(props: ScheduleEntryViewProps) {
  if (!props.entry) {
    return <div>Logic error in code</div>
  }
  const minutesLeft = (props.entry.start + props.entry.duration) - props.hourMin;



  return (
    <div className="cleanup">
      <audio autoPlay>
        <source src="horn.wav" type="audio/wav"/>
      </audio> 

      <div className="cleanupWarning">
        Its clean up time! &#x1f9f9;
      </div>
      <div className="minutesLeft">{minutesLeft} min</div>
      left in period
    </div>
  )
}

function InPeriod(props: ScheduleEntryViewProps) {
  if (!props.entry) {
    return <div>Logic error in code</div>
  }
  const minutesLeft = (props.entry.start + props.entry.duration - (props.entry.warningTime||0)) - props.hourMin;
  return (
    <div className="inPeriod">
      <div className="minutesLeft">{minutesLeft} min</div>
      left until cleanup &#x1f9f9;
    </div>
  )

}

function NoCurrentPeriod() {
  return <div className="noperiod">
    No class is currently in progress.
  </div>
}


interface ClockProps {
  value: Date
  currentPeriod?: ScheduleEntry;
}

function minuteToPos(minute: number, cx: number, cy: number, radius: number) {
  const angle = (360 * (minute / 60)) % 360;
  return `${cx + radius * Math.sin(Math.PI*angle/180)} ${cy - radius * Math.cos(Math.PI*angle/180)}`
}

function makePieArc(startMinute: number, endMinute: number, className: string) {
  const arc = 
  `M 20 20 
   L ${minuteToPos(startMinute, 20, 20, 18.5)}
   A 18.5 18.5, 0, ${endMinute-startMinute > 30 ? 1 : 0} 1, ${minuteToPos(endMinute, 20, 20, 18.5)}
   L 20 20
   Z`
  return (
    <path key={className} d={arc} className={className}/>
  )

}


function Clock(props: ClockProps) {
  const ticks: JSX.Element[] = [];
  for (let i = 0; i < 12; i++) {
    ticks.push(<line key={i} x1={37} y1={20} x2={39} y2={20} className="tick" transform={`rotate(${i*(360/12)}, 20, 20)`}/>);
  }

  const secondsSinceDayStart = props.value.getSeconds() + (props.value.getMinutes()*60) + (props.value.getHours()*60*60)
  const hourAngle = 360 * secondsSinceDayStart / (60*60*12);
  const minuteAngle = 360 * secondsSinceDayStart / (60*60);
  const secondAngle = 360 * secondsSinceDayStart / 60;


  const warningTime = props.currentPeriod ? props.currentPeriod.start + props.currentPeriod.duration-(props.currentPeriod.warningTime||0) : 0;
  const periodEnd = props.currentPeriod ? props.currentPeriod.start + props.currentPeriod.duration : 0;
  const nowMinutes = secondsSinceDayStart/60;

  const arcs: JSX.Element[] = props.currentPeriod ? 
    nowMinutes >= warningTime ? 
    [ 
      makePieArc(nowMinutes, periodEnd, "cleanuptime")
    ] 
    :    
    [
      makePieArc(nowMinutes, warningTime, "periodtime"),
      makePieArc(warningTime, periodEnd, "cleanuptime")
    ] 
    :
    [];


  return (
    <div className="clock"> 
      <svg viewBox="0 0 40 40">
        <circle cx={20} cy={20} r={19} className="clockface"/>;
        {arcs}
        {ticks}

        <line x1={20} y1={20} x2={20} y2={2} className="hand" transform={`rotate(${minuteAngle}, 20, 20)` }/>
        <line x1={20} y1={20} x2={20} y2={10} className="hand" transform={`rotate(${hourAngle}, 20, 20)` }/>
        <circle cx={20} cy={20} r={1} className="centerpin"/>;
        <line x1={20} y1={20} x2={20} y2={2} className="secondhand" transform={`rotate(${secondAngle}, 20, 20)` }/>
      </svg>
    </div>
  );
}



function App() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => { clearInterval(interval); }
  }, []);


  const weekday = (now.getDay() + 6) % 7; // The return of weekday is 0 index based on Sunday being the first day, but we use Monday.
  const hourAndMin = now.getHours() * 60 + now.getMinutes();
  const daySchedule = schedule.standard[weekday]; // TODO determine if overrides are needed.
  const currentPeriod = daySchedule.find((e) => hourAndMin >= e.start && hourAndMin < (e.start + e.duration))

  return (
    <div className="App">
      <header className="App-header centered">
        <h1>{currentPeriod ? currentPeriod.name : "School's out!"}</h1>
      </header>
      <div className="mainbody padded centered">
          <Clock value={now} currentPeriod={currentPeriod}/>          
          <div className="currentSchedule">
            <ScheduleEntryView hourMin={hourAndMin} entry={currentPeriod}/>
          </div>
      </div>
    </div>
  );
}

export default App;
