(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[271],{5212:function(e,t,n){Promise.resolve().then(n.bind(n,9385))},9385:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var a=n(7437),r=n(8476),l=n(3336),i=n(1),c=n(2265);function o(){let[e,t]=(0,c.useState)(null),n=Array.from(new Set(r.U.filter(e=>"annual"===e.frequency).map(e=>e.location))).sort();return(0,a.jsx)(i.Z,{selectedFrequency:"annual",locations:n,selectedLocation:e,onLocationSelect:t,children:(0,a.jsx)(l.Z,{events:r.U,selectedLocation:e,selectedFrequency:"annual",onReset:()=>t(null)})})}},3336:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var a=n(7437),r=n(2265),l=n(3070),i=n(3993),c=n(9121),o=n(7742),s=n(5341),u=n(5902),d=n(1091),f=n(6115);function m(e,t){if(!(t instanceof Date&&!isNaN(t.getTime())))return null;if("annual"===e.frequency)return new Date(e.date);let n=new Date(t),a=n.getFullYear(),r=n.getMonth();if("monthly"===e.frequency&&e.recurringPattern){let t=e.recurringPattern.dayOfWeek,n=e.recurringPattern.weekOfMonth,u=(0,l.N)(new Date(a,r));for(;(0,i.w)(u)!==t;)u=(0,c.E)(u,1);if(n){if("last"===n)for(u=(0,o.V)(new Date(a,r));(0,i.w)(u)!==t;)u=(0,s.k)(u,1);else{let e={first:0,second:1,third:2,fourth:3};n in e&&(u=(0,c.E)(u,7*e[n]))}}return u}if("weekly"===e.frequency&&e.recurringPattern){let l=new Date(a,r,n.getDate()),o=e.recurringPattern.dayOfWeek,s=(0,i.w)(l);return(l=(0,c.E)(l,o-s))<t&&(l=(0,c.E)(l,7)),l}return null}function y(e){let{events:t,selectedLocation:n,selectedFrequency:l,onReset:i}=e,o=(0,r.useMemo)(()=>{let e=new Date;return e.setHours(0,0,0,0),e},[]),f=(0,r.useMemo)(()=>t.filter(e=>{let t=!n||e.location===n,a=!l||e.frequency===l;return t&&a}).flatMap(e=>{if("annual"===e.frequency)return[{...e,displayDate:new Date(e.date),isRecurring:!1}];let t=[],n=m(e,o),a=function(e,t){let n=m(e,t);return n?"monthly"===e.frequency?(0,u.W)(n,1):"weekly"===e.frequency?(0,s.k)(n,7):null:null}(e,o),r=function(e,t){let n=m(e,t);return n?"monthly"===e.frequency?(0,d.z)(n,1):"weekly"===e.frequency?(0,c.E)(n,7):null:null}(e,o);return a&&t.push({...e,displayDate:a,isRecurring:!0,occurrenceType:"previous"}),n&&t.push({...e,displayDate:n,isRecurring:!0,occurrenceType:"current"}),r&&t.push({...e,displayDate:r,isRecurring:!0,occurrenceType:"next"}),t}),[t,n,l,o]),{sortedEvents:y,nextUpcomingEvent:p}=(0,r.useMemo)(()=>{let[e,t]=f.reduce((e,t)=>(e[t.displayDate>=o?0:1].push(t),e),[[],[]]);return{sortedEvents:[...e.sort((e,t)=>t.displayDate.getTime()-e.displayDate.getTime()),...t.sort((e,t)=>t.displayDate.getTime()-e.displayDate.getTime())],nextUpcomingEvent:e.sort((e,t)=>e.displayDate.getTime()-t.displayDate.getTime())[0]||null}},[f,o]);return(0,a.jsx)("div",{className:"w-full max-w-2xl mx-auto text-lg font-['Courier_New']",children:(0,a.jsx)("ul",{className:"list-none p-0 space-y-4",children:y.map(e=>{let t=e.displayDate<o,n=p&&e.displayDate.getTime()===p.displayDate.getTime()&&e.id===p.id;return(0,a.jsx)(h,{event:e,isPast:t,isNextUpcoming:n},"".concat(e.id,"-").concat(e.occurrenceType||"single"))})})})}let h=(0,r.memo)(function(e){let{event:t,isPast:n,isNextUpcoming:r}=e;return(0,a.jsxs)("li",{className:"transition-all duration-300 relative ".concat(n?"text-gray-400":"text-black"," ").concat(r?'after:content-[""] after:absolute after:left-[20%] after:right-[20%] after:bottom-0 after:h-[3px] after:bg-red-500/80 after:rotate-[358deg] after:-z-10':""),children:[(0,f.WU)(t.displayDate,"MMMM d, yyyy"),": ",t.link?(0,a.jsx)("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:"rotate-hover ".concat(n?"text-red-300 hover:text-red-400":"text-red-500 hover:text-red-600"),children:t.title}):t.title,(0,a.jsx)("br",{}),(0,a.jsx)("span",{className:"text-[0.75em]",children:t.location})]})})},1:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(7437),r=n(9376),l=n(7648);let i=[{href:"/",label:"All",value:"all"},{href:"/annual",label:"Annual",value:"annual"},{href:"/monthly",label:"Monthly",value:"monthly"},{href:"/weekly",label:"Weekly",value:"weekly"}];function c(e){let{children:t,selectedFrequency:n="all",locations:c,selectedLocation:o,onLocationSelect:s}=e,u=(0,r.usePathname)();return(0,a.jsx)("main",{className:"min-h-screen p-8",children:(0,a.jsxs)("div",{className:"w-full max-w-2xl mx-auto text-lg font-['Courier_New']",children:[(0,a.jsx)("h1",{className:"text-center mb-4 text-[1.75rem] font-bold",children:(0,a.jsx)(l.default,{href:"/",className:"cursor-pointer hover:opacity-80",children:"East Coast ⚡ Bike Calendar"})}),(0,a.jsxs)("div",{className:"text-center space-y-2 mb-4",children:[(0,a.jsx)("div",{className:"space-x-4",children:i.map(e=>{let{href:t,label:n}=e;return(0,a.jsx)(l.default,{href:t,className:"px-2 rotate-hover ".concat(u===t?"font-bold underline":""),children:n},t)})}),c.length>0&&(0,a.jsx)("div",{className:"space-x-4",children:c.map(e=>(0,a.jsx)("button",{onClick:()=>s(e===o?null:e),className:"px-2 rotate-hover ".concat(o===e?"font-bold underline":""),children:e.split(",")[0]},e))})]}),(0,a.jsx)("div",{children:(0,a.jsxs)("pre",{className:"text-center mb-8 select-none text-[0.5rem] leading-[0.5rem]",children:["   \\  /   \\  /   \\  /   \\  /   \\  /  \n","---///----///----///----///----///---\n","  /  \\   /  \\   /  \\   /  \\   /  \\  "]})}),t,(0,a.jsx)("footer",{className:"mt-16 text-center",children:(0,a.jsx)("div",{className:"flex items-center justify-center",children:(0,a.jsx)("a",{href:"https://buymeacoffee.com/notoncebut2x",target:"_blank",rel:"noopener noreferrer",className:"rotate-hover text-inherit hover:opacity-80 font-mono",children:(0,a.jsxs)("pre",{className:"text-[0.6rem] leading-[0.6rem] select-none",children:["         {\n","      {   }\n","       }_{ __{\n","    .-{   }   }-.\n","   (   }     {   )\n","   |`-.._____..-'|\n","   |             ;--.\n","   |   Buy me   (__  \\\n","   |      a      | )  )\n","   |   coffee    |/  /\n","   |             /  /\n","   \\             y'\n","    `-.._____..-'"]})})})})]})})}},8476:function(e,t,n){"use strict";n.d(t,{U:function(){return a}});let a=[{id:"1",title:"Saint Ratricks Day",date:"2025-03-15",location:"Chicago, Illinois",link:"https://www.instagram.com/chicagobikepolo",frequency:"annual"},{id:"2",title:"DC Bike Polo Presents: Thaw XI",date:"2025-04-18",location:"Frederick, Maryland",link:"https://www.instagram.com/dcbikepolo",frequency:"annual"},{id:"3",title:"Bike Kill",date:"2024-10-31",location:"New York, New York",link:"https://www.instagram.com/blacklabelnewyork",frequency:"annual"},{id:"4",title:"Gravel Rat",date:"2024-10-12",location:"Baltimore, Maryland",link:"https://www.instagram.com/gravelrat",frequency:"annual"},{id:"5",title:"Warriors Bike Ride",date:"2024-07-06",location:"New York, New York",link:"https://www.instagram.com/warriorsbikeride",frequency:"annual"},{id:"6",title:"PsycleSwap",date:"2025-04-05",location:"Baltimore, Maryland",link:"https://www.instagram.com/psyclescape",frequency:"annual"},{id:"7",title:"PsycleScape",date:"2025-09-29",location:"Baltimore, Maryland",link:"https://www.instagram.com/psyclescape",frequency:"annual"},{id:"8",title:"Baltimore Bike Party",date:"2025-03-28",location:"Baltimore, Maryland",link:"https://www.instagram.com/baltimorebikeparty",frequency:"monthly",recurringPattern:{dayOfWeek:5,weekOfMonth:"last"}},{id:"9",title:"Taco Tuesday Ride",date:"2025-04-25",location:"Baltimore, Maryland",link:"https://www.facebook.com/groups/310740799305361",frequency:"weekly",recurringPattern:{dayOfWeek:1}},{id:"10",title:"DC Bike Party",date:"2025-03-12",location:"Washington, DC",link:"http://dcbikeparty.com/",frequency:"monthly",recurringPattern:{dayOfWeek:3,weekOfMonth:"second"}},{id:"11",title:"Broad Street Bullies",date:"2025-04-01",location:"Richmond, Virginia",link:"https://www.instagram.com/broadstreetbullies804",frequency:"weekly",recurringPattern:{dayOfWeek:4}}]}},function(e){e.O(0,[727,971,117,744],function(){return e(e.s=5212)}),_N_E=e.O()}]);