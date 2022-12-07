import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {ExecuteSql} from '../dbHelper';
import {db, tblName} from '../App';

const TodoInput = ({setTodos}) => {
  const [val, setVal] = useState('');

  async function onClick() {
    ExecuteSql(db, 'INSERT INTO todotable (task, status) VALUES (?,?)', [
      val,
      0,
    ])
      .then(async res => {
        //dbSuccess(res, `Inserted :${res.insertId}`);
        let data = await ExecuteSql(
          db,
          `SELECT * FROM ${tblName} WHERE id=${res.insertId}`,
        );
        setTodos(prev => [...prev, data.rows.item(0)]);
        setVal('');
      })
      .catch(e => {
        //dbError(e);
      });
  }

  return (
    <View
      style={{margin: 20, backgroundColor: '#FFF', padding: 10, elevation: 3}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
        TodoInput
      </Text>
      <TextInput
        value={val}
        onChangeText={t => setVal(t)}
        style={{borderWidth: 1, borderColor: '#f2f2f2'}}
        placeholder="Enter Task Todo..."
      />
      <Button title="Add Task" onPress={() => onClick()} />
    </View>
  );
};

export default TodoInput;
