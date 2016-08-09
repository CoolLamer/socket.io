var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usersOnline = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

var x = 5;
var y = 5;

io.on('connection', function(socket){
    usersOnline++;
    io.emit('online',  usersOnline);
    io.emit('position', {x: x, y: y});

    socket.on('disconnect', function(){
        usersOnline--;
        io.emit('online', usersOnline)
    });

    socket.on('move', function(direction){
        switch(direction){
            case 'up':
                y--;
                break;
            case  'down':
                y++;
                break;
            case 'right':
                x++;
                break;
            case 'left':
                x--;
                break;
        }
        io.emit('position', {x: x, y: y});
    })
});
