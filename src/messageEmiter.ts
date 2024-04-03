// Si queremos que nuestra clase emita eventos debe hederar de EventEmiter.
import {EventEmitter} from 'events';

// Nuestra clase gestionará los mensajes aun que venga separados.
export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    // Sobre el socket que se nos pasa, escuchamos los eventos de tipo data, que enviará el servidor, entonces le sumaremos a la variable
    // el mensaje.
    connection.on('data', (dataChunk) => {
      const message = dataChunk;
      this.emit('message', JSON.parse(message));
    });
  }
}