import net from 'net';

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
      console.log(data, "Error comprobado");
    }
});