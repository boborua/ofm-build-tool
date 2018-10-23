declare module NodeJS {
  interface Global {
    env: {
      version: string;
      ip: string;
      nginx: boolean;
    }
  }
}