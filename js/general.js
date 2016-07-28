// Return a random number within the provided min / max parameters
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function getRandomInsult(obj){
	var final = [];

	// Loop through all columns in the insults list
	for(var i=0; i<obj.length; i++){

		// Get random number within number of available options
		var rand = getRandomInt(0, obj[i].length-1);
		final.push( obj[i][rand] );
	}
	return final;
}

function getTotalPossibilities(obj){
	var num = 0;
	for(var i=0; i<obj.length; i++){
		if (!num){
			num = obj[i].length;
		} else {
			num = num * obj[i].length;
		}
	}
	return num;
}

function getInsultList(file){
	var file = (file) ? file : "general";

	$.getJSON( "insults/"+file+".json", function(data){
		var insults = data["insults"];
		
		$("span","#Insult").empty();

		$(".num","#TotalPossible").text(function(){
			return getTotalPossibilities(insults).toLocaleString();
		});

		$("#NewInsult").click(function(e){
			var newInsult = getRandomInsult(insults);
			$("#InsultCol1").text(newInsult[0]);
			$("#InsultCol2").text(newInsult[1]);
			$("#InsultCol3").text(newInsult[2]);
		});
	});
}

$(function(){

	if( location.hash ){
		var file = location.hash.replace('#','').trim();
		getInsultList( file );
		$("button[data-file='"+file+"']","#ChangeInsults").addClass('active').siblings('.active').removeClass('active');
	} else {
		getInsultList();
	}

	$("button","#ChangeInsults").click(function(){
		$(this).addClass('active').siblings('.active').removeClass('active');
		var file = $(this).data('file');
		location.hash = file;
		getInsultList(file);
	});
});