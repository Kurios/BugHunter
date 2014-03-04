/**
 * New node file
 */

exports.admin = function(req, res){
  res.render('admin', { title: 'Bug Squasher : Admin' , activePlayers: 20});
};