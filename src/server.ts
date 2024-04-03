import net from 'net';
import {spawn} from 'child_process';
import fs from 'fs';

const server = net.createServer((connection) => {

  console.log('A client has connected.');
  connection.on('data', (data)=>{
  const fileName = data
  if (fs.existsSync(fileName)) {
    const cat = spawn('cat', [`${fileName}`]);
    const wc = spawn('wc',['-l']);
    let stringcontent = '"data": "';

    wc.stdout.pipe(cat.stdin).on('data', (data) =>{
      stringcontent += data;
    });
    
    stringcontent = `${stringcontent}"`
    console.log(stringcontent);
    const json = `{"command": "wc", "file": "helloworld.txt", ${stringcontent}}`;
    console.log(json);
    connection.write(JSON.stringify(json)); 
    } else {
      connection.write(JSON.stringify(`{"error": "No existe el fichero"}`));
    }
  });

  connection.on('close', () => {
    console.log('A client has disconnected');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});