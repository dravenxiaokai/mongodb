var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  //初始化    
var db = mongoose.connect('mongodb://localhost/segment');
//注意大坑：如果是user对应的数据集会自动变成users    
var User = mongoose.model('user', new mongoose.Schema({
    email: String,
    pwd: String,
    nicheng: String,
}, { _id: true }));
var user = new User({ uname: 'dd', pwd: 'dd' });
user._id = 6;
user.nicheng = '张三';
user.age = 20;            //无效    
//-----增加--------------------------    
/*    
user.save(function(err){    
    console.log(err);    
        res.send(user._id);  
    db.disconnect();    //关闭连接    
});    
*/
//------修改一条-------------------------
//注意:必须用类名(首字母大写的User)
/*    
User.update({_id:4},{$set: { nicheng: '张三' }},function(err,rs){    
    console.log(rs);    
    db.disconnect();    //关闭连接    
});    
*/
//-----修改多条-----------------------------    
/*    
User.update({nicheng:'李四'},{$set: { nicheng: '张三' }},{multi:true},function(err,rs){    
    console.log(rs);    
    db.disconnect();    //关闭连接    
});    
*/
//-----删除-------------------------    
/*    
User.remove({_id:4},function(err,rs){    
    console.log(rs);    
    db.disconnect();    //关闭连接    
})    
*/
//---------查询--------------------    
/*    
User.find(function(err, rs){    
    console.log(rs);    
});    
    
User.find({uname:'cc'},function(err,rs){    
    console.log(rs);    
    db.disconnect();    //关闭连接    
})    
*/
//--------查一条---------------    
User.findOne({}, function (err, rs) {
    console.log(rs);
    db.disconnect();    //关闭连接    
})