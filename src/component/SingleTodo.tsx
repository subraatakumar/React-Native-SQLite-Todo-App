import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {db, tblName} from '../App';
import {ExecuteSql} from '../dbHelper';
import {TodoType} from '../types';
import EditTodo from './EditTodo';

const SingleTodo = ({todo, setTodos}: {todo: TodoType; setTodos: Function}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [tempData, setTempData] = useState('');

  return (
    <>
      {showEdit ? (
        <>
          <EditTodo todo={todo} setShowEdit={setShowEdit} setTodos={setTodos} />
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowEdit(true)}>
            <Text>{todo.task}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await ExecuteSql(
                db,
                `DELETE FROM ${tblName} WHERE id=${todo.id}`,
              );
              setTodos((prev: TodoType[]) =>
                prev.filter(t => t.id !== todo.id),
              );
            }}>
            <Text
              style={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: 2,
                width: 18,
                textAlign: 'center',
              }}>
              X
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default SingleTodo;
