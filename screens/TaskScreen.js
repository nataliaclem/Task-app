// Importações principais
import React, { useState, useEffect } from "react"; // React, hooks useState e useEffect para estados e efeitos
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native"; // Componentes básicos da interface nativa
import AsyncStorage from "@react-native-async-storage/async-storage"; // Armazenamento local para salvar as tarefas

// Função principal da tela de tarefas
const TaskScreen = () => {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState([]);
  // Estado para a nova tarefa (título, descrição e data)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: new Date().toLocaleDateString(), // Data atual como padrão
  });
  // Estado para controle de visibilidade do modal (formulário)
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para o texto de busca
  const [searchText, setSearchText] = useState("");

  // Carrega as tarefas ao montar o componente (apenas uma vez)
  useEffect(() => {
    loadTasks();
  }, []);

  // Função que carrega as tarefas do AsyncStorage
  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Converte as tarefas salvas de string para objeto
    }
  };

  // Função para salvar uma nova tarefa
  const saveTask = async () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (newTask.title && newTask.description) {
      // Adiciona a nova tarefa com status 'pending' (pendente)
      const updatedTasks = [...tasks, { ...newTask, status: "pending" }];
      setTasks(updatedTasks); // Atualiza o estado das tarefas
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Salva as tarefas atualizadas no AsyncStorage
      setModalVisible(false); // Fecha o modal
      // Limpa o formulário para criar outra tarefa
      setNewTask({
        title: "",
        description: "",
        date: new Date().toLocaleDateString(),
      });
    } else {
      alert("Title and description are required!"); // Exibe alerta se os campos obrigatórios não estiverem preenchidos
    }
  };

  // Alterna o status de uma tarefa (entre 'pending' e 'completed')
  const toggleTaskStatus = async (index) => {
    const updatedTasks = [...tasks];
    // Muda o status para 'completed' ou 'pending'
    updatedTasks[index].status =
      updatedTasks[index].status === "pending" ? "completed" : "pending";
    setTasks(updatedTasks); // Atualiza o estado
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Salva a mudança no AsyncStorage
  };

  // Filtra as tarefas com base no texto de busca
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Campo de busca de tarefas */}
      <TextInput
        style={styles.search}
        placeholder="Buscar tarefa"
        value={searchText}
        onChangeText={setSearchText} // Atualiza o texto de busca ao digitar
      />

      {/* Lista de tarefas filtradas */}
      <FlatList
        data={filteredTasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskCard}>
            {/* Título da tarefa (com traço se estiver concluída) */}
            <Text
              style={
                item.status === "completed"
                  ? styles.completed // Estilo de tarefa concluída
                  : styles.taskTitle // Estilo de tarefa pendente
              }
            >
              {item.title}
            </Text>
            {/* Descrição da tarefa */}
            <Text
              style={
                item.status === "completed" ? styles.completedDescription : null
              }
            >
              {item.description}
            </Text>
            <Text>{item.date}</Text>

            {/* Botão para alternar entre pendente e concluída */}
            <TouchableOpacity
              style={
                item.status === "completed"
                  ? styles.completedButton // Estilo de botão para tarefa concluída
                  : styles.pendingButton // Estilo de botão para tarefa pendente
              }
              onPress={() => toggleTaskStatus(index)} // Alterna o status ao clicar
            >
              <Text style={styles.buttonText}>
                {item.status === "completed" ? "Desmarcar" : "Concluir"}{" "}
                {/* Texto do botão */}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Define o index como chave
      />

      {/* Botão para abrir o modal de criação de tarefa */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Criar tarefa</Text>
      </TouchableOpacity>

      {/* Modal para criação de nova tarefa */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Nova Tarefa</Text>
          <TextInput
            placeholder="Título"
            value={newTask.title}
            onChangeText={(text) => setNewTask({ ...newTask, title: text })} // Atualiza o título da tarefa
          />
          <TextInput
            placeholder="Descrição"
            value={newTask.description}
            onChangeText={
              (text) => setNewTask({ ...newTask, description: text }) // Atualiza a descrição da tarefa
            }
          />
          <Button title="Salvar" onPress={saveTask} />{" "}
          {/* Botão para salvar tarefa */}
          <Button
            title="Cancelar"
            onPress={() => setModalVisible(false)}
          />{" "}
          {/* Botão para cancelar */}
        </View>
      </Modal>
    </View>
  );
};

// Estilos para os componentes da tela
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  search: { borderBottomWidth: 1, marginBottom: 10 },
  taskCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  taskTitle: { fontWeight: "bold" },
  completed: { textDecorationLine: "line-through", color: "gray" },
  completedDescription: { textDecorationLine: "line-through", color: "gray" },
  completedButton: { backgroundColor: "gray", padding: 10, borderRadius: 5 },
  pendingButton: { backgroundColor: "green", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center" },
  addButton: {
    padding: 15,
    backgroundColor: "lightblue",
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { fontSize: 18 },
  modalContainer: { padding: 20, flex: 1, justifyContent: "center" },
});

export default TaskScreen;
