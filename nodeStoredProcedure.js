var MongoClient = require("mongodb").MongoClient;
var DB_URL = "mongodb://localhost:27017/mydb";

MongoClient.connect(DB_URL, function (error, db) {
    console.log("连接成功!");
    callProcess(db)
});

function callProcess(db) {
    db.eval("getUserRS(db.user.find({birthday:{$ne:null}}))", function (error, rs) {//不含有birthday的会报错，所以要加不为空的条件
        if (error) {
            console.log(error);
        } else {
            console.log("count:" + rs);
            rs.forEach(function (item) {
                console.log(item.name + ':' + item.birthday);
            })
        }
        db.close();
    });
}