var express = require('express');
var oracledb=require("oracledb");
var router = express.Router();

var pool;//접속객체 모여 있는 풀...
oracledb.autoCommit=true;

//커넥션풀 객체 생성...
oracledb.createPool({
  user:"ng",
  password:"ng",
  connectString:"localhost/XE"
} , function(error, connectionPool){
  if(error){
    console.log(error);
  }else{
      pool=connectionPool;
  }
});


/* 메인요청 page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* 등록요청 page. */
router.post('/profile/regist', function (request, response, next) {
  //클라이언트가 전송한 데이터를 받아보자!! 
  //당연히 JSON 형태로 날아온다 왜? express 모듈사용햇기에
  //post : request.body  
  //get: request.query
  console.log(request.body);
  
  var name=request.body.name;
  var age=request.body.age;
  var job=request.body.job;

  oracledb.getConnection(pool, function(err, con){
    if(err){
      console.log(err);
    }else{
      var sql="insert into profile(profile_id, name,age,job)";
      sql+=" values(seq_profile.nextval,:name,:age,:job)";
      
      con.execute(sql, [name,age,job], function(e, result){
        if(e){
          console.log(e);
        }else{
          console.log("입력성공");  
        }
        con.close(function(er){
          if(er)console.log(er);
        });
      });
    }   
  });

});



module.exports = router;
