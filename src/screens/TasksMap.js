import { useRef, useState, useEffect } from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { FlashList } from "@shopify/flash-list";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchData, setWordPic } from "../store/globalSlice";
import { playBackgroundMusic, stopBackgroundMusic } from "../modules";

//array to hold games routes
const games = [
  "Connect",
  "Listen_Choose",
  "Arrange",
  "Compare",
  "Sum_Sub",
  "Missing-Word",
  "QuestionsAr",
];

export default function TasksMap({ navigation }) {
  const dispatch = useDispatch();
  const listRef = useRef();

  const { word_Pic, url } = useSelector((state) => state.global);
  const { playerPic } = useSelector((state) => state.auth);

  // console.log("data:", word_Pic);

  const [connected, setConnected] = useState(false);

  //to refresh when needed
  const [refreshing, setRefreshing] = useState(false);

  const checkNet = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected && netInfo.isInternetReachable) {
        setConnected(true);
        dispatch(fetchData());

        await AsyncStorage.setItem("data", JSON.stringify(word_Pic));
      } else {
        setConnected(false);
        getStoreData();
      }
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      stopBackgroundMusic().then(() => {
        playBackgroundMusic(0);
      });
      checkNet();
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const getStoreData = async () => {
    try {
      let data = await AsyncStorage.getItem("data");
      data = await JSON.parse(data);
      console.log(data);
      if (data) dispatch(setWordPic(data));
    } catch (error) {
      console.log(error);
    }
  };

  //create new array with all tasks and levels needed
  let count = 0;
  let allLevels = [];

  connected && word_Pic.length > 0
    ? word_Pic.forEach((el) => {
        el.gameName.forEach((game, i) => {
          count += 1;
          allLevels.push({
            taskNumber: count,
            gameName: game,
            done: el.done[i],
            word_Pic: el.data,
            taskId: el.taskId,
          });
        });
      })
    : null;

  !connected && word_Pic.length > 0
    ? word_Pic.forEach((el) => {
        el.gameName.forEach((game, i) => {
          if (el.done[i] === true) {
            count += 1;
            allLevels.push({
              taskNumber: count,
              gameName: game,
              done: el.done[i],
              word_Pic: el.data,
              taskId: el.taskId,
            });
          }
        });
      })
    : null;

  //to scroll to the next level to be played
  // useEffect(() => {
  // if (listRef.current) {
  //   const scrollOffset = listRef.current.getScrollOffset();
  //   const contentSize = listRef.current.getContentSize();
  //   const targetOffset = scrollOffset + 3 * contentSize.height;
  //   listRef.current.scrollTo({
  //     offset: targetOffset,
  //     animated: true,
  //   });
  // }
  // }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/backgrounds/tasksMap.png")}
      imageStyle={{ resizeMode: "stretch" }}
    >
      {/* settings button */}
      <TouchableOpacity
        style={styles.settingsIconContainer}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Ionicons name="md-settings-sharp" size={45} color="white" />
      </TouchableOpacity>

      {/* reload list button */}

      <TouchableOpacity
        style={styles.reloadIconContainer}
        onPress={() => {
          if (connected) {
            setRefreshing(true);
            dispatch(fetchData());
            setTimeout(() => {
              setRefreshing(false);
            }, 1000);
          } else {
            checkNet();
          }
        }}
      >
        <Ionicons name="reload" size={35} color="white" />
      </TouchableOpacity>
      <FlashList
        ref={listRef}
        data={allLevels}
        renderItem={({ item, index }) => {
          let imgSource =
            (index + 1) % 8 === 1
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap1.png")
              : (index + 1) % 8 === 2
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap2.png")
              : (index + 1) % 8 === 3
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap3.png")
              : (index + 1) % 8 === 4
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap4.png")
              : (index + 1) % 8 === 5
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap5.png")
              : (index + 1) % 8 === 6
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap6.png")
              : (index + 1) % 8 === 7
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap7.png")
              : (index + 1) % 8 === 0
              ? require("../../assets/backgrounds/taskMapSplitted/taskMap8.png")
              : null;

          return (
            <ImageBackground
              source={imgSource}
              style={[styles.image, tw`justify-center `]}
              imageStyle={{
                resizeMode: "stretch",
              }}
              key={index}
            >
              {index === 0 ? (
                //first element
                <TouchableOpacity
                  onPress={() => {
                    stopBackgroundMusic().then(() => {
                      playBackgroundMusic(1, 0.1);
                    });
                    navigation.navigate(games[item.gameName], {
                      word_Pic: item.word_Pic,
                      taskId: item.taskId,
                    });
                  }}
                >
                  <View style={{ marginLeft: "45%" }}>
                    <Text
                      style={[
                        styles.text,
                        !allLevels[index].done && {
                          backgroundColor: "#FF9F2E",
                        },
                      ]}
                    >
                      {item.taskNumber}
                    </Text>
                    {allLevels[index].done == false && (
                      <View
                        style={{
                          position: "absolute",
                          right: -15,
                          bottom: -15,
                          width: 45,
                          height: 45,
                          borderRadius: 60 / 2,
                          borderWidth: 4,
                          borderColor: "#fff",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={
                            playerPic === "Profile/default.png"
                              ? require("../../assets/smile.png")
                              : { uri: url + playerPic }
                          }
                          style={{ width: "100%", height: "100%" }}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                //the rest elements
                <TouchableOpacity
                  disabled={!allLevels[index - 1].done ? true : false}
                  onPress={() => {
                    stopBackgroundMusic().then(() => {
                      playBackgroundMusic(1, 0.1);
                    });
                    navigation.navigate(games[item.gameName], {
                      word_Pic: item.word_Pic,
                      taskId: item.taskId,
                    });
                  }}
                >
                  <View
                    style={[
                      (index + 1) % 8 === 1 && { marginLeft: "45%" },
                      (index + 1) % 8 === 3 && { marginLeft: "40%" },
                      (index + 1) % 8 === 4 && { marginLeft: "30%" },
                      (index + 1) % 8 === 5 && { marginLeft: "25%" },
                      (index + 1) % 8 === 6 && { marginLeft: "-40%" },
                      (index + 1) % 8 === 0 && { marginLeft: "47%" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.text,
                        !allLevels[index - 1].done && {
                          backgroundColor: "#929495",
                        },
                        !allLevels[index].done &&
                          allLevels[index - 1].done && {
                            backgroundColor: "#FF9F2E",
                          },
                      ]}
                    >
                      {item.taskNumber}
                    </Text>
                    {allLevels[index].done == false &&
                      allLevels[index - 1].done == true && (
                        <View
                          style={{
                            position: "absolute",
                            right: -15,
                            bottom: -15,
                            width: 47,
                            height: 47,
                            borderRadius: 60 / 2,
                            borderWidth: 4,
                            borderColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={
                              playerPic === "Profile/default.png"
                                ? require("../../assets/smile.png")
                                : { uri: url + playerPic }
                            }
                            style={{ width: "100%", height: "100%" }}
                          />
                        </View>
                      )}
                  </View>
                </TouchableOpacity>
              )}
            </ImageBackground>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              if (connected) {
                setRefreshing(true);
                dispatch(fetchData());
                setRefreshing(false);
              } else {
                checkNet();
              }
            }}
          />
        }
        estimatedItemSize={50}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98F1F2",
    borderWidth: 10,
    borderColor: "#08f1F2",
  },
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  text: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
    width: 90,
    height: 100,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 7,
    borderColor: "#FFFFFF",
    borderRadius: 12.75,
    backgroundColor: "#05FF00",
  },
  image: {
    flex: 1,
    height: Dimensions.get("screen").height / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1000,
    borderWidth: 4,
    backgroundColor: "#05f600",
    borderRadius: 10,
    borderColor: "#eee",
    padding: 4,
  },
  reloadIconContainer: {
    position: "absolute",
    top: 90,
    left: 10,
    zIndex: 1000,
    borderWidth: 4,
    backgroundColor: "#05f600",
    borderRadius: 10,
    borderColor: "#eee",
    padding: 4,
  },
});
