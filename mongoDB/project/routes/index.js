var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
    // return res.redirect('/Test_html.html');
  res.send('你好，这是默认页面');
}); 

module.exports = router; 
