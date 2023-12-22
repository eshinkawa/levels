import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

// Define types for the country data
type CountryData = {
  name: {
    common: string;
  };
  cca2: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: any;
  latlng: any;
};

type CountryDetailsScreenProps = {
  countryData: CountryData;
};

const Country: React.FC<CountryDetailsScreenProps> = () => {
  // @ts-ignore
  const countryData: CountryData = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.countryName}>{countryData?.name?.common}</Text>
        <Image
          style={styles.flag}
          source={
            {
              uri: `https://flagcdn.com/w320/${countryData?.cca2.toLowerCase()}.png`,
            } as ImageSourcePropType
          }
        />
      </View>

      {/* Overview Section */}
      <View style={styles.overview}>
        <Text style={styles.infoText}>🏛 {countryData.capital}</Text>
        <Text style={styles.infoText}>🗺 {countryData.region}</Text>
        <Text style={styles.infoText}>
          👥 {countryData.population.toLocaleString()}
        </Text>
        <Text style={styles.infoText}>
          💬 {Object.values(JSON.parse(countryData.languages)).join(", ")}
        </Text>
      </View>

      {Platform.OS !== "web" && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: JSON.parse(countryData.latlng)[0],
            longitude: JSON.parse(countryData.latlng)[1],
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          <Marker
            coordinate={{
              latitude: JSON.parse(countryData.latlng)[0],
              longitude: JSON.parse(countryData.latlng)[1],
            }}
            title={countryData.name.common}
          />
        </MapView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  countryName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  flag: {
    width: 320,
    height: 160,
    resizeMode: "contain",
  },
  overview: {
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 12,
  },
  map: {
    width: "100%",
    height: 300,
  },
});

export default Country;
