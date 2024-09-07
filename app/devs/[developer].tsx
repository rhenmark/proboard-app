import { Image } from "expo-image";
import { useNavigation, useLocalSearchParams, Link } from "expo-router";
import { useLayoutEffect } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@apollo/client";
import { GET_DEVELOPER_INFO } from "../../config/gql/devs";

const Developer = () => {
  const navigation = useNavigation();
  const { username } = useLocalSearchParams();
  const { data, loading, error } = useQuery(GET_DEVELOPER_INFO, {
    variables: { username },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: username,
      headerBackTitle: "Back",
    });
  }, [navigation]);

  if (loading || error) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const response = data?.developerCollection?.items[0];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: response?.profileImage?.url }} // Replace with actual image URI
          style={styles.profileImage}
        />
        <Text style={styles.name}>{response?.username}</Text>
        <Text style={styles.position}>{response?.currentPosition}</Text>

        {/* Social Links */}
        <SocialMedia items={response?.socialMedia?.items} />

        {/* Resume Button */}
        {response.resumeLink && (
          <View style={styles.resumeLink}>
            <Link href={response.resumeLink}>
              <Text style={styles.resumeLinkText}>Download my Resume</Text>
            </Link>
          </View>
        )}
      </View>

      {/* Work Experience Section */}
      <WorkExperience />
      <CertificationScreen certificates={response?.certificates?.items || []} />
      <EducationScreen />
      <TechStackScreen
        list={[...response?.skills?.list, ...response?.interests?.list]}
      />
    </ScrollView>
  );
};

const SocialMedia = ({ items }: any) => {
  return (
    <View style={styles.socialLinks}>
      {items.map((media: any, index: string) => {
        return (
          <Link href={media.url}>
            <FontAwesome
              name={media.name.toLowerCase()}
              type="font-awesome"
              color="#000"
              size={32}
            />
          </Link>
        );
      })}
    </View>
  );
};

const WorkExperience = () => {
  return (
    <View style={styles.experienceContainer}>
      <Text style={styles.sectionTitle}>- Work Experiences</Text>

      {/* OCBC Bank */}
      <View style={styles.experienceCard}>
        <Text style={styles.companyName}>OCBC Bank</Text>
        <Text style={styles.duration}>March 2022 - June 2024</Text>
        <Text style={styles.location}>Singapore</Text>
        <Text style={styles.role}>Tech Lead / Senior Software Engineer</Text>
        <Text style={styles.description}>
          Led tech initiatives involving banking solutions, software
          development, and team leadership.
        </Text>
      </View>

      {/* Other Companies (similar structure) */}
      <View style={styles.experienceCard}>
        <Text style={styles.companyName}>Speakap</Text>
        <Text style={styles.duration}>September - December 2021</Text>
        <Text style={styles.location}>Amsterdam, Netherlands</Text>
        <Text style={styles.role}>Senior Frontend Engineer</Text>
        <Text style={styles.description}>
          Focused on developing communication platforms for businesses.
        </Text>
      </View>

      <View style={styles.experienceCard}>
        <Text style={styles.companyName}>Aon - ACIA</Text>
        <Text style={styles.duration}>April 2020 - August 2021</Text>
        <Text style={styles.location}>Singapore</Text>
        <Text style={styles.role}>Application Developer</Text>
        <Text style={styles.description}>
          Led technology projects related to insurance and risk management.
        </Text>
      </View>

      <View style={styles.experienceCard}>
        <Text style={styles.companyName}>Cartrack Singapore</Text>
        <Text style={styles.duration}>August 2018 - April 2020</Text>
        <Text style={styles.location}>Singapore</Text>
        <Text style={styles.role}>Senior Frontend Engineer</Text>
        <Text style={styles.description}>
          Oversaw the development of tracking and fleet management solutions.
        </Text>
      </View>
    </View>
  );
};

