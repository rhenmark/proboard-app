import { useNavigation, useLocalSearchParams } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, useWindowDimensions, View } from "react-native";

const Developer = () => {
  const navigation = useNavigation();
  const { username, query } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: username,
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <View>
      <Text>Developer</Text>
    </View>
  );
};

export default Developer;
