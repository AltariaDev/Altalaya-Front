import React from "react";
import { ScrollView } from "react-native";

import PopularSearch from "@/src/components/Pages/ExploreScreen/PopularSearch";
import SearchBar from "@/src/components/Pages/ExploreScreen/SearchBar";
import Highlighted from "../components/Pages/ExploreScreen/Highlighted";

export default function ExploreScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#111" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Search Bar */}
      <SearchBar />

      {/* Popular Searches */}
      <PopularSearch />

      {/* Highlighted */}
      <Highlighted />
    </ScrollView>
  );
}
