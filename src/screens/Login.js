import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import {
  setPlayerName,
  setParentID,
  setStudentID,
  setPlayerPic,
} from "../store/authSlice";
import { checkUser } from "../store/authSlice";
import styles from "../styles";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("Comey833d");
  const [password, setPassword] = useState("bee3f5");
  const [loading, setLoading] = useState(false);

  const [splash, setSplash] = useState(true);

  const getLoginInfo = async () => {
    let user = await SecureStore.getItemAsync("user");
    user = await JSON.parse(user);
    console.log("user:", user);
    return user;
  };
  const deleteCache = async () => {
    await SecureStore.deleteItemAsync("user");
  };
  useEffect(() => {
    // deleteCache();
    getLoginInfo().then((user) => {
      if (user) {
        setSplash(true);
        dispatch(setPlayerName(user.name));
        dispatch(setPlayerPic(user.pic));
        dispatch(setStudentID(user.studentID));
        dispatch(setParentID(user.parentID));
        navigation.replace("TasksMap");
      } else {
        setSplash(false);
      }
    });
  }, []);

  // on press Login
  const onSubmit = () => {
    setLoading(true);
    dispatch(
      checkUser({ username: username.trim(), password: password.trim() })
    )
      .unwrap()
      .then((data) => {
        setLoading(false);
        if (data.student.status === "Correct password") {
          ToastAndroid.show(`${data.student.status}`, ToastAndroid.SHORT);
          dispatch(setPlayerName(data.student.studentName));
          SecureStore.setItemAsync(
            "user",
            JSON.stringify({
              username: username.trim(),
              password: password.trim(),
              name: data.student.studentName,
              studentID: data.student.studentID,
              parentID: data.student.ParentID,
              pic: data.student.studentPic,
            })
          );

          navigation.replace("TasksMap");
        } else {
          ToastAndroid.show(`${data.student.status}`, ToastAndroid.SHORT);
        }
      })
      .catch((err) => {
        setLoading(false);
        ToastAndroid.show(`${err.message}`, ToastAndroid.SHORT);
      });
  };

  return splash === false ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={require("../../assets/backgrounds/login.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        imageStyle={{ resizeMode: "stretch" }}
      >
        {/* <View style={styles.container}> */}
        {/* <Text style={styles.startText}>Please Login First</Text> */}
        <TextInput
          style={styles.input}
          onChangeText={(value) => setUsername(value)}
          placeholder={"Username"}
          textContentType="emailAddress"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder={"Password"}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Pressable
          style={[styles.pressable, loading && { backgroundColor: "#9A5252" }]}
          onPress={onSubmit}
        >
          {!loading ? (
            <Text
              style={{ fontSize: 35, fontWeight: "bold", color: "#fff" }}
              disabled={loading}
            >
              Login
            </Text>
          ) : (
            <Text
              style={{ fontSize: 25, fontWeight: "semibold", color: "#fff" }}
              disabled={loading}
            >
              checking..
            </Text>
          )}
        </Pressable>
        {/* </View> */}
      </ImageBackground>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styleSheet.imageContainer}>
      <Image
        source={require("../../assets/splash.png")}
        style={styleSheet.splash}
      />
    </View>
  );
};

const styleSheet = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#36B0F0",
  },
  splash: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
});

export default Login;
