/**
 * New node file
 */

exports.index = function(req, res){
	if(registered){
	 if(req.body['name'] != null ){
		    console.log(req.body);
		    req.body.lastRun = Number(req.body.nextRun) + new Date().getTime();
		    var assasin = new Assasin(req.body.name,req.body.location,req.body.email);
		    var nick = assasin.nickname;
		    assasins[assasin.id] = assasin;
		    var ret = { title: 'Bug Squasher Registration' , activePlayers: 20, name:req.body.name, nick:nick};
		    console.log(ret);
		    res.render('register2', ret);
		  }else{
		    res.render('register', { title: 'Bug Squasher Registration' });
		  }
	}else{
		res.render('register3', { title: 'Bug Squasher Registration' });
	}
};
