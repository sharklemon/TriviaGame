$(document).ready(function() {
var questions = [
	{
		"question": "How many shipments does Amazon make?",
		"answer1": "5 items per second",
		"answer2": "20 items per second",
		"answer3": "35 items per second",
		"answer4": "100 items per secon",
		"correct": "answer3",
		"img": "https://www.propublica.org/images/ngen/gypsy_big_image/20160920-amazon-630x420.gif"
	},
	{
		"question": "What was the first science fiction book?",
		"answer1": "Frankenstein",
		"answer2": "Princess of Mars",
		"answer3": "Tale of Two Cities",
		"answer4": "Lord of the Rings",
		"correct": "answer1",
		"img": "https://imgs-tuts-dragoart-386112.c.cdn77.org/how-to-draw-cute-frakenstein_1_000000021174_5.png"
	},
	{
		"question": "What does the 'four score' in 'four score and seven years ago' mean?",
		"answer1": "Many years",
		"answer2": "80 [years]",
		"answer3": "A century",
		"answer4": "40 [years]",
		"correct": "answer2",
		"img": "http://cdn.history.com/sites/2/2013/12/gettysburg-address-memorial2-AB.jpeg"
	},
	{
		"question": "How old was Joan of Arc when she died?",
		"answer1": "15",
		"answer2": "17",
		"answer3": "19",
		"answer4": "21",
		"correct": "answer3",
		"img": "http://static.panoramio.com/photos/large/79687436.jpg"
	}
];	

var itertimer; // Variable itertimer will hold the setInterval when we start the slideshow


var questionindex = 0;
var answerindex;
var remainder = questions.length;

var thisanswer;
var thisquestion;
var UserAnswer;

var correct =0;
var wrong =0;
var timer = 5;


function NoResponse(){
	console.log("in no response");
	var OUT = $("h1");
	OUT.text("You ran out of time.");
	$(".YOUWERE").append(OUT);
	wrong++;
	$("#Wrong").html(wrong);
	console.log("wrong is " +wrong)
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
	$("jumbotron").removeClass('hidden');

  	if (UserAnswer == answerindex){
	  	console.log("in response = correct");
		correct++
		var YES = $("h1");
		YES.text("You were right!");
		$(".YOUWERE").append(YES);
	  	$("#Correct").html(correct);
		resultz();	
	}
  	else{
		console.log("in response = wrong");
		wrong++
		var NOPE = $("h1");
		NOPE.text("Nope.");
		$(".YOUWERE").append(NOPE);
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
	remainder--;
	console.log("remainder " + remainder);
	$("#Questions_Remaining").html(remainder);
	$("#timer").html("0 seconds left");	
	$("#nexter").show();
	$("jumbotron").removeClass('hidden');
};	


//be able to display time left
function countDown(){
	console.log("in timer");
	if(timer > 0){
		setTimeout(countDown,1000);
		console.log(timer);
		$("#timer").html(timer+ " seconds left");
	}
	timer--;
}

});