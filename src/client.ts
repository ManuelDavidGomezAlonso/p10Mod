import net from 'net';

const client = net.connect({port: 60300});
  client.write(process.argv[2]);
  client.on('data', (dataJSON) => {
    const data = JSON.parse(dataJSON.toString());
    if (data.command === "wc") {
      console.log(`\nNumber of Lines in ${process.argv[2]}: ${data.data}\n`);
    } else {
      console.log("file, not found");
    }
});