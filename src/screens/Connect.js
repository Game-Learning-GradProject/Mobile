import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendAttempts } from "../store/globalSlice";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";

import styles from "../styles";
import { soundEffects, random, text2speech } from "../modules";
import { TouchableWithoutFeedback } from "react-native";

const Connect = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();

  const { playerName } = useSelector((state) => state.auth);
  const { url } = useSelector((state) => state.global);
  const { word_Pic, taskId } = route.params;

  //to set how many correct answers
  const [done, setDone] = useState(0);

  //to set how many wrong answers
  const [wrong, setWrong] = useState(0);

  const [chosenPicI, setChosenPicI] = useState(-1);
  const [chosenWordI, setChosenWordI] = useState(-1);

  //if right match, will be true
  const [correct0, setCorrect0] = useState(false);
  const [correct1, setCorrect1] = useState(false);
  const [correct2, setCorrect2] = useState(false);
  const [correct3, setCorrect3] = useState(false);
  const [correct4, setCorrect4] = useState(false);
  const [correct5, setCorrect5] = useState(false);

  ///to store wrong count for each word
  const [wrong0, setWrong0] = useState(0);
  const [wrong1, setWrong1] = useState(0);
  const [wrong2, setWrong2] = useState(0);
  const [wrong3, setWrong3] = useState(0);
  const [wrong4, setWrong4] = useState(0);
  const [wrong5, setWrong5] = useState(0);

  ///refresh on navigating back from Score screen///////////////
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRandWord(random(word_Pic.length));
      setRandPic(random(word_Pic.length));
      setDone(0);
      setWrong(0);
      setCorrect0(false);
      setCorrect1(false);
      setCorrect2(false);
      setCorrect3(false);
      setCorrect4(false);
      setCorrect5(false);
      setWrong0(0);
      setWrong1(0);
      setWrong2(0);
      setWrong3(0);
      setWrong4(0);
      setWrong5(0);
      setNoRepeat([]);
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  //////////////////////////////////////////////
  useEffect(() => {}, [setChosenPicI, setChosenWordI]);
  ////////////////////creating words cards\\\\\\\\\\\\\\\\\\\\\\\\\\\
  var wordCards = [];
  var wordID = -1;
  var wordIndex = -1;
  const [randomWords, setRandWord] = useState(random(word_Pic.length));
  const setWordView = () => {
    word_Pic?.forEach((word, i) => {
      wordCards.push(
        <TouchableOpacity
          style={[styles.card, i > 5 && tw`mt-10`]}
          onPress={() => {
            // playSound(3);
            wordIndex = word_Pic.indexOf(word_Pic[randomWords[i]]);
            wordID = word_Pic[randomWords[i]]?.dataId;
            counter++;
            check().then((data) => {
              setWordView(data);
            });
          }}
          key={word_Pic[randomWords[i]]?.dataId}
        >
          {word_Pic.indexOf(word_Pic[randomWords[i]]) == 0 && correct0 ? (
            <Text style={[styles.cardText, localStyles.correctAns]}>
              {word_Pic[randomWords[i]]?.definitionInEn}
            </Text>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) == 1 && correct1 ? (
            <Text style={[styles.cardText, localStyles.correctAns]}>
              {word_Pic[randomWords[i]]?.definitionInEn}
            </Text>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) == 2 && correct2 ? (
            <Text style={[styles.cardText, localStyles.correctAns]}>
              {word_Pic[randomWords[i]]?.definitionInEn}
            </Text>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) == 3 && correct3 ? (
            <Text style={[styles.cardText, localStyles.correctAns]}>
              {word_Pic[randomWords[i]]?.definitionInEn}
            </Text>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) == 4 && correct4 ? (
            <Text style={[styles.cardText, localStyles.correctAns]}>
              {word_Pic[randomWords[i]]?.definitionInEn}
            </Text>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) == 5 && correct5 ? (
            <Text style={[styles.cardText, localStyles.correctAns]}>
              {word_Pic[randomWords[i]]?.definitionInEn}
            </Text>
          ) : (
            <Text
              style={[
                styles.cardText,
                chosenWordI === i && {
                  borderWidth: 4,
                  elevation: 10,
                  borderColor: "yellow",
                },
                tw`text-white`,
              ]}
            >
              {word_Pic[randomWords[i]]?.definitionInEn}
            </Text>
          )}
        </TouchableOpacity>
      );
    });

    return wordCards;
  };
  //////////////////////////////////////////////////////////////////
  /////////////////////creating pics cards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  var picCards = [];
  var picID = -2;
  const [randomPics, setRandPic] = useState(random(word_Pic.length));
  const setPicView = () => {
    var picIndex = -2;
    word_Pic?.forEach((word, i) => {
      const imgPath = word_Pic[randomPics[i]]?.imageUrl;
      picCards.push(
        <TouchableOpacity
          style={[styles.card, i > 5 && tw`mt-10`]}
          onPress={() => {
            // playSound(3);
            picIndex = word_Pic[randomPics[i]];
            picID = word_Pic[randomPics[i]]?.dataId;

            counter++;
            check();
          }}
          key={word_Pic[randomPics[i]]?.dataId}
        >
          {word_Pic.indexOf(word_Pic[randomPics[i]]) == 0 && correct0 ? (
            <View style={[styles.cardImg, localStyles.correctAns]}>
              <Image source={{ uri: url + imgPath }} style={styles.img} />
            </View>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) == 1 && correct1 ? (
            <View style={[styles.cardImg, localStyles.correctAns]}>
              <Image source={{ uri: url + imgPath }} style={styles.img} />
            </View>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) == 2 && correct2 ? (
            <View style={[styles.cardImg, localStyles.correctAns]}>
              <Image source={{ uri: url + imgPath }} style={styles.img} />
            </View>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) == 3 && correct3 ? (
            <View style={[styles.cardImg, localStyles.correctAns]}>
              <Image source={{ uri: url + imgPath }} style={styles.img} />
            </View>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) == 4 && correct4 ? (
            <View style={[styles.cardImg, localStyles.correctAns]}>
              <Image source={{ uri: url + imgPath }} style={styles.img} />
            </View>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) == 5 && correct5 ? (
            <View style={[styles.cardImg, localStyles.correctAns]}>
              <Image source={{ uri: url + imgPath }} style={styles.img} />
            </View>
          ) : (
            <View
              style={[
                styles.cardImg,
                chosenPicI === i && {
                  borderWidth: 4,
                  elevation: 10,
                  borderColor: "yellow",
                },
              ]}
            >
              <Image source={{ uri: url + imgPath }} style={styles.img} />
            </View>
          )}
        </TouchableOpacity>
      );
    });
    return picCards;
  };
  /////////////////////////////////////////////////////////////////////////////

  ///////////////////handling Card press\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //counter will be increased by 1 every click on card
  var counter = 0;
  // array to store the done wordID to not be repeated
  const [noRepeat, setNoRepeat] = useState([]);

  //to store if the word is new or already done
  var status = "";

  const check = async () => {
    //if correct
    if (counter % 2 === 0 && wordID === picID) {
      //check if the wordID is already done
      status = "new";
      if (noRepeat.length !== 0) {
        noRepeat.forEach((el) => {
          if (el === wordID) {
            status = "found";
          }
        });
      }

      //if wordID was not found (new) in the noRepeat array
      if (status === "new") {
        setNoRepeat([...noRepeat, wordID]);
        setDone(done + 1);

        //to speak the word
        text2speech(`"${word_Pic[wordIndex]?.definitionInEn}"`);

        //wait a while before continuing to speak the word completely
        setTimeout(() => {
          if (wordIndex == 0) {
            setCorrect0(true);
          } else if (wordIndex == 1) {
            setCorrect1(true);
          } else if (wordIndex == 2) {
            setCorrect2(true);
          } else if (wordIndex == 3) {
            setCorrect3(true);
          } else if (wordIndex == 4) {
            setCorrect4(true);
          } else if (wordIndex == 5) {
            setCorrect5(true);
          }

          if (done < 5) {
            //play sound
            soundEffects(0);
          } else if (done === 5) {
            //play sound
            soundEffects(2);

            //navigate to score screen and send feedback
            setTimeout(() => {
              const sentData = {
                data1Attempts: wrong0,
                data2Attempts: wrong1,
                data3Attempts: wrong2,
                data4Attempts: wrong3,
                data5Attempts: wrong4,
                data6Attempts: wrong5,
              };
              dispatch(
                sendAttempts({
                  sentData,
                  gameId: "0",
                  taskId,
                })
              );
              navigation.replace("Score", {
                wrong,
                word_Pic,
                path: "Connect",
                taskId,
              });
            }, 400);
          }
        }, 500);
      }

      //if wrong
    } else if (counter % 2 === 0 && wordID !== picID) {
      //to edit wrong count
      if (wordIndex == 0) {
        setWrong0(wrong0 + 1);
      } else if (wordIndex == 1) {
        setWrong1(wrong1 + 1);
      } else if (wordIndex == 2) {
        setWrong2(wrong2 + 1);
      } else if (wordIndex == 3) {
        setWrong3(wrong3 + 1);
      } else if (wordIndex == 4) {
        setWrong4(wrong4 + 1);
      } else if (wordIndex == 5) {
        setWrong5(wrong5 + 1);
      }
      setWrong(wrong + 1);
      //play sound
      soundEffects(1);
      setChosenPicI(-1);
      setChosenWordI(-1);
    }
  };
  ///////////////////////////////////////////////////////////////////
  return (
    <ImageBackground
      source={require("../../assets/backgrounds/verticalBG.png")}
      style={[{ flex: 1 }, tw`justify-center`]}
      imageStyle={{ resizeMode: "stretch" }}
    >
      {/* <View style={styles.topBar}> */}
      {/* <View style={{ flexDirection: "row" }}> */}
      {/* <Text
          style={{
            marginBottom: "10%",
            color: "#fff",
            width: "75%",
            height: "100%",
            textAlignVertical: "center",
            padding: 3,
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          Welcome {`${playerName} `}
          <Image
            source={require("../../assets/smile.png")}
            style={{ width: 33, height: 33, marginTop: "3%" }}
          />
        </Text> */}
      {/* {done >= 6 && (
          <TouchableOpacity
            style={{
              top: 10,
              width: "80%",
              height: 50,
              marginRight: 20,
              marginLeft: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E20476",
              borderRadius: 10,
              borderWidth: 4,
              borderColor: "#f20476",
            }}
            onPress={() => {
              const sentData = {
                data1Attempts: wrong0,
                data2Attempts: wrong1,
                data3Attempts: wrong2,
                data4Attempts: wrong3,
                data5Attempts: wrong4,
                data6Attempts: wrong5,
              };
              dispatch(
                sendAttempts({
                  sentData,
                  gameId: "0",
                  taskId,
                })
              );
              navigation.replace("Score", {
                wrong,
                word_Pic,
                path: "Connect",
              });
            }}
          >
            <View>
              <Image
                source={require("../../assets/rArrow.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </TouchableOpacity>
        )} */}
      {/* </View> */}
      {/* </View> */}
      <View style={[styles.body]}>
        <View style={[styles.leftView]}>{setWordView()}</View>
        <View style={[styles.rightView]}>{setPicView()}</View>
      </View>
    </ImageBackground>
  );
};

export default Connect;

const localStyles = StyleSheet.create({
  correctAns: {
    backgroundColor: "#50D97F",
    display: "none",
  },
});
