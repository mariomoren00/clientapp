import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the ClientsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientsProvider {

  db: SQLiteObject = null;
  
  constructor() {
    console.log('Hello ClientsProvider Provider');
  }

  setDatabase(db: SQLiteObject){
    console.log(db);
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT, enterprise TEXT, latitude TEXT, longitude TEXT)';
    return this.db.executeSql(sql, []);
  }
  
  getAll(){
    let sql = 'SELECT * FROM clients';
    return this.db.executeSql(sql, [])
    .then(response => {
      let clients = [];
      for (let index = 0; index < response.rows.length; index++) {
        clients.push( response.rows.item(index) );
      }
      return Promise.resolve( clients );
    })
    .catch(error => Promise.reject(error));
  }

  create(client: any){
    let sql = 'INSERT INTO clients(name, phone, email, enterprise, latitude, longitude) VALUES(?,?,?,?,?,?)';
    return this.db.executeSql(sql, [client.name, client.phone, client.email, client.enterprise, client.latitude, client.longitude]);
  }

  update(client: any){
    let sql = 'UPDATE clients SET name=?, phone=?, email=?, enterprise=?, latitude=?, longitude=? WHERE id=?';
    return this.db.executeSql(sql, [client.name, client.phone, client.email, client.enterprise, client.latitude, client.longitude, client.id]);
  }

  delete(client: any){
    let sql = 'DELETE FROM clients WHERE id=?';
    return this.db.executeSql(sql, [client.id]);
  }
}
