import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ProboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://proboard.dev/logo.png' }} style={styles.logo} />
        <View style={styles.navLinks}>
          <TouchableOpacity><Text style={styles.navText}>Home</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navText}>Projects</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navText}>Devs</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navText}>Blogs</Text></TouchableOpacity>
        </View>
      </View>

      {/* Main Section */}
      <View style={styles.mainSection}>
        <Text style={styles.mainTitle}>Project board collection</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
        />
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButtonActive}><Text style={styles.filterTextActive}>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Mobile</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Web</Text></TouchableOpacity>
      </View>

      {/* Projects Section */}
      <View style={styles.projectsSection}>
        <Text style={styles.projectsTitle}>PROJECTS</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.projectCard}>
            <Image
              source={{ uri: 'https://proboard.dev/project1.png' }}
              style={styles.projectImage}
            />
            <Text style={styles.projectName}>Payndit</Text>
          </View>
          <View style={styles.projectCard}>
            <Image
              source={{ uri: 'https://proboard.dev/project2.png' }}
              style={styles.projectImage}
            />
            <Text style={styles.projectName}>CreativeByJackie</Text>
          </View>
          <View style={styles.projectCard}>
            <Image
              source={{ uri: 'https://proboard.dev/project3.png' }}
              style={styles.projectImage}
            />
            <Text style={styles.projectName}>Digital Literacy Session</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E2C22',
  },
  logo: {
    width: 40,
    height: 40,
  },
  navLinks: {
    flexDirection: 'row',
  },
  navText: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 16,
  },
  mainSection: {
    backgroundColor: '#1E2C22',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  filterButtonActive: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  filterText: {
    color: '#000',
  },
  filterTextActive: {
    color: '#fff',
  },
  projectsSection: {
    paddingHorizontal: 20,
  },
  projectsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  projectCard: {
    marginRight: 20,
    alignItems: 'center',
  },
  projectImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProboardScreen;
