const start_btn=document.querySelector(".start_btn");
const info_box=document.querySelector(".info_box");
const exit_btn= info_box.querySelector(".buttons .quit");
const continue_btn=info_box.querySelector(".buttons .restart");
const quiz_box=document.querySelector(".quiz_box");
const option_list=document.querySelector(".option_list");
const timeCount=quiz_box.querySelector(".timer .timer_sec");
const timeLine=quiz_box.querySelector("header .time_line");
const timeoff=document.querySelector("header .timer .time_left_txt");
let quizimg=document.querySelector(".quizimg");
let rabbit=document.querySelector(".rabit");

// Quizz started
//show infobox
start_btn.onclick=function() {
    info_box.classList.add("activeInfo");
    quizimg.classList.add("active");
}
//if exitbtn clicked
exit_btn.onclick=function() {
    info_box.classList.remove("activeInfo");
}
//If Continue Button Clicked
continue_btn.onclick=function() {
    info_box.classList.remove("activeInfo");//hide the Infobox
    quiz_box.classList.add("activeQuiz");//show The Quiz Box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
    
}
let que_count=0;
let que_number=1;
let counter;
let timevalue=15;
let widthvalue=0;
let userscore=0;
const next_btn=quiz_box.querySelector(".next_btn");
const result_box=document.querySelector(".result_box");
const restart_quiz=result_box.querySelector(".buttons .restart");
const quit_quiz=result_box.querySelector(".buttons .quit");
quit_quiz.onclick=function() {
    window.location.reload();
}
restart_quiz.onclick=function() {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count=0;
let que_number=1;
let timevalue=15;
let widthvalue=0;
let userscore=0;
showQuestions(que_count);
queCounter(que_number);
clearInterval(counter);
startTimer(timevalue);
clearInterval(counterLine);
startTimerLine(widthvalue);
next_btn.style.display="none";


}

//if Next Button Clikced
next_btn.onclick=function() {
   if(que_count < questions.length -1) {
       que_count++;
       que_number++;
       showQuestions(que_count);
       queCounter(que_number);
       clearInterval(counter);
       startTimer(timevalue);
       clearInterval(counterLine);
       startTimerLine(widthvalue);
       next_btn.style.display="none";
    

   }else {
       console.log("Questions completed");
       showResultBox();
   }
}
//getting questions and options from array
function showQuestions(index) {
    const que_text=document.querySelector(".que_text");
    let que_tag='<span>'+questions[index].numb+"."+questions[index].question+'</span>';
    let option_tag='<div class="option">'+questions[index].options[0]+'<span></span></div>'
                    +'<div class="option">'+questions[index].options[1]+'<span></span></div>'
                    +'<div class="option">'+questions[index].options[2]+'<span></span></div>'
                    +'<div class="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option=option_list.querySelectorAll(".option");
    for(let i=0;i<option.length;i++) {
        option[i].setAttribute("onclick","optionsSelected(this)");
    }
}

let tickIcon='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon='<div class="icon cross"><i class="fas fa-times"></i></div>';
function optionsSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns=answer.textContent;
    let correctAns=questions[que_count].answer;
    let alloptions=option_list.children.length;
    if(userAns==correctAns) {
        userscore+=1;
        console.log(userscore)
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",crossIcon);
        //if answers is incorrect then automaticlly selected the correct answer
        for(let i=0;i<alloptions;i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }//once user selected disabled all options
    for(let i=0;i<alloptions;i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
}

function startTimer(time) {
    counter=setInterval(timer,1000);
    function timer () {
        timeCount.textContent=time;
        time--;

        if(time<9) {
            let addzero=timeCount.textContent;
            timeCount.textContent="0"+addzero;
        }
        if(time<0) {
            clearInterval(counter);
            timeCount.textContent="00";
            timeoff.textContent="Time Off";
        }
    }
}
function startTimerLine(time) {
    counterLine=setInterval(timer,29);
    function timer () {
        time+=1;
        timeLine.style.width=time+ "px";
        if(time>549) {
            clearInterval(counterLine);
            
        }
    }
}
function showResultBox() {
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeQuiz");//hide the quizz
    result_box.classList.add("activeResult");//show the result box
    const scoretext=result_box.querySelector(".score_text");
    if(userscore > 3 ) {
        let scoretag='<span>Gongrats Orendian!,You Got <p>'+userscore+'</p>  Out Of <p>'+questions.length+'</p></span>'
    scoretext.innerHTML=scoretag;

    }
    else if(userscore > 1 ) {
        let scoretag='<span>nice ,You Got <p>'+userscore+'</p>  Out Of <p>'+questions.length+'</p></span >'
    scoretext.innerHTML=scoretag;
    }else {

    }
}




function queCounter(index) {
    const bottom_ques_counter=quiz_box.querySelector(".total_que");
    let totalQueCountTag='<span><p>'+index+'</p>of<p>'+questions.length+'</p>Questions</span>';
    bottom_ques_counter.innerHTML=totalQueCountTag;
}