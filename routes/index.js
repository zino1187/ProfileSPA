var express = require('express');
var oracledb = require("oracledb");
var router = express.Router();

var pool;//접속객체 모여 있는 풀...
oracledb.autoCommit = true;

//커넥션풀 객체 생성...
oracledb.createPool({
  user: "ng",
  password: "ng",
  connectString: "localhost/XE"
}, function (error, connectionPool) {
  if (error) {
    console.log(error);
  } else {
    pool = connectionPool;
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

  var name = request.body.name;
  var age = request.body.age;
  var job = request.body.job;

  oracledb.getConnection(pool, function (err, con) {
    if (err) {
      console.log(err);
    } else {
      var sql = "insert into profile(profile_id, name,age,job)";
      sql += " values(seq_profile.nextval,:name,:age,:job)";

      con.execute(sql, [name, age, job], function (e, result) {
        if (e) {
          console.log(e);
          //에러났다고 알려주자!!, 방식은 json으로...
          response.writeHead(500, { "Content-Type": "text/json" });
          response.end(JSON.stringify({
            result: 0,
            msg: "ㅠㅠ"
          }));

        } else {
          console.log("입력성공");

          //방금 insert 된 sequence 가져오기 (without mybatis)
          sql = "select seq_profile.currval as profile_id from dual";
          con.execute(sql, function (eerr, result, fields) {
            if (eerr) {
              console.log(eerr);
            } else {
              console.log(result);
              
              response.writeHead(200, { "Content-Type": "text/json" });
              response.end(JSON.stringify({
                result: 1,
                msg: "^_^",
                profile_id: result.rows[0]
              }));
            }
            con.close(function(er){
              if(er)console.log(er);
            });
          });


        }
        
        
      });
    }
  });

});

//삭제요청 처리
router.get('/profile/del', function (request, response, next) {
  //get방식의 파라미터 받기!!
  console.log(request.query);
  var profile_id=request.query.profile_id;

  oracledb.getConnection(pool, function(error, con){
    if(error){
      console.log(error);
    }else{
      var sql="delete profile where profile_id=:profile_id";  
      con.execute(sql,[profile_id], function(err,result){
        if(err){
          console.log(err);
        }else{
           console.log(result);   
           if(result.rowsAffected==0){
              response.writeHead(500,{"Content-Type":"text/json"});
              response.end(JSON.stringify({
                result:0,
                msg:"삭제실패"
              }));
           }else{
            response.writeHead(200,{"Content-Type":"text/json"});
            response.end(JSON.stringify({
              result:1,
              msg:"삭제성공"
            }));
           }
        }
        con.close(function(er){
          if(er)console.log(er);
        });
      });    
    }
  });
  
});

module.exports = router;
