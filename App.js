import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(null); 
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    setTasks([...tasks, { id: `${Date.now()}${task}`, text: task, completado: false }]);
    setTask('');
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completado: !t.completado } : t));
  }

  const taskDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const editTask = (id, newText) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    setEditMode(null); 
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.taskInput}
        placeholder='Agregar una tarea'
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar Tarea</Text>
      </TouchableOpacity>
      <ScrollView style={styles.tasksContainer}>
        {tasks.map((task) => (
          <View key={task.id}>
            {editMode === task.id ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.taskInput, { marginRight: 10, flex: 1 }]}
                  value={editedTask}
                  onChangeText={setEditedTask}
                />
                <TouchableOpacity onPress={() => editTask(task.id, editedTask)}>
                  <Text style={{ color: 'green', fontWeight: 'bold' }}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => toggleTaskComplete(task.id)}
                  onLongPress={() => taskDelete(task.id)}
                  style={[styles.task, task.completado && styles.completeTask]}
                >
                  <Text style={styles.taskText}>{task.text}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setEditMode(task.id)}>
                    <Text style={{ color: 'blue', marginRight: 10 }}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => taskDelete(task.id)}>
                    <Text style={{ color: 'red' }}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  taskInput: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tasksContainer: {
    marginTop: 20,
  },
  task: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    flex: 1,
  },
  taskText: {
    maxWidth: '80%',
  },
  completeTask: {
    backgroundColor: '#d1e7dd'
  }
});
