
import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import TaskScreen from "./screens/TaskScreen"; 
import MessageScreen from "./screens/MessageScreen"; 
import LastTaskScreen from "./screens/LastTaskScreen"; 


const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "tomato", 
          tabBarInactiveTintColor: "gray", 
        }}
      >
        <Tab.Screen
          name="Tasks" 
          component={TaskScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
             
              <MaterialCommunityIcons
                name="format-list-bulleted" 
                color={color} 
                size={size} 
              />
            ),
          }}
        />

        <Tab.Screen
          name="Messages" 
          component={MessageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message-text" 
                color={color}
                size={size}
              />
            ),
          }}
        />


        <Tab.Screen
          name="Last Tasks" 
          component={LastTaskScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="history" 
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
