import { CommonActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ navigation }) {
  const { playerName, playerPic } = useSelector((state) => state.auth);
  const { url } = useSelector((state) => state.global);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "95%",
          height: 120,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#18CCDB",
          borderRadius: 10,
          marginTop: 5,
        }}
      >
        <View
          style={{
            width: 110,
            height: 110,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 60,
            overflow: "hidden",
          }}
        >
          <Image
            // source={require("../../assets/smile.png")}
            source={
              playerPic === "Profile/default.png"
                ? require("../../assets/smile.png")
                : { uri: url + playerPic }
            }
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: "600" }}>
          {playerName}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "95%",
          height: 90,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#18CCDB",
          borderRadius: 10,
          marginTop: 45,
        }}
        onPress={() => {
          navigation.navigate("ChooseAvatar");
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 60,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../../assets/jaguar.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 25,
            fontWeight: "600",
            color: "#fff",
          }}
        >
          choose avatar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutContain}
        onPress={async () => {
          await SecureStore.deleteItemAsync("user");
          await AsyncStorage.clear().then(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          });
        }}
      >
        <Ionicons name="log-out-outline" size={50} style={styles.icon} />
        <Text style={styles.btnText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  logoutContain: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    backgroundColor: "pink",
    borderWidth: 2,
    borderColor: "tomato",
    width: 200,
    padding: 4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    right: 30,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "900",
    right: 10,
  },
});
