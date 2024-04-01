// Si queremos que nuestra clase emita eventos debe hederar de EventEmiter.
import {EventEmitter} from 'events';

// Nuestra clase gestionará los mensajes aun que venga separados.
export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    // Sobre el socket que se nos pasa, escuchamos los eventos de tipo data, que enviará el servidor, entonces le sumaremos a la variable
    // el mensaje.
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;
      // Hallamos el indice del salto de linea, el cual separará un mensaje de otro.
      let messageLimit = wholeData.indexOf('\n');
      // Si lo encontramos nos meteremos en el while, si no seguiremos sumando partes del mensaje hata tenerlo.
      while (messageLimit !== -1) {
        // Como podemos tener más de un mensaje.
        // Cogemos el mensaje.
        const message = wholeData.substring(0, messageLimit);
        // Actualizamos nuestra variable para que ya no contenga el mensaje.
        wholeData = wholeData.substring(messageLimit + 1);
        // Emitimos el mensaje, por esto cambiaremos el cliente.
        this.emit('message', JSON.parse(message));
        // Volvemos a buscar el salto de linea. Por si hubieran dos mensajes.
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}