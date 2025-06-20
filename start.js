import inquirer from 'inquirer';
import { createServer } from 'vite';
import config from './vite.config.js';

async function start() {
  const { protocol } = await inquirer.prompt([
    {
      type: 'list',
      name: 'protocol',
      message: 'Welches Protokoll möchtest du verwenden?',
      choices: ['http', 'https'],
      default: 'https'
    }
  ]);

  const isHttps = protocol === 'https';

  // Passe die Config dynamisch an
  const customConfig = {
    ...config,
    server: {
      ...config.server,
      https: isHttps,
    },
  };

  const server = await createServer(customConfig);
  await server.listen();

  console.log(`Server läuft unter ${isHttps ? 'https' : 'http'}://localhost:${customConfig.server.port}`);
}

start();
