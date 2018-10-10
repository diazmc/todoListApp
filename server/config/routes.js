var tasks = require('../controllers/tasks.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/tasks', function(req, res) {
        tasks.show(req, res);
    });

    app.get('/task/edit/:id', function(req, res) {
        tasks.displayOne(req, res);
    });

    app.get('/tasks/completed', function(req, res) {
        tasks.showCompletedTasks(req, res);
    })

    app.post('/tasks/new', function(req, res) {
        tasks.create(req, res);
    });

    app.post('/task/update/:id', function(req, res) {
        tasks.update(req, res);
    })

    app.post('/task/complete/:id', function(req, res) {
        tasks.done(req, res);
    })

    app.post('/task/destroy/:id', function(req, res) {
        tasks.delete(req, res);
    })
}