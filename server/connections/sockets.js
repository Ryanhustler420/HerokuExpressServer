const socket = require('socket.io');

const streams = function ({ server, app }) {

    // client emits and server listens
    const ON_EVENTS = {
        connection: 'connection', // this is immutable, this is not user defined, let it be the way it is!
        register_client: 'register_client',
        get_connection_details: 'get_connection_details',
        register_android_client: 'register_android_client',
    }

    // server emits and client listens
    const EMIT_EVENTS = {
        welcome_android: 'welcome_android',
        take_connection_details: 'take_connection_details',
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    const io = socket(server, { allowEIO3: true });
    io.sockets.on(ON_EVENTS.connection, function (socket) {

        socket.on(ON_EVENTS.register_android_client, args => {
            console.log(args);
            socket.emit(EMIT_EVENTS.welcome_android, string({ message: 'welcome to appname' }))
        });

        socket.on(ON_EVENTS.get_connection_details, args => {

        });

    });
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    const parse = function (string = '{}') {
        return JSON.parse(string);
    }

    const string = function (obj = {}) {
        return JSON.stringify(obj);
    }

    // On React Side Code
    /**
        import socketIOClient from "socket.io-client";
        const ENDPOINT = "http://localhost:3002";

        useEffect(() => {
            const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
            socket.emit("client-on-event", 'This is message from react');
            socket.on("server-on-event", data => {
                console.log('message from server ' + data);
            });
        });
    */

}

module.exports = streams;