import React, {useEffect, useState} from 'react';
import {TextInput, Text, TouchableOpacity} from 'react-native';
import {db, tblName} from '../App';
import {ExecuteSql} from '../dbHelper';
import {TodosType, TodoType} from '../types';

const changeTask = async (
  todoText: string,
  id: Number,
  setShowEdit: Function,
  setTodos: Function,
) => {
  await ExecuteSql(db, `UPDATE ${tblName} SET task= ? WHERE id=?`, [
    todoText,
    id,
  ]);
  setShowEdit(false);
  setTodos((p: TodosType) =>
    p.map((t: TodoType) => (t.id == id ? {...t, task: todoText} : t)),
  );
};

const EditTodo = ({
  todo,
  setShowEdit,
  setTodos,
}: {
  todo: TodoType;
  setShowEdit: Function;
  setTodos: Function;
}) => {
  const [todoText, setTodoText] = useState('');
  useEffect(() => {
    setTodoText(todo.task);
  }, [todo]);

  return (
    <>
      <TextInput
        value={todoText}
        onChangeText={t => {
          setTodoText(t);
        }}
        style={{height: 40}}
      />
      <TouchableOpacity>
        <Text
          onPress={() => {
            console.log(todo);
            changeTask(todoText, todo.id, setShowEdit, setTodos);
          }}>
          ✔️
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default EditTodo;
