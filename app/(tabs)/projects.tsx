import { View, Text, StyleSheet } from 'react-native';
import { ProjectList } from '.';

export default function Tab() {
  return (
    <View style={styles.container}>
       <ProjectList hideHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
});