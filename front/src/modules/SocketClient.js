import io from 'socket.io-client';

export default class SocketClient {
    constructor({events, url}) {
        const user = JSON.parse(localStorage.getItem('sunCityUser'));

        this.socket = io(`${url}?accessToken=${user.accessToken}`, {transports: ['websocket']});
        this.socket.on('connect', () => {
            console.log('socket connected');
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
