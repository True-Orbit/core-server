
import knex, { Knex } from 'knex';
import config from '../knexfile';
import 'dotenv/config';

const NODE_ENV = process.env.NODE_ENV || 'local';
const db: Knex = knex(config[NODE_ENV]);

interface ColumnInfo {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
}

async function inspectSchema(): Promise<void> {
  try {
    // Query columns information for tables in the 'public' schema
    const result = await db.raw(`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);

    // Depending on the DB, the result may be nested. For PostgreSQL, it's in result.rows.
    const columns: ColumnInfo[] = result.rows;

    // Group columns by table name
    const schema: { [tableName: string]: ColumnInfo[] } = {};

    columns.forEach((col) => {
      if (!schema[col.table_name]) {
        schema[col.table_name] = [];
      }
      schema[col.table_name].push(col);
    });

    // Output the schema details
    Object.entries(schema).forEach(([tableName, cols]) => {
      console.log(`Table: ${tableName}`);
      cols.forEach((col) => {
        console.log(`  Column: ${col.column_name} | Type: ${col.data_type} | Nullable: ${col.is_nullable}`);
      });
      console.log(''); // Empty line for readability
    });
  } catch (error) {
    console.error('Error fetching schema information:', error);
  } finally {
    // Clean up the connection
    await db.destroy();
  }
}


inspectSchema();
