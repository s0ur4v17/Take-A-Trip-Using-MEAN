const mongoose = require('mongoose');
var gracefulShutdown;

var dbUri = 'mongodb+srv://s0ur4v:CDoUMvZgC8FwXBPY@cluster0.gf8nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUri, {dbName: 'tripDB'}); 

//Connection Events
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbUri);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected.');
});

gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

process.on('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

require('./trips');