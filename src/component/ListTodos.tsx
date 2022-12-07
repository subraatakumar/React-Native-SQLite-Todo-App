import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {TodosType, TodoType} from '../types';
import {ExecuteSql} from '../dbHelper';
import {db, tblName} from '../App';
import SingleTodo from './SingleTodo';

export default function ListTodos({
  todos,
  setTodos,
}: {
  todos: TodosType;
  setTodos: Function;
}) {
  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
        List Of Todos
      </Text>
      {todos.map((todo: TodoType) => (
        <View
          key={todo.id}
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            margin: 5,
            padding: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <SingleTodo todo={todo} setTodos={setTodos} />
        </View>
      ))}
    </View>
  );
}
