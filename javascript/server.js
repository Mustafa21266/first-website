var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var users = [
  {
    "id": "1",
    "text": "Mustafa"
  },
  {
    "id": "2",
    "text": "Ali"
  },
  {
    "id": "3",
    "text": "Ibrahim"
  }
]

app.get('/users',function (request, response) {
  response.send(users);
})

app.post('/users',function (request, response){
  var user = request.body;
  if(!user || user.text === ""){
    response.status(500).send({error: "No Users Found"});
  }
  else{
    users.push(user);
    response.status(200).send(users);
  }
}
);

app.put("/users/:userId",function (request, response) {
  var newText = request.body.text;
  if(!newText || newText === ""){
    response.status(500).send({error: "no Text not Allowed"});
  } else{
    for(i=0; i < users.length; i++){
        var objectFound = false;
        var user = users[i];
        if(user.id === request.params.userId){
          user.text = newText;
          objectFound = true;
          break;
        }
      }
      if(!objectFound){
        response.status(500).send({error: "ID not found"});
      }else{
        response.send(users);
      }
  }
});

app.listen(3000,function () {
  console.log("First API Running on port 3000");
})
