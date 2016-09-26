let username = 'laike';

exports.sayName = function() {
    console.log(username);
}

exports.log = (msg) => {
    console.log(msg);
}
exports.loadNews = (data) => {

}
module.exports.login = () => {
    let req = require('request');
    req.get('http://demo/newsapi.php', (err, data) => {
        var data = JSON.parse(data);
        loadNews(data);
    });
}

for (let i = 0; i < 10; i++) {
    console.log(i);
}