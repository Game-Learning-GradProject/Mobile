import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackHandler } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { playBackgroundMusic, stopBackgroundMusic } from "../modules";
import { useEffect } from "react";

const Score = ({ navigation }) => {
  const route = useRoute();
  const wrong = route.params.wrong;
  const word_Pic = route.params.word_Pic;
  const path = route.params.path;
  const taskId = route.params.taskId;

  useEffect(() => {
    stopBackgroundMusic().then(() => {
      playBackgroundMusic(2);
    });
  });

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/verticalBG.png")}
      style={[{ flex: 1 }, tw`justify-center`]}
      imageStyle={{ resizeMode: "stretch" }}
    >
      <View style={styles.body}>
        {/* show the score */}
        <View style={styles.container}>
          <View style={styles.viewContainer}>
            <Text style={[styles.text, { width: "70%" }, tw``]}>Score</Text>
            <Text
              style={[styles.textContainer, { backgroundColor: "#00A91B" }]}
            >
              {word_Pic.length - wrong}
            </Text>
          </View>
          {/* show wrong tries */}
          <View style={[styles.viewContainer, { marginTop: "12%" }]}>
            <Text style={[styles.text, { width: "70%" }]}>Wrong Tries</Text>
            <Text
              style={[styles.textContainer, { backgroundColor: "#D82C2C" }]}
            >
              {wrong}
            </Text>
          </View>
        </View>
        {/* paly again */}
        <TouchableOpacity
          style={[styles.replayBtn]}
          onPress={() => {
            stopBackgroundMusic().then(() => {
              playBackgroundMusic(1);
            });
            navigation.replace(path, { word_Pic, taskId });
          }}
        >
          <MaterialCommunityIcons name="replay" size={60} color={"white"} />
          {/* <Image
          source={require("../../assets/retry.png")}
          style={{ width: "15%", height: "70%", marginEnd: "6%" }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Play again
        </Text> */}
        </TouchableOpacity>

        {/* paly another game */}
        <TouchableOpacity
          style={[
            styles.TouchableOpacity,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#312F73",
            },
            tw` `,
          ]}
          onPress={() => navigation.replace("TasksMap", { word_Pic })}
        >
          <Text
            style={[
              {
                fontSize: 20,
                fontWeight: "600",
                color: "#fff",
                marginRight: 10,
              },
              tw``,
            ]}
          >
            Next
          </Text>
          <MaterialCommunityIcons
            name="arrow-right-thick"
            size={30}
            color="white"
          />
        </TouchableOpacity>

        {/*quit*/}
        <TouchableOpacity
          style={[
            styles.TouchableOpacity,
            { marginTop: "3%", backgroundColor: "#D82C2C" },
          ]}
          onPress={() => {
            navigation.navigate("TasksMap");
            BackHandler.exitApp();
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Quit
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 250,
    padding: 28,
    gap: 15,
    backgroundColor: "#55548A",
    marginTop: 60,
    borderRadius: 20,
    elevation: 10,
    opacity: 0.8,
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "#efe",
    textAlign: "center",
    textAlignVertical: "center",
    height: 45,
    width: 100,
    fontSize: 24,
    borderRadius: 50,
    color: "#fff",
    fontWeight: "500",
    borderWidth: 1,
    elevation: 10,
  },
  body: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#9C9AFF",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  TouchableOpacity: {
    width: "82%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: "12%",
    marginBottom: "3%",
    elevation: 10,
  },
  replayBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55548A",
    flexDirection: "row",
    marginBottom: "5%",
    marginTop: 40,
    padding: 10,
    width: 90,
    height: 90,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#5554aa",
    elevation: 5,
    opacity: 0.8,
  },
});

export default Score;
