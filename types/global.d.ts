declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    PWD: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
  }
}