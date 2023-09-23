import { useState } from "react";
import { View, StyleSheet, Text, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";
import { Timing } from "./Timing";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.sm }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton
            size={120}
            title="start"
            onPress={() => setIsStarted(true)}
          />
        )}
        {isStarted && (
          <RoundedButton
            size={120}
            title="pause"
            onPress={() => setIsStarted(false)}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton
          size={60}
          title="Cancel"
          onPress={clearSubject}
          textStyle={styles.cancelButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  timingWrapper: {
    flex: 0.2,
    flexDirection: "row",
    paddingTop: spacing.lg,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubjectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 18,
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontSize: 20,
  },
});
