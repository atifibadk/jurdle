const wordDisplayElement = document.getElementById("jumbleDisplay")
const wordInputElement = document.getElementById("wordInput")
const inputDisplayELement = document.getElementById("inputDisplay")
const timerElement = document.getElementById("timer")
const intialTime = "15"
const deductTimeDiff = 15
const firstDate = new Date('4/3/2022')

const winMsg = "Congratulations! You won 😋"
const lossMsg = "You lost, try again tmrw 😭"

import {word_array} from './data.js'

//Callback function which listens to any activity on the textBox
//This function also renders alphabet in a coloured way.
//Prints msg when input matches the word

wordInputElement.addEventListener('input', () => {

    const arrayOrig = get_word_of_day().split('')
    const arrayInput = wordInputElement.value.toLowerCase().split('')
    inputDisplayELement.innerHTML = null
    arrayInput.forEach((characterData,index) => {
       
        const character = arrayOrig[index]
        if(character === arrayInput[index]) {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            inputDisplayELement.appendChild(characterSpan)
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("incorrect")
        } else {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = characterData
            inputDisplayELement.appendChild(characterSpan)
            characterSpan.classList.add("incorrect")
            characterSpan.classList.remove("correct")
        }
    });
    setTimeout(function(){

        if(wordInputElement.value.toLowerCase() === get_word_of_day()) {
            clearInterval(intervalId)
            wordInputElement.disabled = true
            wordDisplayElement.innerText = get_word_of_day()
            inputDisplayELement.innerText = winMsg
            inputDisplayELement.classList.add("correct")
            wordDisplayElement.classList.add("correct")
            return
        }
}, 500); 
    
})

//This function replace char on particular index with the parameter char 'r'
function replace_char (str,index,r) {
    const replacement = r;

    const replaced =
    str.substring(0, index) +
    replacement +
    str.substring(index + 1);

    return replaced
}

//This Function swaps ith and jth char in a string.
function swap_char(s,i,j) {
    let c1 = s[i]
    let c2 = s[j]

    let s1 = replace_char(s,i,c2)
    let s2 = replace_char(s1, j, c1)

    return s2
} 

//This function jumbles words, using swapping technique.
function jumble_word(str) {
    let orig = str
    let round = Math.floor(Math.random() * 10) + 1;
    let i
    let j

     for(let k=0;k<round;k++) {
        i = Math.floor(Math.random() * str.length);
        j = Math.floor(Math.random() * str.length);
        str = swap_char(str,i,j)  
     }
     if(str == orig && str.length != 1) {
         do{
            i = Math.floor(Math.random() * str.length);
            j = Math.floor(Math.random() * str.length);
            str = swap_char(str,i,j) 
         } while(i==j)
        }
     return str;
}

//This function is used to get the word of the day based on the date.
let index
function get_word_of_day() {
    index = get_diff_days(new Date())
    console.log(index)
    return word_array[index].toLowerCase()
}

//This function decrements counter from '60' to '0',
//Prints message when counter reaches zero
let startTime
let intervalId
function start_counter(){
    timerElement.innerText=intialTime
    startTime = new Date()
    intervalId = setInterval(()=>{
        timerElement.innerText = deductTimeDiff - get_timer_time()
        if(timerElement.innerText === "0") {
            wordInputElement.disabled = true
            clearInterval(intervalId)
            if(wordInputElement.value.toLowerCase() === get_word_of_day()) {
                wordDisplayElement.innerText = get_word_of_day()
                inputDisplayELement.innerText = winMsg
                inputDisplayELement.classList.add("correct")
                wordDisplayElement.classList.add("correct")
            } else {
                wordDisplayElement.innerText = get_word_of_day()
                inputDisplayELement.innerText = lossMsg
                inputDisplayELement.classList.add("incorrect")
                wordDisplayElement.classList.add("correct")
            }
            
        }
    },1000)
}

//This function returns difference between startime and nowtime
function get_timer_time() {
    return Math.floor((new Date() - startTime)/1000)
}

//This function renders jumbled on word on screen
function render_word(str) {
    inputDisplayELement.innerHTML = null
    wordInputElement.value = null
    wordDisplayElement.innerText=str
    start_counter()
}

//This function return difference between intial and today date, used for getting word for the day
function get_diff_days(today) {
    const date1 = firstDate;
    const diffTime = Math.abs(today - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
}


render_word(jumble_word(get_word_of_day()))


