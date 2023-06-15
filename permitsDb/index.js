import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("permitsDataBase.db");

export default db;
