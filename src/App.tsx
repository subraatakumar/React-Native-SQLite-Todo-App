import {View, Text, Button, TextComponent} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import ListTodos from './component/ListTodos';
import TodoInput from './component/TodoInput';
import {ExecuteSql} from './dbHelper';
import {TodosType} from './types';

export const db = openDatabase({name: 'mydatabase1.db'});
export const tblName = 'todotable';
// function createTable(tblName: string) {
//   console.log('Trying to drop table');
//   db.transaction(txn => {
//     txn.executeSql(
//       `DROP TABLE ${tblName}`,
//       [],
//       () => {
//         console.log('Table Dropped');
//       },
//       dbError,
//     );
//   });
//   console.log('Trying to create table');
//   db.transaction(txn => {
//     txn.executeSql(
//       `CREATE TABLE ${tblName}(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`,
//       [],
//       (tx, res) => dbSuccess(res, ''),
//       dbError,
//     );
//   });
// }

function dbError(e) {
  console.log(e);
}

function dbSuccess(res: string, msg: string = '') {
  console.log(res);
  console.log(msg);
}

const App = () => {
  const [todos, setTodos] = useState<TodosType>([]);

  useEffect(() => {
    console.log('useEffect');
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${tblName}`,
        [],
        async (tx, res) => {
          console.log('Row Length:', res.rows.length, res);
          if (res.rows.length == 0) {
            await ExecuteSql(db, `DROP TABLE IF EXISTS ${tblName}`);
            await ExecuteSql(
              db,
              `CREATE TABLE todotable(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`,
            );
          } else {
            let tempTodos = [];
            for (let i = 0; i < res.rows.length; i++) {
              tempTodos.push(res.rows.item(i));
            }
            setTodos(tempTodos);
          }
        },
        async e => {
          console.log('Unable to open table', e);
          await ExecuteSql(db, `DROP TABLE IF EXISTS ${tblName}`);
          await ExecuteSql(
            db,
            `CREATE TABLE todotable(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`,
          );
        },
      );
    });
  }, [db]);
  async function onClick() {
    ExecuteSql(db, 'INSERT INTO todotable (task, status) VALUES (?,?)', [
      'new Task',
      0,
    ])
      .then(async res => {
        dbSuccess(res, `Inserted :${res.insertId}`);
        let data = await ExecuteSql(
          db,
          `SELECT * FROM ${tblName} WHERE id=${res.insertId}`,
        );
        setTodos(prev => [...prev, data.rows.item(0)]);
      })
      .catch(e => {
        dbError(e);
      });
  }
  return (
    <View style={{flex: 1}}>
      <Text>Todo App</Text>
      <TodoInput setTodos={setTodos} />
      <ListTodos todos={todos} setTodos={setTodos} />
    </View>
  );
};

export default App;
