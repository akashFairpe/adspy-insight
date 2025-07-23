import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestedQueries = [
  "Show screen recorder SaaS ads with high engagement",
  "Find top ads for screen recording tools like Flonnect", 
  "List SaaS ads for screen recorders with high clicks",
  "Search video capture tool ads with strong CTRs",
  "Show me Camtasia competitor ads",
  "Find Loom alternative marketing campaigns"
];

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchQuery?: string) => {
    const searchTerm = searchQuery || query;
    if (searchTerm.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Area */}
      <div className="text-center pt-20 pb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          AdSpyder Unified Ad Search
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Search over 1B+ ad copies across 15+ platforms using URL, keywords, or PPC data
        </p>
      </div>

      {/* Search Panel */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="relative bg-card rounded-2xl shadow-lg p-6">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about ads... (e.g. 'show me screen recorder ads on Facebook with high engagement')"
              className="pl-12 pr-16 py-6 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              onClick={() => handleSearch()}
              size="sm"
              className="absolute right-3 h-10 w-10 rounded-full bg-accent hover:bg-accent/90 p-0"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Suggested Queries */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {suggestedQueries.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleSearch(suggestion)}
              className="rounded-full h-auto py-3 px-6 text-sm font-normal border-border hover:bg-secondary"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;