import { useQuery } from "@apollo/client";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { GET_PROJECT_INFO } from "../../config/gql/projects";
import RenderHtml from "react-native-render-html";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Image } from "expo-image";
import PagerView from "react-native-pager-view";
import { ResizeMode, Video } from "expo-av";

const Project = () => {
  const navigation = useNavigation();
  const { slug, query } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: query,
      headerBackTitle: "Back",
    });
  }, [navigation]);

  const { loading, error, data } = useQuery(GET_PROJECT_INFO, {
    variables: {
      slug,
    },
  });

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const response = data?.proboardCollection?.items[0];

  return (
    <View style={styles.rootContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{query}</Text>
          <Link href={`/devs/${response?.developer?.username}`}>
            <Text>@{response?.developer?.username}</Text>
          </Link>
        </View>
        <ImageSlider assets={response?.assetsCollection?.items} />
        <View>
          <View>
            <RenderHtml
              contentWidth={width}
              source={{
                html: documentToHtmlString(response?.description?.json),
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const ImageSlider = ({ assets }: { assets: [{ url: string }] }) => {
  const [activeIndicator, setActiveIndicator] = useState(0);
  return (
    <View style={styles.imageContainer}>
      <PagerView style={styles.imageContainer} initialPage={0}>
        {assets.map((asset: any, index) =>
          asset?.contentType.includes("video") ? (
            <Video
              style={styles.image}
              source={{
                uri: asset?.url,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            />
          ) : (
            <Image
              key={index}
              source={asset.url}
              style={styles.image}
              contentFit="contain"
            />
          )
        )}
      </PagerView>
      <View style={styles.indicatorContainer}>
        {assets.map((_asset, index) => {
          return (
            <View
              key={index}
              style={[
                styles.indicator,
                activeIndicator === index ? styles.activeIndicator : null,
              ]}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "auto",
  },
  imageContainer: {
    flex: 1,
    height: 200,
    marginBottom: 20,
  },
  titleContainer: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
  },
  activeIndicator: {
    backgroundColor: "#000",
  },
});

export default Project;
