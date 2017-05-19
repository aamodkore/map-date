
var currEvent = 0;
var currRange = [[null,null]]


function printRange(r) {
	if (r[0] == null && r[1] == null) {
		return "Anytime during the history of the universe.";
	} else if (r[0] == null) {
		return "Before "+ r[1]+".";
	} else if (r[1] == null) {
		return "After "+ r[0]+".";
	} else {
		return r[0]+" - "+ r[1]+".";
	}
}
function intersectSingle(x, y) {
	var z = [null, null];
	
	if (x[0]==null) z[0] = y[0];
	else if (y[0]==null) z[0] = x[0];
	else {
		z[0] = Math.max(x[0],y[0])
	}
	
	if (x[1]==null) z[1] = y[1];
	else if (y[1]==null) z[1] = x[1];
	else {
		z[1] = Math.min(x[1],y[1])
	}

	if (z[0]==null || z[1]==null) return z;
	else if (z[0]>=z[1]) return null;
	else return z;
}

function intersect(e,f) {
	var m = e.length;
	var n = f.length;
	var z = [];
	for (var i = e.length - 1; i >= 0; i--) {
		for (var j = f.length - 1; j >= 0; j--) {
			var zij = intersectSingle(e[i], f[j]);
			if (zij!=null) {
				z.push(zij);
			}
		}
	}
	return z;
}

function updateOptions() {
	if (currEvent < 0 || currEvent >= events.length) {
		document.getElementById("date-options").style.display = 'none';
	} else {
		document.getElementById("date-options").style.display = 'block';
		document.getElementById("date-question").innerHTML = events[currEvent].question;
		document.getElementById("yes-answer").innerHTML = events[currEvent].yAnswer;
		document.getElementById("no-answer").innerHTML = events[currEvent].nAnswer;
	}


	if (currRange.length <= 0) {
		document.getElementById("map-range").innerHTML = "No possible time period found for the map. Are you sure this is a real map?";
	}
	else {
		document.getElementById("date-ranges").innerHTML = "";
		for (var i = currRange.length - 1; i >= 0; i--) {
			document.getElementById("date-ranges").innerHTML += "<li>"+printRange(currRange[i])+"</li>";
		}
	}

}


function answer(ans) {
	var range = [[null,null]]
	if (ans!=null) {
		range = events[currEvent][ans];
	} 

	currRange = intersect(currRange, range);
	currEvent += 1;

	while (currEvent < events.length) {
		var yRange = intersect(currRange, events[currEvent]['yes']);
		var nRange = intersect(currRange, events[currEvent]['no']);
		if (yRange.length > 0 && nRange.length > 0) break;
		currEvent += 1;
	}

	updateOptions();
}

function reset(){
	currRange = [[null,null]];
	currEvent = 0;
	updateOptions();
}