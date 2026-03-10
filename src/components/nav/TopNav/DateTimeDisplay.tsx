// components/nav/TopNav/DateTimeDisplay.tsx
interface DateTimeDisplayProps {
  dateTime?: Date;
}

export default function DateTimeDisplay({ dateTime = new Date() }: DateTimeDisplayProps) {
  const safeDate = dateTime instanceof Date && !isNaN(dateTime.getTime()) 
    ? dateTime 
    : new Date();
  
  // Format: "Wed, Sep 13, 2023 - 17:57"
  const datePart = safeDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).replace(',', '');
  
  // Get hours and minutes for each timezone
  const baseTime = safeDate;
  
  // SGT/HKT (UTC+8) - same time
  const utc8Time = baseTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Singapore'
  });
  
  // JST (UTC+9)
  const jstTime = baseTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Tokyo'
  });
  
  const timezones = [
    { code: 'SGT', time: utc8Time, offset: '+8' },
    { code: 'HKT', time: utc8Time, offset: '+8' },
    { code: 'JST', time: jstTime, offset: '+9' }
  ];
  
  return (
    <p className="flex flex-row nav-middle-text m-0 text-sm">
      <span className="date-part">{datePart}</span>
      <span className="separator"></span>
      
      {timezones.map((tz, index) => (
        <span key={tz.code} className="timezone-item flex flex-row">
          <span className="time">{tz.time}</span>
          <span className="code ml-1">{tz.code}</span>
          <span className="offset text-gray-400 ml-1">(UTC{tz.offset})</span>
          {index < timezones.length - 1 && (
            <span className="separator"></span>
          )}
        </span>
      ))}
    </p>
  );
}