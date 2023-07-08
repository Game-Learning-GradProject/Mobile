import { Audio } from "expo-av";

let sound = new Audio.Sound();
let isPlaying = false;

const sounds = [
  require("../../assets/sounds/mapBG.mp3"),
  require("../../assets/sounds/gamesBG.mp3"),
  require("../../assets/sounds/scoreBG.mp3"),
];

export const playBackgroundMusic = async (i, vol) => {
  try {
    // Load the sound file (replace 'sound_file.mp3' with your audio file)
    await sound.loadAsync(sounds[i]);

    //control volume 0:1
    (await !vol) ? sound.setVolumeAsync(0.3) : sound.setVolumeAsync(vol);

    // Set the audio to loop
    sound.setIsLoopingAsync(true);

    // Play the sound
    await sound.playAsync();
    isPlaying = true;
  } catch (error) {
    console.log("Error playing sound:", error);
  }
};

export const pauseBackgroundMusic = async () => {
  if (isPlaying) {
    try {
      await sound.pauseAsync();
      isPlaying = false;
    } catch (error) {
      console.log("Error pausing sound:", error);
    }
  }
};

export const stopBackgroundMusic = async () => {
  if (isPlaying) {
    try {
      await sound.stopAsync();
      await sound.unloadAsync();
      isPlaying = false;
    } catch (error) {
      console.log("Error stopping sound:", error);
    }
  }
};
