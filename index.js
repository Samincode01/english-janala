const loadLesson=()=>
{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json =>displayLesson(json.data))
}
const removeActive=()=>
{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn=> btn.classList.remove("active")))
}
const loadLevelWord=(id)=>
{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => 
        
        {
            
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active")
            displayLevelWord(data.data)})
}
const displayLevelWord=(words)=>
{
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML=""
    if (words.length==0)
        {
            wordContainer.innerHTML=`
            
        <div class="text-center col-span-full rounded-xl py-10 space-y-6">
        <img class="mx-auto" src="assets/alert-error.png">
        <p class="text-2xl font-medium font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bangla font-bold text-3xl">নেক্সট Lesson এ যান</h1>
        </div>`
        }
    words.forEach(word => {
        const card=document.createElement("div")
        card.innerHTML=`
        
        
        
        <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 ">
        <h1 class="font-bold text-2xl">${word.word ? word.word:"Not found"}</h1>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "Not found"} / ${word.pronunciation ? word.pronunciation:"Not found"}"</div>
        <div class="flex justify-between items-center">
          <button class="btn" onClick="my_modal_5.showModal()" bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          
        </div>
      </div>
        
        
        
        
        
        
        
        
        
        `
        wordContainer.appendChild(card)
    });
}
const displayLesson=(lessons)=>
{
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML=""
    lessons.forEach((lesson) => {
        const btnDiv = document.createElement("div")
        
        btnDiv.innerHTML=`
        
        <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        
        
        `
    levelContainer.appendChild(btnDiv)
    });
}
loadLesson()