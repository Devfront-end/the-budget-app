declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const value: string;
    export default value;
  }
  
declare module './routes/expenseRoutes';
declare module './routes/incomeRoutes';
declare module './routes/signupRoute';
declare module './config/db';
declare module './app';