import { useQuery } from "@apollo/client";
import { Image } from "expo-image";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useLayoutEffect } from "react";
import {
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
} from "react-native";
import { GET_BLOGS_ITEM } from "../../config/gql/blogs";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import RenderHtml from "react-native-render-html";
import Markdown from "react-native-markdown-display";

const options = {
    renderText: (text: any) => { 
        console.log("text ==>", text)
        return <Markdown>{text}</Markdown>
    }
}

const BlogItem = () => {
  const navigation = useNavigation();
  const { slug, title } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerBackTitle: "Back",
    });
  }, [navigation]);

  // Execute GraphQL query to fetch blog details
  const { loading, error, data } = useQuery(GET_BLOGS_ITEM, {
    variables: { slug },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const blog = data?.blogCollection?.items[0];
  if (!blog) return <Text>No blog found</Text>;

  const {
    title: blogTitle,
    metaDescription,
    author,
    content,
    mediaCollection,
  } = blog;
  const imageUrl =
    mediaCollection?.items[0]?.url || "https://via.placeholder.com/300";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{blogTitle}</Text>
      <Text style={styles.metaDescription}>{metaDescription}</Text>
      <Text style={styles.author}>By: {author?.username}</Text>

      {/* Assuming the content.json is a rich text object (e.g., from Contentful or similar CMS) */}
      {/* You can parse and render the content.json here */}
      <View style={styles.contentContainer}>
        {/* Implement rendering logic based on your content structure */}
        {/* <Text>{JSON.stringify(content.json)}</Text> */}
        {/* <RenderHtml
          contentWidth={width}
          source={{
            html: documentToHtmlString(content.json),
          }}
        /> */}
        {/* <Markdown> */}

        <RenderHtml
          contentWidth={width}
          source={{
            html: documentToHtmlString(content.json , options),
          }}
        /> 
        {/* {documentToHtmlString(content.json, options)} */}
        {/* </Markdown> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  contentContainer: {
    marginTop: 16,
  },
});

export default BlogItem;
