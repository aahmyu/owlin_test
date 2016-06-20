var db = require('../app/query');
var path = require('path');

module.exports = function(app){
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    });
    
    app.get('/api/news', function (req, res) {
       db.getNews(res);
    });

    app.get('/pinboards/', function (req, res) {
        db.getBoards(res);
    });

    app.get('/pinboards/:id/pins', function (req, res) {
        var id = req.params.id;
        db.getAllPinned(id,res);
    });

    app.post('/pinboards/', function (req, res) {
        db.newPinboard(req, res);
    });

    app.put('/pinboards/:id/pin/:artid', function (req, res) {
        var id = req.params.id;
        db.newPin(id, req, res);
    });
    

    app.delete('/pinboards/:id/delete', function (req, res) {
        var id = req.params.id;
        db.deleteBoard(id, res);
    });

    app.delete('/pinboards/:id/delete/:pinned', function (req, res) {
        var id = req.params.id;
        var pinned = req.params.pinned;
        db.unPin(id, pinned, res);
    });

};
