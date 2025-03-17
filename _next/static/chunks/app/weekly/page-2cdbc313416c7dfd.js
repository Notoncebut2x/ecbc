(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[499],{5574:function(e,t,n){Promise.resolve().then(n.bind(n,8893))},8893:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(7437),a=n(8476),l=n(3336),i=n(2265);function c(){let[e,t]=(0,i.useState)(null),n=Array.from(new Set(a.U.filter(e=>"weekly"===e.frequency).map(e=>e.location))).sort();return(0,r.jsx)("main",{className:"min-h-screen p-8",children:(0,r.jsxs)("div",{className:"w-full max-w-2xl mx-auto text-lg font-['Courier_New']",children:[(0,r.jsx)("h1",{className:"text-center mb-4 text-[1.75rem] font-bold",children:(0,r.jsx)("a",{href:"/",className:"cursor-pointer hover:opacity-80",children:"East Coast ⚡ Bike Calendar"})}),(0,r.jsxs)("div",{className:"text-center space-y-2 mb-4",children:[(0,r.jsxs)("div",{className:"space-x-4",children:[(0,r.jsx)("a",{href:"/",className:"px-2",children:"All"}),(0,r.jsx)("a",{href:"/annual",className:"px-2",children:"Annual"}),(0,r.jsx)("a",{href:"/monthly",className:"px-2",children:"Monthly"}),(0,r.jsx)("a",{href:"/weekly",className:"px-2 font-bold underline",children:"Weekly"})]}),(0,r.jsx)("div",{className:"space-x-4",children:n.map(n=>(0,r.jsx)("button",{onClick:()=>t(n===e?null:n),className:"px-2 ".concat(e===n?"font-bold underline":""),children:n.split(",")[0]},n))})]}),(0,r.jsx)("div",{children:(0,r.jsx)("pre",{className:"text-center mb-8 select-none text-[0.5rem] leading-[0.5rem]",children:"   \\  /   \\  /   \\  /   \\  /   \\  /  \n---///----///----///----///----///---\n  /  \\   /  \\   /  \\   /  \\   /  \\  "})}),(0,r.jsx)(l.Z,{events:a.U,selectedLocation:e,selectedFrequency:"weekly",onReset:()=>t(null)})]})})}},3336:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var r=n(7437),a=n(2265),l=n(3070),i=n(3993),c=n(9121),s=n(7742),o=n(5341),u=n(5902),d=n(1091),f=n(6115);function y(e,t){if(!(t instanceof Date&&!isNaN(t.getTime())))return null;if("annual"===e.frequency)return new Date(e.date);let n=new Date(t),r=n.getFullYear(),a=n.getMonth();if("monthly"===e.frequency&&e.recurringPattern){let t=e.recurringPattern.dayOfWeek,n=e.recurringPattern.weekOfMonth,u=(0,l.N)(new Date(r,a));for(;(0,i.w)(u)!==t;)u=(0,c.E)(u,1);if(n){if("last"===n)for(u=(0,s.V)(new Date(r,a));(0,i.w)(u)!==t;)u=(0,o.k)(u,1);else{let e={first:0,second:1,third:2,fourth:3};n in e&&(u=(0,c.E)(u,7*e[n]))}}return u}if("weekly"===e.frequency&&e.recurringPattern){let l=new Date(r,a,n.getDate()),s=e.recurringPattern.dayOfWeek,o=(0,i.w)(l);return(l=(0,c.E)(l,s-o))<t&&(l=(0,c.E)(l,7)),l}return null}function m(e){let{events:t,selectedLocation:n,selectedFrequency:l,onReset:i}=e,s=(0,a.useMemo)(()=>{let e=new Date;return e.setHours(0,0,0,0),e},[]),f=(0,a.useMemo)(()=>t.filter(e=>{let t=!n||e.location===n,r=!l||e.frequency===l;return t&&r}).flatMap(e=>{if("annual"===e.frequency)return[{...e,displayDate:new Date(e.date),isRecurring:!1}];let t=[],n=y(e,s),r=function(e,t){let n=y(e,t);return n?"monthly"===e.frequency?(0,u.W)(n,1):"weekly"===e.frequency?(0,o.k)(n,7):null:null}(e,s),a=function(e,t){let n=y(e,t);return n?"monthly"===e.frequency?(0,d.z)(n,1):"weekly"===e.frequency?(0,c.E)(n,7):null:null}(e,s);return r&&t.push({...e,displayDate:r,isRecurring:!0,occurrenceType:"previous"}),n&&t.push({...e,displayDate:n,isRecurring:!0,occurrenceType:"current"}),a&&t.push({...e,displayDate:a,isRecurring:!0,occurrenceType:"next"}),t}),[t,n,l,s]),{sortedEvents:m,nextUpcomingEvent:h}=(0,a.useMemo)(()=>{let[e,t]=f.reduce((e,t)=>(e[t.displayDate>=s?0:1].push(t),e),[[],[]]);return{sortedEvents:[...e.sort((e,t)=>e.displayDate.getTime()-t.displayDate.getTime()),...t.sort((e,t)=>t.displayDate.getTime()-e.displayDate.getTime())],nextUpcomingEvent:e[0]||null}},[f,s]);return(0,r.jsx)("div",{className:"w-full max-w-2xl mx-auto text-lg font-['Courier_New']",children:(0,r.jsx)("ul",{className:"list-none p-0 space-y-4",children:m.map(e=>{let t=e.displayDate<s,n=h&&e.displayDate.getTime()===h.displayDate.getTime()&&e.id===h.id;return(0,r.jsx)(p,{event:e,isPast:t,isNextUpcoming:n},"".concat(e.id,"-").concat(e.occurrenceType||"single"))})})})}let p=(0,a.memo)(function(e){let{event:t,isPast:n,isNextUpcoming:a}=e;return(0,r.jsxs)("li",{className:"transition-all duration-300 relative ".concat(n?"text-gray-400":"text-black"," ").concat(a?'after:content-[""] after:absolute after:left-[20%] after:right-[20%] after:bottom-0 after:h-[3px] after:bg-red-500/80 after:rotate-[358deg] after:-z-10':""),children:[(0,f.WU)(t.displayDate,"MMMM d, yyyy"),": ",t.link?(0,r.jsx)("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:"rotate-hover ".concat(n?"text-red-300 hover:text-red-400":"text-red-500 hover:text-red-600"),children:t.title}):t.title,(0,r.jsx)("br",{}),(0,r.jsx)("span",{className:"text-[0.75em]",children:t.location})]})})},8476:function(e,t,n){"use strict";n.d(t,{U:function(){return r}});let r=[{id:"1",title:"Saint Ratricks Day",date:"2025-03-15",location:"Chicago, Illinois",link:"https://www.instagram.com/chicagobikepolo",frequency:"annual"},{id:"2",title:"DC Bike Polo Presents: Thaw XI",date:"2025-04-18",location:"Frederick, Maryland",link:"https://www.instagram.com/dcbikepolo",frequency:"annual"},{id:"3",title:"Bike Kill",date:"2024-10-31",location:"New York, New York",link:"https://www.instagram.com/blacklabelnewyork",frequency:"annual"},{id:"4",title:"Gravel Rat",date:"2024-10-12",location:"Baltimore, Maryland",link:"https://www.instagram.com/gravelrat",frequency:"annual"},{id:"5",title:"Warriors Bike Ride",date:"2024-07-06",location:"New York, New York",link:"https://www.instagram.com/warriorsbikeride",frequency:"annual"},{id:"6",title:"PsycleSwap",date:"2025-04-05",location:"Baltimore, Maryland",link:"https://www.instagram.com/psyclescape",frequency:"annual"},{id:"7",title:"PsycleScape",date:"2025-09-29",location:"Baltimore, Maryland",link:"https://www.instagram.com/psyclescape",frequency:"annual"},{id:"8",title:"Baltimore Bike Party",date:"2025-03-28",location:"Baltimore, Maryland",link:"https://www.instagram.com/baltimorebikeparty",frequency:"monthly",recurringPattern:{dayOfWeek:5,weekOfMonth:"last"}},{id:"9",title:"Taco Tuesday Ride",date:"2025-04-25",location:"Baltimore, Maryland",link:"https://www.facebook.com/groups/310740799305361",frequency:"weekly",recurringPattern:{dayOfWeek:1}},{id:"10",title:"DC Bike Party",date:"2025-03-12",location:"Washington, DC",link:"http://dcbikeparty.com/",frequency:"monthly",recurringPattern:{dayOfWeek:3,weekOfMonth:"second"}},{id:"11",title:"Broad Street Bullies",date:"2025-04-01",location:"Richmond, Virginia",link:"https://www.instagram.com/broadstreetbullies804",frequency:"weekly",recurringPattern:{dayOfWeek:4}}]}},function(e){e.O(0,[484,971,117,744],function(){return e(e.s=5574)}),_N_E=e.O()}]);