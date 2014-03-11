
/**
 * Assasin: Generates a single Assasin. Required Vars: Name: Players Name.
 * Location: Where the player resides. email: target players email.
 * 
 * Generated Values (here for loading on event of system crash) Nickname target:
 * The current target of this assassin mark: Who's trying to kill off this
 * assassin status: "UnInit" //Not in use now "Alive" "Dead"
 */
function Assasin(name,location,email,target,mark,nickname,id,status) {
	this.name = name;
	this.location = location;
	this.email = email;
	
	if(typeof nickname === 'undefined'){
		nickname = generateNickName(nickname);
	}
	this.nickname = nickname;
	if(!(typeof target === 'undefined'))
		this.target = target;
	if(!(typeof mark === 'undefined'))
		this.mark = mark;
	if(typeof status === 'undefined')
		status = "Alive";
	
	if(typeof id === 'undefined')
		id = generateID();
	this.id = id;
	this.status = status;
	
}


/**
 * target : Assasin to kill off
 */
Assasin.prototype.kill = function (target){
	target.status="Dead"
	if(this.target == target.id ) // emails are unique
		this.target = target.target;
	else if(this.mark == target.id)
	{
		// Handle this edge case. Though really, it should be reassigning a
		// target forward from the tail
		//
		// 1 > 2 > 3 > 4
		//
		// pop 2 (whos the mark) as 3 killed 2.
		//
		// 1> 3 > 4
		target.mark = this.id;
	}
};

/**
 * TODO: A call to generate a random nick name
 * 
 */
function generateNickName(name)
{
	return nicknames.splice(Math.round(Math.random()*nicknames.length),1)[0];
}

//Nickname library:

nicknames = [];

var fs = require('fs');
fs.readFile('./corePrograms.txt',{encoding:"ascii"},function(err,data){
	if(err) throw err;
	//return;
	var words = data.split('\n');
	console.log("Nicknames loaded");
	exports.loaded = true;
	nicknames = words;
});
/**
 * TODO: Generate a unique nick id
 */

 var maxID = 1000;
function generateID()
{
	maxID++;
	return maxID;
}

/**
 * 
 */
function generateHits(assasins,distanceFunction)
{
	var distances //
}

function hameltonGraph(graph)
{
	
}

module.exports = Assasin;

