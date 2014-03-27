
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

Assasin.prototype.getTarget = function (assasins)
{
	return assasins[this.target];
}
Assasin.prototype.distance = function(target)
{
	var ret = 0;
	//Split the location vector into its components.
	tlocation = target.location.split(".");
	mlocation = this.location.split(".");
	//Floor Dif
	ret += Math.abs(tlocation[1] - mlocation[1]) * 400;
	//Location Difference. This one's harder. We have a max difference of ~200 in number, and we number 100->500
	ret += Math.abs(tlocation[1] - mlocation[1]) % 200; //I think
	ret += Math.random() * 100;
	return ret;
}

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
Assasin.generateHits = function(assasins)
{
	function removeInside(array,value)
	{
		var tar = undefined;
		for(i in array){
			if(array[i] == value){
				tar = i;
				break;
			}
		}
		if(tar) array.split(i,1);
	}
	//Populate Distance Vector
	graph = [];
	var distances = [];
	for (var x in assasins){
		distances[x] = []
		for(var y in assasins){
			var dist = [];
			dist = assasins[x].distance(assasins[y]);
			dist.user = y;
			distances[x][y] = dist;
		}
		graph.push([x]);
	}
	//Reduce Graphs slowly, till you have only one.
	//We do so under the theory of the longest road. Or something. I just like that name
	var roadLength = 0;
	var finalGraph = [];
	if(graph.length == 0) return null; //Do nothing
	if(graph.length == 1) return null; //Do nothing

	var index = 0;
	var subindex = 0;
	var subsegmentDistance = 0;

	//Find the length we care about;
	var user1 = graph.pop();
	var user2 = graph.pop();
	finalGraph[user1] = [];
	finalGraph[user2] = [];
	finalGraph[user1].target = user2;
	finalGraph[user1].distance = distances[user1][user2];
	finalGraph[user2].target = user1;
	finalGraph[user2].distance = distances[user1][user2];


	roadLength = subsegmentDistance * 2;


	console.log("Starting to generate graph\n");
	//First two are constructed, lets keep adding...
	while(graph.length > 0){
		console.log("\t"+graph.length+" to go...\n");
		var u1 = 0;
		var u2 = 0;
		var delta = Number.MIN_VALUE;
		var user = graph.pop();
		//pick a target injection point
		for(t1 in finalGraph){
			if(delta < (distances[user][t1] + distances[user][finalGraph[t1].target] - finalGraph[t1].distance)){
				u1 = t1;
				u2 = finalGraph[t1].target;
				delta = (distances[user][t1] + distances[user][finalGraph[t1].target] - finalGraph[t1].distance);
			}
		}
		//Inject
		finalGraph[user] = [];
		finalGraph[u1].target = user;
		finalGraph[user].target = u2;
		finalGraph[u1].distance = distances[user][u1];
		finalGraph[user].distance = distances[user][u2];
	}
	//And apply to our assasins
	for(user in finalGraph)
	{
		assasins[user].target = assasins[finalGraph[user].target].id
	}
	//Finished
}


module.exports = Assasin;

