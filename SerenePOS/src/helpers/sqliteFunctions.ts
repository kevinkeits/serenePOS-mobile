// sqliteFunctions.ts

import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native';

// Open or create SQLite database
export const db = SQLite.openDatabase(
  { name: 'serene_db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => console.log('Error opening database', error)
);

// General function to create tables dynamically
export const createTable = (tableName: string, columns: string) => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`,
      [],
      () => console.log(`Table ${tableName} created successfully`),
      error => console.log(`Error creating table ${tableName}`, error)
    );
  });
};

// General function to insert or replace data into any table
export const insertData = (tableName: string, columns: string[], values: any[]) => {
  const placeholders = columns.map(() => '?').join(', ');
  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
      values,
      () => Alert.alert(`${tableName}`, `Data inserted successfully.`),
      error => console.log(`Error inserting data into ${tableName}`, error)
    );
  });
};

// General function to fetch data from any table
export const fetchLocalData = <T>(tableName: string, condition?: string, params: any[] = []): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      const query = condition ? `SELECT * FROM ${tableName} WHERE ${condition}` : `SELECT * FROM ${tableName}`;
      db.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (tx, results) => {
            const rows = results.rows;
            const data: T[] = [];
            for (let i = 0; i < rows.length; i++) {
              data.push(rows.item(i));
            }
            resolve(data);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  };

  // Modified function to return a single object or null
export const fetchLocalDataObject = async <T>(tableName: string, condition?: string, params: any[] = []): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    const query = condition ? `SELECT * FROM ${tableName} WHERE ${condition}` : `SELECT * FROM ${tableName} LIMIT 1`;
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (tx, results) => {
          const rows = results.rows;
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};