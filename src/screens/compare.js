import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";

import { sendAttempts } from "../store/globalSlice";
import { soundEffects } from "../modules";
import Board from "../components/Board";

const Compare = ({ navigation }) => {
  const dispatch = useDispatch();

  const route = useRoute();

  const data = route.params.word_Pic;
  const { taskId } = route.params;

  const [index, setIndex] = useState(0);

  // const [data[index].numbers.num1, setNumber1] = useState(0);
  // const [data[index].numbers.num2, setNumber2] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  //to store wrong attempts
  const [attempts, setAttempts] = useState([]);

  //to store wrong count
  const [wrong, setWrong] = useState(0);

  const mathSymbols = [">", "<", "="];

  const [check, setCheck] = useState(false);

  const selectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
    if (symbol === ">") {
      setCheck(
        JSON.parse(data[index].numbers.num1) >
          JSON.parse(data[index].numbers.num2)
      );
    } else if (symbol === "<") {
      setCheck(
        JSON.parse(data[index].numbers.num1) <
          JSON.parse(data[index].numbers.num2)
      );
    } else if (symbol === "=") {
      setCheck(
        JSON.parse(data[index].numbers.num1) ===
          JSON.parse(data[index].numbers.num2)
      );
    }
  };

  const handleNextRound = () => {
    if (check === true) {
      setIsCorrect(true);
      if (index < data.length - 1) {
        soundEffects(0);
        setTimeout(() => {
          setIndex(index + 1);
          setSelectedSymbol("");
          setIsCorrect(null);
        }, 500);
      } else {
        soundEffects(2);
        //to send feedback
        let sentData = {};
        // let sentData = [];
        data?.forEach((el, i) => {
          sentData[`data${i + 1}Attempts`] =
            attempts[i] !== (null || undefined) ? attempts[i] : 0;
        });
        dispatch(sendAttempts({ sentData, gameId: "3", taskId }));

        setTimeout(() => {
          navigation.replace("Score", {
            wrong,
            word_Pic: data,
            path: "Compare",
            taskId,
          });
        }, 500);
      }
    } else {
      setIsCorrect(false);
      soundEffects(1);
      setWrong(wrong + 1);

      //edit the wrong attempts array
      let inCorrect = attempts;
      if (inCorrect[index] == null) {
        inCorrect[index] = 1;
      } else {
        inCorrect[index] = inCorrect[index] + 1;
      }
      setAttempts(inCorrect);

      setTimeout(() => {
        setSelectedSymbol("");
        setIsCorrect(null);
      }, 500);
    }
  };

  return (
    <Board>
      {/* <View style={styles.container}> */}
      {/* <TouchableOpacity
        style={tw`ml-3 mt-2 bg-red-400 w-2/12 flex justify-center absolute top-5 left-3 items-center rounded-3xl border-2 border-red-600`}
        onPress={() => {
          // dispatch(sendAttempts({ questions, gameID: "3" }));
          // playAgain();
          navigation.replace("TasksMap");
        }}
      >
        <Text style={tw`text-3xl text-center font-bold text-white`}>x</Text>
      </TouchableOpacity> */}
      <View style={styles.flexx}>
        <View style={styles.numbers}>
          <TextInput
            style={styles.input}
            value={data[index].numbers.num1.toString()}
            editable={false}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 5,
              margin: 5,
              textAlign: "center",
              backgroundColor:
                isCorrect === true
                  ? "green"
                  : isCorrect === false
                  ? "red"
                  : "#3454df",
              color: "white",
              width: 100,
              height: 100,
              borderRadius: 10,
              fontSize: 50,
              fontWeight: "800",
              opacity: isCorrect === false || isCorrect === true ? 1 : 0.5,
            }}
            value={selectedSymbol}
            editable={false}
          />
          <TextInput
            style={styles.input}
            value={data[index].numbers.num2.toString()}
            editable={false}
          />
        </View>
        <View style={styles.buttons}>
          {mathSymbols.map((symbol) => (
            <TouchableWithoutFeedback
              onPress={() => selectSymbol(symbol)}
              key={symbol}
            >
              <View
                style={{
                  // flex: 1,
                  width: 80,
                  height: 80,
                  margin: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#3454df",
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 50, color: "#fff" }}>{symbol}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        {/* {selectedSymbol !== "" && ( */}
        <TouchableWithoutFeedback onPress={handleNextRound}>
          <View style={styles.feedback}>
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "600",
                opacity: selectedSymbol !== "" ? 1 : 0.5,
              }}
            >
              check
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {/* )} */}
        {/* </View> */}
      </View>
    </Board>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7f95eb",
  },
  numbers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 20,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    color: "black",
    padding: 5,
    margin: 5,
    textAlign: "center",
    width: 90,
    height: 90,
    borderRadius: 10,
    fontSize: 30,
    fontWeight: "800",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    // marginTop: 10,
  },
  feedback: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 20,
    backgroundColor: "#346fdf",
    width: 110,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#346fdf",
    marginRight: "auto",
    marginLeft: "auto",
  },
  flexx: {
    display: "flex",
    transform: "rotate(90deg)",
  },
});

export default Compare;
