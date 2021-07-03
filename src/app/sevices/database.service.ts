import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dbProfile = { name:"barcode.db", location: "default"};
  
  constructor(private db: SQLite) { }

  async initDB(): Promise<any>{
    const connection = await this.db.create(this.dbProfile);
    const sql = 'CREATE TABLE IF NOT EXISTS BarcodeHistory (id INTEGER PRIMARY KEY AUTOINCREMENT, text VARCHAR, format VARCHAR)';
    return await connection.executeSql(sql, []);
  }

  async saveBarcodeInfo(barcodeData): Promise<any>{
    const connection = await this.db.create(this.dbProfile);
    const sql = 'INSERT INTO BarcodeHistrory (text,format) VALUES (?,?)';
    return await connection.executeSql(sql,[barcodeData.text,barcodeData.format]);
  }

  async getAllBarcode(): Promise<any>{
    const connection = await this.db.create(this.dbProfile);
    const sql = 'SELECT * FROM BarcodeHistory ORDER BY id DESC';

    const sqlResult = await connection.executeSql(sql,[]);

    let result = [];

    if(sqlResult.rows.length > 0){
      for (let index = 0; index < sqlResult.rows.length; index++) {
        let row = sqlResult.rows.item(index);
        result.push(row);
        
      }
    }
    
    return result;
  }
}
