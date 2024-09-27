// src/config/db.d.ts
import { Pool } from 'pg';

declare module 'config/db' {
  const pool: Pool;
  export default pool;
}