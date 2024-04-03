import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/messageEmiter.js';

// Creamos un test para la clase MessageEventEmitterClient.
describe('MessageEventEmitterClient', () => {
  it('Should emit a message event once it gets a complete message', (done) => {
    // Creamos un socket que será un EventEmitter.
    const socket = new EventEmitter();
    // Creamos un cliente con el socket.
    const client = new MessageEventEmitterClient(socket);
    // Escuchamos el evento message.
    client.on('message', (message) => {
      expect(message).to.be.eql({'type': 'change', 'prev': 13, 'curr': 26});
      done();
    });
    // Cada vez que se emita un mensaje en el socket, nos saltará el manejador de prueba del cliente.
    // mandamos al socket a que emita un mensaje por partes además.
    socket.emit('data', '{"type": "change", "prev": 13');
    socket.emit('data', ', "curr": 26}');
    socket.emit('data', '\n');
  });
});