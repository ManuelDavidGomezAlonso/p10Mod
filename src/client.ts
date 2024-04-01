import net from 'net';
// C.A.M - importar la clase.
import { MessageEventEmitterClient } from './messageEmiter.js';

// C.A.M - Directa
//const client = net.connect({port: 60300});
//Ahora le pasamos el socket al objeto de nuestra clase que es capaz de emitir eventos gracias a la herencia.

const client = new MessageEventEmitterClient(net.connect({port: 60300}));

// C.A.M - Como nuestra clase maneja los mensajes no nos hace falta esta variable.
//let wholeData = '';
//client.on('data', (dataChunk) => {
//  wholeData += dataChunk;
//});

// C.A.M - Como el evento que emitira clase es message, y no hay que esperar al final, 
// simplemente emitira el json con el mensaje directamente.

//client.on('end', () => {
// Ahora el evento sera de tipo message, y además recibiremos directamente el JSON.
  client.on('message', (message) => {
  // C.A.M - Ya no necesitamos el parseo del JSON, nos lo da la clase directamtente.
  //const message = JSON.parse(wholeData);
  if (message.type === 'watch') {
    console.log(`Connection established: watching file ${message.file}`);
  } else if (message.type === 'change') {
    console.log('File has been modified.');
    console.log(`Previous size: ${message.prevSize}`);
    console.log(`Current size: ${message.currSize}`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});