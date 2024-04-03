import net from 'net';
// C.A.M - importar la clase.
// C.A.M - Directa
//const client = net.connect({port: 60300});
//Ahora le pasamos el socket al objeto de nuestra clase que es capaz de emitir eventos gracias a la herencia.

const client = net.connect({port: 60300});
  client.write(process.argv[2]);
  client.on('data', (dataJSON) => {
    const data = JSON.parse(dataJSON.toString());
    if (data.type === 'data') {
      console.log('File has been modified.');
      console.log(`Previous size: ${data.data}`);
    } else if (data.type === 'error'){
      console.log(`Cant open`);
    } else {
      console.log(data);
    }
});