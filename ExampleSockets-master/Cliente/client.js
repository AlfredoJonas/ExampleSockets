var net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var client = new net.Socket();

client.connect(1801, '190.204.43.12', () => {
    console.log('Connected');
});

client.on('data', (data) => {
    console.log('Hemos recibido: ' + data);

    if (data.toString('utf8').toLowerCase() == 'close') {
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

client.on('close', () => {
    console.log('Connection closed');
});