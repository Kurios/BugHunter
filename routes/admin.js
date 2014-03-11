/**
 * New node file
 */

exports.admin = function(req, res){
	console.log(req.body);
	if(req.body['action']){
		console.log(req.body);
		var user = null;
		for(var i in assasins){
			if(assasins[i].id == req.body['id'])
				user = assasins[i];
		}
		if(user === null){
			console.log("user not found")
			res.render('admin', { title: 'Bug Squasher : Admin' , activePlayers: 20, Assasins:assasins});
		}else if(req.body['action'] == "Update"){
			user.name = req.body['name'];
			user.email= req.body['email'];
			user.location = req.body['location'];
			user.target = req.body["target"];
			user.nickname = req.body["nickname"];
			user.status = req.body["status"];
			res.render('admin2', { title: 'Bug Squasher : Admin' , User:user});
		}else if(req.body['action'] == "Kill"){
			var user2 = null;
			for(var i in assasins){
				if(assasins[i].id == req.body['targetID'])
					user2 = assasins[i];
			}
			if(user2 === null){
				res.render('admin', { title: 'Bug Squasher : Admin' , activePlayers: 20, Assasins:assasins});
			}else{
				user.kill(user2);
				res.render('admin', { title: 'Bug Squasher : Admin' , activePlayers: 20, Assasins:assasins});
			}
		}
	}else if(req.query['id'] != null ){
		console.log(req.query);
		var user = null;
		for(var i in assasins){
			if(assasins[i].id == req.query['id'])
				user = assasins[i];
		}
		console.log(user)
		if(user === null)
		{
			res.render('admin', { title: 'Bug Squasher : Admin' , activePlayers: 20, Assasins:assasins});
		}else
		res.render('admin2', { title: 'Bug Squasher : Admin' , User:user});
	}else{
  	res.render('admin', { title: 'Bug Squasher : Admin' , activePlayers: 20, Assasins:assasins});
  	}
};