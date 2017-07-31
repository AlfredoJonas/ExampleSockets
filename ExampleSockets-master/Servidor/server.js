var net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var server = net.createServer((client) => {

    console.log('Client connected');
    client.write("Hola vale");

    client.setEncoding();
    client.on('data', (data) => {

        console.log('Hemos recibido: ' + data);

        if (data.toLowerCase() == 'close') {
            client.write('Nos vemos al rato Jonasito');
            client.destroy();
        }

        rl.question('Desea responder con el mismo mensaje (s/n): ', (respuesta) => {
            switch (respuesta.toUpperCase()) {
                case 'S':
                    client.write(data);
                    break;
                case 'N':
                    rl.question('Escriba la respuesta: ', (respuesta) => {
                        client.write(respuesta);
                    });
                    break;

                default:
                    console.log('Tienes que responder algo mi pana');
                    break;
            }
        });
    });

    client.on('end', () => {
        console.log('Client disconnected');
    });

    client.pipe(client);
});

server.listen(1801);