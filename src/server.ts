import net from 'net';
import {spawn} from 'child_process';
import fs from 'fs';

const server = net.createServer((connection) => {

  console.log('A client has connected.');
  connection.on('data', (data)=>{
  const fileName = data.toString().trim();

  if (fs.existsSync(fileName)) {
    const cat = spawn('cat', [`${fileName}`]);
    const wc = spawn('wc',['-l']);
    let lineCount = '';
        wc.stdout.on('data', (data) => {
      lineCount += data.toString();
    });

    cat.stdout.pipe(wc.stdin);
  
    wc.on('close', () => {
      connection.write(JSON.stringify({'command': 'wc', 'file': fileName, 'data': lineCount.trim()}) + '\n'); 
      connection.end();
    });
    
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