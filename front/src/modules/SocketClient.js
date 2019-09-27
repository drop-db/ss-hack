import io from 'socket.io-client';

export default class SocketClient {
    constructor({events, url}) {
        this.socket = io(url, {transports: ['websocket']});
        this.socket.on('connect', () => {
            console.log('socker connected');
        });
            events.forEach(({key, handler}) => {
            this.socket.on(key, handler);
        });
    }

    send = async (event, data) => {
        return new Promise((resolve, reject) => {
            this.socket.emit(event, data, (result) => resolve(result));
        });
    };

    disconnect = () => {
        this.socket.close();
    };
};
