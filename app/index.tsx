import { Link } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
} from "react-native";

import useFetchCountries from "../hooks/useFetchCountries";

type Country = {
  name: {
    common: string;
  };
  cca2: string;
  cca3: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: { [key: string]: string };
  latlng: [number, number];
};

export default function Main() {
  const [search, setSearch] = useState<string>("");
  const countries = useFetchCountries(search);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Country Explorer</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a country..."
        placeholderTextColor="#333"
        onChangeText={setSearch}
        clearButtonMode="while-editing"
      />
      <FlatList
        data={countries}
        keyExtractor={(item: Country) => item.cca3}
        renderItem={({ item }: { item: any }) => (
          <Link
            href={{
              pathname: "/country",
              params: {
                name: item.name.common,
                flag: item.flag,
                capital: item.capital,
                region: item.region,
                subregion: item.subregion,
                population: item.population,
                languages: JSON.stringify(item.languages),
                latlng: JSON.stringify(item.latlng),
                cca2: item.cca2,
                cca3: item.cca3,
              },
            }}
          >
            <View style={styles.countryCard}>
              <Text style={styles.flag}>
                <View style={styles.flagContainer}>
                  <Text style={styles.flag}>{item.flag}</Text>
                </View>
                <View style={styles.countryContainer}>
                  <Text style={styles.countryName}>{item.name.common}</Text>
                </View>
              </Text>
            </View>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 64,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    padding: 20,
  },
  searchBar: {
    margin: 10,
    paddingLeft: 15,
    borderRadius: 4,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 16,
  },
  countryCard: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    flexDirection: "row",
    height: 64,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  flag: {
    fontSize: 32,
    justifyContent: "center",
    marginRight: 18,
  },
  flagContainer: {
    flex: 2,
    justifyContent: "center",
  },
  countryContainer: {
    flex: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  countryName: {
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
});
