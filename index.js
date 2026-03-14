const createElements=(arr)=>
{
    const htmlElements = arr.map((el)=> `<span class="btn">${el}</span>`)
    return htmlElements.join(" ")
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner=(status)=>{
    if(status==true)
    {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }
    else
    {
    document.getElementById("spinner").classList.add("hidden")
        document.getElementById("word-container").classList.remove("hidden")
    }
}
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
    manageSpinner(true)
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

const loadWordDetail= async(id)=>
{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails(details.data)
}
const displayWordDetails=(word)=>
{
    const detailsBox= document.getElementById("details-container")
    detailsBox.innerHTML=`
    
    <div>
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div>
          <h2 class="font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h2 class="font-bold">Synonyms</h2>
          <div class="">
          ${createElements(word.synonyms)}
          </div>
        </div>
    
    
    `
    document.getElementById("word-modal").showModal();
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
        manageSpinner(false)
        return
        }
    words.forEach(word => {
        const card=document.createElement("div")
        card.innerHTML=`
        
        
        
        <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 ">
        <h1 class="font-bold text-2xl">${word.word ? word.word:"Not found"}</h1>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "Not found"} / ${word.pronunciation ? word.pronunciation:"Not found"}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]" onClick="loadWordDetail(${word.id})"><i class="fa-solid fa-circle-info"></i></button>
          <button onClick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          
        </div>
      </div>
        
        
        
        
        
        
        
        
        
        `
        wordContainer.appendChild(card)
    });
    manageSpinner(false)
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

document.getElementById("btn-search").addEventListener("click", () => {

    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase()

    if(!searchValue){
        alert("Please type a word to search")
        return
    }

    manageSpinner(true)
    removeActive()

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {

        const allWords = data.data

        const filterWords = allWords.filter(word =>
            word.word.toLowerCase().includes(searchValue)
        )

        displayLevelWord(filterWords)
    })

})