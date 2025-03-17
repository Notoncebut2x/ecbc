import { CalendarEvents } from '@/types/calendar';

// To add a new event:
// 1. Copy an existing event block
// 2. Increment the id number
// 3. Update the title, date, location, and optional fields (time, link)
// 4. Date format should be: YYYY-MM-DD
// 5. Time is optional and can be in any readable format like "9:00 AM"
// 6. Link is optional and should be a full URL (including https://)
// 7. Frequency must be either 'annual', 'monthly', or 'weekly'
// 8. For monthly/weekly events, add recurringPattern with dayOfWeek (0-6, Sun-Sat)
//    and weekOfMonth ('first', 'second', 'third', 'fourth', 'last') for monthly events

export const events: CalendarEvents = [
  {
    id: '1',
    title: 'Saint Ratricks Day',
    date: '2025-03-15',
    location: 'Chicago, Illinois',
    link: 'https://www.instagram.com/rat.patrol.chicago',
    frequency: 'annual'
  },
  {
    id: '2',
    title: 'DC Bike Polo Presents: Thaw XI',
    date: '2025-04-18',
    location: 'Frederick, Maryland',
    link: 'https://www.instagram.com/dcbikepolo',
    frequency: 'annual'
  },
  {
    id: '3',
    title: 'Bike Kill',
    date: '2024-10-31',
    location: 'New York, New York',
    link: '',
    frequency: 'annual'
  },
  {
    id: '4',
    title: 'Gravel Rat',
    date: '2024-10-12',
    location: 'Baltimore, Maryland',
    link: 'https://www.instagram.com/gravelratrace/',
    frequency: 'annual'
  },
  {
    id: '5',
    title: 'Warriors Bike Ride',
    date: '2024-07-06',
    location: 'New York, New York',
    link: 'https://www.instagram.com/warriorsnyc',
    frequency: 'annual'
  },
  {
    id: '6',
    title: 'PsycleSwap',
    date: '2025-04-05',
    location: 'Baltimore, Maryland',
    link: 'https://www.instagram.com/psyclescape',
    frequency: 'annual'
  },
  { 
    id: '7',
    title: 'PsycleScape',
    date: '2025-09-29',
    location: 'Baltimore, Maryland',
    link: 'https://www.instagram.com/psyclescape',
    frequency: 'annual'
  },
  {
    id: '8',
    title: 'Baltimore Bike Party',
    date: '2025-03-28',
    location: 'Baltimore, Maryland',
    link: 'https://www.instagram.com/baltimorebikeparty',
    frequency: 'monthly',
    recurringPattern: {
      dayOfWeek: 5,  // Friday
      weekOfMonth: 'last'  // Last Friday of the month
    }
  },
  {
    id: '9',
    title: 'Taco Tuesday Ride',
    date: '2025-04-25',
    location: 'Baltimore, Maryland',
    link: 'https://www.facebook.com/groups/310740799305361',
    frequency: 'weekly',
    recurringPattern: {
      dayOfWeek: 2  // Tuesday
    }
  },
  {
      id: '10',
      title: 'DC Bike Party',
      date: '2025-03-12',
      location: 'Washington, DC',
      link: 'http://dcbikeparty.com/',
      frequency: 'monthly',
      recurringPattern: {
          dayOfWeek: 3, // Wednesday
          weekOfMonth: 'second' // Second Wednesday of the month
      },
  },
  {
    id: '11',
    title: 'Broad Street Bullies',
    date: '2025-04-01',
    location: 'Richmond, Virginia',
    link: 'https://www.instagram.com/broadstreetbullies804',
    frequency: 'weekly',
    recurringPattern: {
      dayOfWeek: 4  // Thursday
    }
  },
  ,
  {
    id: '12',
    title: 'Dirt Rooster Gravel Ride',
    date: '2025-03-23',
    location: 'Baltimore, Maryland',
    link: 'https://www.instagram.com/p/DHMGShDsr80/',
    frequency: 'annual'
  }
  
  // Add new events here following this format:
  // {
  //   id: '10',  // increment this number
  //   title: 'Your Event Name',
  //   date: '2024-MM-DD',  // use YYYY-MM-DD format
  //   location: 'City, State',
  //   time: '10:00 AM',  // optional
  //   link: 'https://...',  // optional, full URL to event page
  //   frequency: 'annual'  // must be 'annual', 'monthly', or 'weekly'
  // }
]; 