import { miradoresService } from "@/services/miradores";
import { usersService } from "@/services/users";
import { useState } from "react";

export function useExploreSearch() {
  const [searchType, setSearchType] = useState<"miradores" | "users">(
    "miradores"
  );
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string, type: "miradores" | "users") => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchQuery("");
      return;
    }

    setIsSearching(true);
    setSearchType(type);
    setSearchQuery(query);

    try {
      if (type === "miradores") {
        const response = await miradoresService.searchMiradores({ query });
        setSearchResults(response.data);
      } else {
        const response = await usersService.searchUsers({ query });
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePopularSearch = (query: string, type: "miradores" | "users") => {
    setSearchType(type);
    handleSearch(query, type);
  };

  return {
    searchType,
    setSearchType,
    searchResults,
    isSearching,
    searchQuery,
    handleSearch,
    handlePopularSearch,
  };
}
