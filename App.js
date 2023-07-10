import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, NativeModules, SafeAreaView } from "react-native";
import { Provider } from "react-redux";

import { store } from "./src/store/index";
import Connect from "./src/screens/Connect";
import MissingWord from "./src/screens/MissingWord";
import Score from "./src/screens/Score";
import Login from "./src/screens/Login";
import Listen_Choose from "./src/screens/Listen_Choose";
import Arrange from "./src/screens/Arrange";
import Compare from "./src/screens/compare";
import Sum_Sub from "./src/screens/Sum_Sub";
import TasksMap from "./src/screens/TasksMap";
import Settings from "./src/screens/Settings";
import ChooseAvatar from "./src/screens/ChooseAvatar";
import QuestionsAr from "./src/screens/QuestionsAr";
import ManyChoicesAr from "./src/screens/ManyChoicesAr";

const { StatusBarManager } = NativeModules;

const stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        }}
      >
        <NavigationContainer>
          <StatusBar backgroundColor="#000" style="light" />
          <stack.Navigator>
            <stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="TasksMap"
              component={TasksMap}
              options={{ headerShown: false }}
            />
            <stack.Screen name="Settings" component={Settings} />
            <stack.Screen
              name="ChooseAvatar"
              component={ChooseAvatar}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Connect"
              component={Connect}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Missing-Word"
              component={MissingWord}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Listen_Choose"
              component={Listen_Choose}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Arrange"
              component={Arrange}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Compare"
              component={Compare}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Sum_Sub"
              component={Sum_Sub}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="QuestionsAr"
              component={QuestionsAr}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="ManyChoicesAr"
              component={ManyChoicesAr}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Score"
              component={Score}
              options={{ headerShown: false }}
            />
          </stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
