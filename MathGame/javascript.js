
var playing = false;
var score;
var correctAnswer;
// if we click on the start/reset
document.getElementById("startreset").onclick = 
function(){
    //if we are playing
    if (playing==true){
        //reload page
        location.reload();


    } else {
    //if we are not playing
        playing = true;    
        //set score 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //show countdown box
        document.getElementById("timeremaining").style.display = "block";
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        //hide game over box
        hide("gameOver");
        //reduce time by 1 sec in loops
            //timeleft?
                //yes->continue
                //no->gameover
        //change botton to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        //start countdown
        startCountdown();
        //generate new Q&A  
        generateQA();
    }
}


//if we click on answer box 
for(i=1;i<5; i++){
    document.getElementById("box"+i).onclick = 
    function(){
        //check if we are playing
        if(playing==true){
            if(this.innerHTML == correctAnswer){
                //correct answer

                //increase score
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                //hide wrong and showing correct
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);

                //Generate new Q&A;
                generateQA();
            }else{
            //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}
    //if we are playing
        //corret?
            //yes
                //increase score
                //generate new Q&A
            //no
                //show try again box for 1 sec


//functions 
//start counter           
function startCountdown(){
    action = setInterval(function(){

        timeremaining -=1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining==0){ //game over
           stopCountdown();
           show("gameOver");
           document.getElementById("gameOver").innerHTML = "<p> Game Over </p><p>Your score is " + score +" !";
           hide("timeremaining");
           hide("correct");
           hide("wrong");
           playing = false;
           document.getElementById("startreset").innerHTML = "Start Game!";
        }
    }, 1000);
}
//stop counter
function stopCountdown(){
    clearInterval(action);
}
//hide elements by id
function hide (id){
    document.getElementById(id).style.display = "none";
}
//show elements by id
function show (id){
    document.getElementById(id).style.display = "block";
}
//generater of questions ans answers
function generateQA(){
    //creating a random number for variable x
    var x = 1+ Math.round(9*Math.random());
    //crating a random number for variable y
    var y = 1+ Math.round(9*Math.random());
    //geting the right answer
    correctAnswer = x*y;
    //showing the questions by ID and adding the variables
    document.getElementById("question").innerHTML = x + "x" + y;
    //getting the right position
    var correctPosition = 1+ Math.round(3*Math.random());
    //getting the right position to a box
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer]; 

    // fill other positions
    for(i=1;i<5;i++){
        if(i!=correctPosition){
        var wrongAnswer; 
            do {
                wrongAnswer = (1+ Math.round(9*Math.random()))
                            *(1+ Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1)            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }

}