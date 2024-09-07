import { useQuery } from "@apollo/client";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { GET_DEVELOPER_LIST } from "../../config/gql/devs";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";

export default function Tab() {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_DEVELOPER_LIST);
;
  const onPress = (username: string) => router.push(`/devs/${username}?username=${username}`)
  return (
    <View style={styles.container}>
      <FlatList
      style={styles.listContainer}
        data={data?.developerCollection?.items || []}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPress(item.username)} style={styles.card} >
            {/* <View style={styles.card}> */}
              <Image
                style={styles.cardImage}
                source={item?.profileImage?.url}
              />
              <Text style={styles.username}>@{item.username}</Text>
              <Text>{item.currentPosition}</Text>
            {/* </View> */}
         </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingVertical: 40
  },
  listContainer: {
    flex: 1,
  },
  linkContainer: {
    flex: 1,
    width: "100%"
  },
  card: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
    rowGap: 10,
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 4,
    padding: 10,
  },
  cardImage: {
    height: 200,
    width: 200,
    borderRadius: 200,
  },
  username: {
    fontSize: 24
  }
});
