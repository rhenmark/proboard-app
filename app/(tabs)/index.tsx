import { useQuery } from "@apollo/client";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { GET_HOME_LIST } from "../../config/gql/home";
import { Image } from "expo-image";

export default function Tab() {
  return (
    <View style={styles.container}>
      <ProjectList />
    </View>
  );
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Project board collection</Text>
      <TextInput style={styles.searchInput} placeholder="Search here" />
    </View>
  );
};

interface IItem {
  slug: string;
  developer: Record<string, unknown>;
  title: string;
  shortDescription: string;
  imagePreview: { url: string };
}

const Item = ({ title, imagePreview, shortDescription }: IItem) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={imagePreview?.url}
        // placeholder={{ blurhash }}
        contentFit="contain"
      />
      <View style={styles.card_content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.shortDescription}>{shortDescription}</Text>
      </View>
    </View>
  );
};

const ProjectList = () => {
  const { loading, error, data } = useQuery(GET_HOME_LIST);

  return (
    <FlatList
      ListHeaderComponent={Header}
      data={data?.proboardCollection?.items || []}
      renderItem={({ item }) => <Item {...item} />}
      keyExtractor={(item) => item.slug}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 320,
    maxHeight: 280,
    backgroundColor: "#163121",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 20,
    paddingVertical: 32,
    rowGap: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    width: 240,
  },
  searchInput: {
    width: "100%",
    height: 52,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ededed",
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 4
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 8,
    borderBottomWidth: 4,
    borderBottomColor: "#000"
  },
  shortDescription: {
    fontSize: 12,
  },
  image: {
    height: 200,
    flex: 1,
  },
  card_content: {
    padding: 10,
    marginTop: 14
  }
});
