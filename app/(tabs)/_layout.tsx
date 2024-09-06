import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Proboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerShown: false
          
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="grid" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="devs"
        options={{
          title: "Devs",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="blogs"
        options={{
          title: "Blogs",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="article" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
