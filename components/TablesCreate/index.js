import db from "../../permitsDb";

const TableCreate=()=>
{
    db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ScoresTable (id INTEGER PRIMARY KEY AUTOINCREMENT,criteriaId varchar,criteriaName varchar,factorId varchar,maxScore INTEGER,question varchar,score integer,comment varchar,PermitNumber varchar)",
          )
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS ComplianceFacters (id INTEGER PRIMARY KEY AUTOINCREMENT,factorId varchar,factorName varchar,PermitNumber varchar, Quarter varchar,permitTypeId varchar )"
        )
        })
}

export default TableCreate;