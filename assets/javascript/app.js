$(document).ready(function() {
var questions = [
	{
		"question": "How many shipments does Amazon make?",
		"answer1": "5 items per second",
		"answer2": "20 items per second",
		"answer3": "35 items per second",
		"answer4": "100 items per secon",
		"correct": "answer3"
	},
	{
		"question": "How many unique visitors does Amazon.com get?",
		"answer1": "100 visitors per minute",
		"answer2": "2000 visitors per minute",
		"answer3": "3700 visitors per minute",
		"answer4": "4300 visitors per minute",
		"correct": "answer4"
	},
	{
		"question": "What's the longest running T.V. show in the US? (prime-time, scripted)",
		"answer1": "The Simpsons",
		"answer2": "Law & Order",
		"answer3": "American Idol",
		"answer4": "Days of our Lives",
		"correct": "answer1"
	}
];

var itertimer; // Variable itertimer will hold the setInterval when we start the slideshow


var questionindex = 0;
var answerindex;

var thisanswer;
var thisquestion;
var UserAnswer;

var correct =0;
var wrong =0;
var timer = 5;


function NoResponse(){
	$(".YOUWERE").text("You ran out of time.");
	wrong++
	resultz();  
}

function setPage(){
	$(".result").addClass('hidden');
	$(".question").addClass('hidden');
	$(".start").removeClass('hidden');
	console.log("run setpage");
}

setPage();

$("#startbtn").on("click", function() {	
	console.log("in start button");
	changeDisplay(questionindex);
});

$(".ansr").on("click", function(){
	clearTimeout(itertimer);
	timer=0;
	UserAnswer = $(this).attr('id');
	console.log("in clicker " +UserAnswer + " " + answerindex)
	if (UserAnswer == answerindex){
		console.log("in the if");
	}
	Response();
});


function changeDisplay(z) {
	//make correct pannel show
	console.log("You are in changeDisplay")
	$(".start").addClass('hidden');
	$(".result").addClass('hidden');
	$(".question").toggleClass('hidden');

	//display the question and options
	$("#questionHD").html(questions[z].question);
	$("#answer1").html(questions[z].answer1);
	$("#answer2").html(questions[z].answer2);
	$("#answer3").html(questions[z].answer3);
	$("#answer4").html(questions[z].answer4);

	// start the display timer & go to response page timer
	timer = 5;
	countDown(timer);
	itertimer = setTimeout(NoResponse, 5000);

	//pull out and save the ID and text of correct answer for comparison, enable answer click button
	thisquestion = questions[z].question;
	answerindex = questions[z].correct;
	thisanswer = questions[z][answerindex];
}

function Response(){
	console.log("in Response");
	//console.log ("user answer is: " + UserAnswer + " and real answer is " +answerindex)

  	if (UserAnswer == answerindex){
	  	console.log("in response = correct");
		correct++
		$(".YOUWERE").text("You were right!");
	  	$("#Correct").html(correct);
		resultz();	
	}
  	else{
		console.log("in response = wrong");
		wrong++
		$(".YOUWERE").text("Nope.");
		$("#Wrong").html(wrong);
		resultz();	
	}	  	
}

function resultz(){
	console.log("in resultz");
	$(".question").addClass('hidden');	  	
	$(".result").removeClass('hidden');

	//display correct answer & next button with functionality
	$("#questionR").html(thisquestion);
	$("#correctR").html("The answer was "+ thisanswer);
	$("#nexter").show();
	$("#nexter").on("click", function(){
	 	questionindex++;
	 	console.log("in nexterbuttonfunction")
	 	if (questionindex >=questions.length){
	  		console.log("You're done!");
	  	}
	  	else{
	  		console.log("nextQ should go")
			changeDisplay(questionindex);
  		}
	});
};	


//be able to display time left
function countDown(){
	console.log("in timer");
	if(timer > 0){
		setTimeout(countDown,1000);
		console.log(timer);
		$("#timer").html(timer);
	}
	timer--;
}

});