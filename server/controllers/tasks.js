var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = {
    show: function(req, res) {
        Task.find({completed: false}, function(err, tasks) {
            if(tasks) {
                res.render('tasks', {tasks: tasks});
            }
            else {
                res.render('tasks');
            }
        })
    },

    create: function(req, res) {
        console.log('Post Data', req.body);
        var task = new Task({name: req.body.name, info: req.body.info});
        task.save(function(err){
            if(err) {
                console.log('Something went wrong');
                res.redirect('/');
            }
            else {
                res.redirect('/tasks');
            }
        })
    },

    displayOne: function(req, res) {
        Task.find({_id: req.params.id}, function(err, task) {
            if(err) {
                console.log('Error', err);
            } 
            else {
                res.render('edit', {task: task});
            }
        });
    },

    update: function(req, res) {
        Task.update(
            {_id: req.params.id}, 
            {$set: {
                'name': req.body.name,
                'info': req.body.info
            }},
            function(err) {
                if(err) {
                    console.log('Error', err);
                }
                else {
                    res.redirect('/tasks');
                }
            }
        );
    },

    done: function(req, res) {
        Task.update(
            {_id: req.params.id}, 
            {$set: {
                'completed': true
            }},
            function(err) {
                if(err) {
                    console.log('Error', err);
                }
                else {
                    res.redirect('/tasks/completed');
                }
            }
        )

    },

    showCompletedTasks: function(req, res) {
        Task.find({completed: true}, function(err, tasks) {
            if(tasks) {
                res.render('completed', {tasks: tasks});
            }
            else {
                res.render('completed');
            }
        });
    },

    delete: function(req, res) {
        Task.remove({_id: req.params.id}, function(err){});
        res.redirect('/tasks');

    }
}