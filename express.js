var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var db = new mongodb.Db('mydb', server, { safe: true });

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.all('/zhuce', function (req, res) {
    subflag = req.body['subflag'];
    if (subflag == undefined) {
        res.render('zhuce');
    } else {
        //操作mongodb 
        //res.send('收到参数:'+req.body['email']); 
        db.open(function (err, db) {
            if (err) {
                console.log(err);
                return;
            }
            db.collection('user', { safe: true }, function (err, collection) {
                if (err) {
                    console.log(err);
                }
                //-----生成objId------------------ 
                var obj_id = mongodb.ObjectID.createFromHexString(req.body['id']);
                //var userObj = {email:req.body['email'],pwd:req.body['pwd']};  
                var userObj = { pwd: req.body['pwd'] };
                //------插入一条记录------------ 
                //collection.insert(userObj,{safe:true},function(err, result){ 
                //------修改一条记录------------ 
                //collection.update({_id:obj_id},{$set:userObj},{safe:true},function(err, result){ 
                //------删除一条记录------------ 
                collection.remove({ _id: obj_id }, { safe: true }, function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //console.log(result);     
                    db.close(); //关闭连接   
                    res.send('收到参数:' + req.body['email']);
                });
            });
        });
    }
})

module.exports = router;