import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

import questions from "../data/qusestions";
import { soundEffects } from "../modules";
import { sendAttempts } from "../store/globalSlice";

const QuizScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  // const data = route.params.word_Pic;
  // const { taskId } = route.params;
  const data = questions;
  const taskId = "12345";

  const [render, setRender] = useState(true);

  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState([]);
  const [mistake, setMistake] = useState();
  const [wrong, setWrong] = useState(0);
  //store wrong answers for every word
  const [attempts, setAttempts] = useState([]);

  const currentQuestion = data[index];

  //function to define what to do on pressing a word
  const handelOnPress = (i) => {
    const arr = currentQuestion.definitionInAc.split("");

    if (arr.find((letter) => letter == i) == i) {
      const corrects = chosen;
      corrects.push(i);
      setChosen(corrects);
    } else {
      setWrong(wrong + 1);

      //edit the wrong attempts array
      let inCorrect = attempts;
      if (inCorrect[index] == null) {
        inCorrect[index] = 1;
      } else {
        inCorrect[index] = inCorrect[index] + 1;
      }
      setAttempts(inCorrect);

      setMistake(i);
      setTimeout(() => {
        setMistake("");
      }, 400);
    }
    setRender(!render);
  };

  return (
    <SafeAreaView>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 40,
        }}
      >
        <Text>اجاباتك</Text>
        <Text>توقيتك</Text>
      </View> */}
      <View
        style={{
          marginTop: 50,
          backgroundColor: "#FFCCCB",
          padding: 10,
          borderRadius: 6,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {currentQuestion?.sentence}
        </Text>
        <View
          style={{
            marginTop: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {currentQuestion?.choices.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#00FFFF",
                marginVertical: 15,
                minWidth: 100,
                margin: 5,
                minHeight: 50,
                backgroundColor:
                  mistake !== i && chosen.find((choice) => choice === i) === i
                    ? "green"
                    : mistake === i
                    ? "red"
                    : "#fff",
              }}
              onPress={() => {
                handelOnPress(i);
              }}
            >
              {/* <Text
                style={{
                  borderColor: "#00FFFF",
                  textAlign: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                {item.options}
              </Text> */}
              <Text style={{ fontSize: 20 }}>{item.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {chosen.length === currentQuestion.definitionInAc.length && (
          <>
            {index < data.length - 1 ? (
              <Pressable
                style={styles.btn}
                onPress={() => {
                  setChosen([]);
                  setIndex(index + 1);
                }}
              >
                <Text style={styles.btnText}>التالي</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.btn}
                onPress={() => {
                  setChosen([]);
                  setIndex(0);

                  //to send feedback
                  let sentData = {};
                  data?.forEach((el, i) => {
                    sentData[`data${i + 1}Attempts`] =
                      attempts[i] !== (null || undefined) ? attempts[i] : 0;
                  });
                  dispatch(sendAttempts({ sentData, gameId: "7", taskId }));

                  navigation.replace("Score", {
                    wrong,
                    word_Pic: data,
                    path: "ManyChoicesAr",
                    taskId,
                  });
                }}
              >
                <Text style={styles.btnText}>النهاية</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  btn: {
    width: 200,
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 50,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});