const CertificationScreen = ({ certificates }: any) => {
  return (
    <View style={styles.certificationsContainer}>
      <Text style={styles.sectionTitle}>- Certifications</Text>
      {certificates.map((certificate: any, index: string) => {
        return (
          <View key={index} style={styles.certificationCard}>
            <Text style={styles.certificationTitle}>{certificate.name}</Text>
            <Text style={styles.certificationOrganization}>
              {" "}
              {certificate.issuing_organization}
            </Text>
            <Text style={styles.certificationDate}>
              {certificate.issue_date}
            </Text>
            <Link href={certificate.credential_url}>
              <Text style={styles.certificateLink}>View Certificate</Text>
            </Link>
          </View>
        );
      })}

      <View style={styles.certificationCard}>
        <Text style={styles.certificationTitle}>
          Connect and Protect: Networks and Network Security
        </Text>
        <Text style={styles.certificationOrganization}>Google</Text>
        <Text style={styles.certificationDate}>May 2023</Text>
        <Text style={styles.certificateLink}>View Certificate</Text>
      </View>

      <View style={styles.certificationCard}>
        <Text style={styles.certificationTitle}>
          Play It Safe: Manage Security Risks
        </Text>
        <Text style={styles.certificationOrganization}>Google</Text>
        <Text style={styles.certificationDate}>May 2023</Text>
        <Text style={styles.certificateLink}>View Certificate</Text>
      </View>

      <View style={styles.certificationCard}>
        <Text style={styles.certificationTitle}>
          Foundations of Cybersecurity
        </Text>
        <Text style={styles.certificationOrganization}>Google</Text>
        <Text style={styles.certificationDate}>May 2023</Text>
        <Text style={styles.certificateLink}>View Certificate</Text>
      </View>
    </View>
  );
};

const EducationScreen = () => {
  return (
    <View style={styles.educationContainer}>
      <Text style={styles.sectionTitle}>- Education</Text>

      <View style={styles.educationCard}>
        <Text style={styles.institutionName}>
          University of the Philippines Open University
        </Text>
        <Text style={styles.degree}>Master Information Systems</Text>
        <Text style={styles.educationDate}>2023 - Present</Text>
        <Text style={styles.educationDescription}>
          Focused on software engineering, algorithms, and artificial
          intelligence.
        </Text>
      </View>

      <View style={styles.educationCard}>
        <Text style={styles.institutionName}>
          Carlos Hilado Memorial State University
        </Text>
        <Text style={styles.degree}>
          Bachelor of Science in Information Systems
        </Text>
        <Text style={styles.educationDate}>2012 - 2016</Text>
        <Text style={styles.educationDescription}>
          Information Technology fundamentals and specialized in user interface
          design and usability testing.
        </Text>
      </View>
    </View>
  );
};

const TechStackScreen = ({ list }: { list: string[] }) => {
  return (
    <View style={styles.skillsContainer}>
      <Text style={styles.sectionTitle}>- Tech Skills & Interest</Text>
      <View style={styles.skillsChips}>
        {list?.map((skill, index) => (
          <View key={index} style={styles.skillChipWrap}>
            <Text style={styles.skillChipText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    //   backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  position: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  resumeLink: {
    backgroundColor: "#026fe3",
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
  },
  resumeLinkText: {
    color: "#fff",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    width: 100,
    marginVertical: 14,
    columnGap: 40,
  },
  downloadButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  experienceContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  experienceCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  duration: {
    fontSize: 14,
    color: "gray",
  },
  location: {
    fontSize: 14,
    color: "gray",
  },
  role: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  certificationsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  certificationCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  certificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  certificationOrganization: {
    fontSize: 14,
    color: "gray",
  },
  certificationDate: {
    fontSize: 14,
    color: "gray",
  },
  certificateLink: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 5,
  },
  educationContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  educationCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  degree: {
    fontSize: 16,
    marginTop: 5,
  },
  educationDate: {
    fontSize: 14,
    color: "gray",
  },
  educationDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  skillsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  skillsChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  skillChip: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: "#e0f7ff",
  },
  skillChipWrap: {
    backgroundColor: "#000",
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 24,
    borderWidth: 1,
    marginLeft: 4,
    marginBottom: 4,
  },

  skillChipText: {
    color: "#fff",
  },
});

export default Developer;
