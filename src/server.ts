import net from 'net';

// creamos un servidor que tendrá un socket como puente con un cliente.
const server = net.createServer((connection) => {
  // Lo primero que haremos es informar de que un cliente se ha conectado, pero esto saldrá en la consola del servidor.
  console.log('A client has connected.');
  // Establecemos un mensaje por partes.
  const firstData = '{"type": "change", "prevSize": 13';
  const secondData = ', "currSize": 27}\n';

  // Este mensaje será el primero que se envíe al cliente.
  connection.write(firstData);

  // Establecemos un temporizador para que el mensaje se envíe al cliente.
  const timer = setTimeout(() => {
    connection.write(secondData);
    connection.end();
  }, 500);

  // Si conecction toma el valor end se cerrará el temporizador.
  connection.on('end', () => {
    clearTimeout(timer);
  });

  // Si el cliente se desconecta, se mostrará un mensaje en la consola del servidor.
  connection.on('close', () => {
    console.log('A client has disconnected');
  });
});

// El servidor escuchará en el puerto 60300.
server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});