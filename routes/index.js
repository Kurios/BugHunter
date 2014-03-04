
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Bug Squasher' , activePlayers: 20});
};