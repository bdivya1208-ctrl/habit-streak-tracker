// ==========================
// Elements
// ==========================

const habitInput = document.getElementById("habitInput");
const addHabit = document.getElementById("addHabit");
const habitContainer = document.getElementById("habitContainer");

const totalHabits = document.getElementById("totalHabits");
const currentStreak = document.getElementById("currentStreak");
const longestStreak = document.getElementById("longestStreak");
const completion = document.getElementById("completion");
const quote = document.getElementById("quote");

// ==========================
// Quotes
// ==========================

const quotes = [

"Success is the sum of small efforts repeated every day.",

"Discipline beats motivation.",

"Small progress is still progress.",

"Stay consistent and trust the process.",

"Your future is created by what you do today.",

"Every day is another chance to improve."

];

quote.textContent =
quotes[Math.floor(Math.random()*quotes.length)];


// ==========================
// Local Storage
// ==========================

let habits =
JSON.parse(localStorage.getItem("habits")) || [];


// ==========================
// Save
// ==========================

function saveHabits(){

localStorage.setItem(
"habits",
JSON.stringify(habits)
);

}


// ==========================
// Add Habit
// ==========================

addHabit.addEventListener("click",()=>{

const name = habitInput.value.trim();

if(name===""){

alert("Enter a habit");

return;

}

habits.push({

name:name,

days:new Array(30).fill(false)

});

habitInput.value="";

saveHabits();

render();

});


// ==========================
// Toggle Day
// ==========================

function toggleDay(habitIndex,dayIndex){

habits[habitIndex].days[dayIndex]=
!habits[habitIndex].days[dayIndex];

saveHabits();

render();

}


// ==========================
// Delete Habit
// ==========================

function deleteHabit(index){

if(confirm("Delete this habit?")){

habits.splice(index,1);

saveHabits();

render();

}

}


// ==========================
// Current Streak
// ==========================

function getCurrentStreak(days){

let streak=0;

for(let i=days.length-1;i>=0;i--){

if(days[i]){

streak++;

}else{

break;

}

}

return streak;

}


// ==========================
// Longest Streak
// ==========================

function getLongestStreak(days){

let longest=0;

let current=0;

days.forEach(day=>{

if(day){

current++;

if(current>longest){

longest=current;

}

}else{

current=0;

}

});

return longest;

}


// ==========================
// Badge
// ==========================

function getBadge(streak){

if(streak>=30)
return "👑 Legend";

if(streak>=15)
return "🥇 Gold";

if(streak>=7)
return "🥈 Silver";

if(streak>=3)
return "🥉 Bronze";

return "⭐ Beginner";

}


// ==========================
// Render
// ==========================

function render(){

habitContainer.innerHTML="";

let totalCompleted=0;

let overallCurrent=0;

let overallLongest=0;

habits.forEach((habit,index)=>{

const completed =
habit.days.filter(d=>d).length;

totalCompleted+=completed;

const current =
getCurrentStreak(habit.days);

const longest =
getLongestStreak(habit.days);

if(current>overallCurrent)
overallCurrent=current;

if(longest>overallLongest)
overallLongest=longest;

const percent =
(completed/30)*100;

const card=document.createElement("div");

card.className="habit";

card.innerHTML=`

<div class="habit-header">

<h2>📖 ${habit.name}</h2>

<button
class="delete-btn"
onclick="deleteHabit(${index})">

Delete

</button>

</div>

<div class="stats">

<p>🔥 Current : ${current}</p>

<p>🏆 Longest : ${longest}</p>

<p>✅ ${completed}/30</p>

</div>

<div class="badge">

${getBadge(longest)}

</div>

<div class="progress">

<div
class="progress-fill"
style="width:${percent}%">

</div>

</div>

<div class="calendar">

${habit.days.map((day,i)=>`

<div
class="day ${day?"completed":""}"
onclick="toggleDay(${index},${i})">

${i+1}

</div>

`).join("")}

</div>

`;

habitContainer.appendChild(card);

});

totalHabits.textContent =
habits.length;

currentStreak.textContent =
overallCurrent;

longestStreak.textContent =
overallLongest;

let totalPossible =
habits.length*30;

let percent =
totalPossible===0
?0
:Math.round(
(totalCompleted/totalPossible)*100
);

completion.textContent =
percent+"%";

}


// ==========================
// Initial Load
// ==========================

render();