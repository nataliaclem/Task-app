// Importações principais do React e bibliotecas de navegação
import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Contém a navegação completa do app
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Importação das telas que serão usadas nas abas de navegação
import TaskScreen from "./screens/TaskScreen"; // Tela de tarefas
import MessageScreen from "./screens/MessageScreen"; // Tela de mensagens
import LastTaskScreen from "./screens/LastTaskScreen"; // Tela de últimas tarefas

// Criação do Tab Navigator (responsável por gerenciar as abas de navegação)
const Tab = createBottomTabNavigator();

// Função principal que retorna a navegação do app
export default function App() {
  return (
    // Define o contêiner principal para navegação
    <NavigationContainer>
      {/* Cria a navegação de abas com as opções globais para as tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "tomato", // Cor dos ícones quando estão ativos
          tabBarInactiveTintColor: "gray", // Cor dos ícones inativos
        }}
      >
        {/* Define a primeira aba (Tarefas) */}
        <Tab.Screen
          name="Tasks" // Nome da aba
          component={TaskScreen} // Componente que será exibido ao clicar
          options={{
            tabBarIcon: ({ color, size }) => (
              // Ícone da aba com base no estado (ativo/inativo)
              <MaterialCommunityIcons
                name="format-list-bulleted" // Nome do ícone específico
                color={color} // Cor do ícone (definido pelo estado)
                size={size} // Tamanho do ícone
              />
            ),
          }}
        />

        {/* Define a segunda aba (Mensagens) */}
        <Tab.Screen
          name="Messages" // Nome da aba
          component={MessageScreen} // Componente da tela
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message-text" // Ícone para mensagens
                color={color}
                size={size}
              />
            ),
          }}
        />

        {/* Define a terceira aba (Últimas Tarefas) */}
        <Tab.Screen
          name="Last Tasks" // Nome da aba
          component={LastTaskScreen} // Componente da tela
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="history" // Ícone para histórico/últimas tarefas
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
