let express = require('express');
let path = require('path');
let app = express();
//Adding middleware CORS
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 5000)
app.get("/*",function(req,res){
  res.sendFile(path.join(__dirname + '/dist/index.html'))
});
