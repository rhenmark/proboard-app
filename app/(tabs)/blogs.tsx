import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { GET_BLOGS_LIST } from '../../config/gql/blogs';
import { useQuery } from '@apollo/client';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const BlogList = () => {
  const { loading, error, data } = useQuery(GET_BLOGS_LIST);
  const router = useRouter()

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const blogs = data?.blogCollection?.items || [];

  const renderBlogItem = ({ item }: any) => {
    const thumbnailUrl = item?.mediaCollection?.items[0]?.url || 'https://via.placeholder.com/150'; // Fallback if no image

    return (
      <Pressable style={styles.blogContainer} onPress={() => router.push(`/blogs/${item.slug}?title=${item.title}`)}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.metaDescription}</Text>
          <Text style={styles.author}>By: {item.author?.username}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={blogs}
      keyExtractor={(item) => item.slug}
      renderItem={renderBlogItem}
    />
    </View>
  );
};

export default BlogList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10
  },
  blogContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  author: {
    fontSize: 12,
    color: '#999',
  },
});