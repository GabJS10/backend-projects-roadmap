import { program } from 'commander';
import { client, initServer } from '../app';
program.version('1.0.0').description('Caching proxy');

program
  .command('caching-proxy') // Especificamos el comando
  .description('Start caching proxy')
  .allowUnknownOption() // Permite opciones no reconocidas (puede ayudar en algunos casos)
  .option('-p, --port <port>', 'Port to run the server on')
  .option('-o, --origin <origin>', 'Origin URL')
  .option('-c, --clear-cache', 'Clear cache')
  .action(async (options) => {
    const { port, origin, clearCache } = options; // Extraemos correctamente las opciones

    if (clearCache) {
      const keys = await client.keys('proxy:*'); // Obtenemos todas las claves que comienzan con "proxy:"

      for (const key of keys) {
        await client.del(key);
      }

      console.log('Cache cleared.');
    } else {
      if (!port || !origin) {
        console.error(
          'Error: Missing required options -p (port) and -o (origin).',
        );
        process.exit(1);
      }
      initServer(parseInt(port), origin);
    }
  });

program.parse(process.argv);
