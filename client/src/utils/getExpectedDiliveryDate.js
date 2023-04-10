export default function getExpectedDeliveryDate(day) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (day - currentDate.getDay()));
    
    // Check if target day has already passed in the current week
    if (targetDate < currentDate) {
      targetDate.setDate(targetDate.getDate() + 7);
    }
    
    const targetDayOfWeek = daysOfWeek[targetDate.getDay()];
    const targetDateString = targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    return `${targetDayOfWeek}, ${targetDateString}`;
  }
  
  
  