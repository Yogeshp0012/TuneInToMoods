import { defineFunction, secret } from '@aws-amplify/backend';

export const sayHello = defineFunction({
  name: 'spotify',
  environment: {
    NAME: 'World',
    CLIENT_ID: secret('CLIENT_ID'),
    CLIENT_SECRET: secret('CLIENT_SECRET'),
  },
  entry: './handler.ts',
  timeoutSeconds: 60,
});
