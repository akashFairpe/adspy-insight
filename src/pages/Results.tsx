import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Sparkles, X, Filter, ChevronLeft, ChevronRight, MessageSquare, Send, Bookmark, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Import ad images
import adScreenRecorder1 from "@/assets/ad-screen-recorder-1.jpg";
import adVideoCapture1 from "@/assets/ad-video-capture-1.jpg";
import adSaasRecorder1 from "@/assets/ad-saas-recorder-1.jpg";
import adVideoEditor1 from "@/assets/ad-video-editor-1.jpg";

const platforms = [
  "Facebook", "YouTube", "Instagram", "TikTok", "LinkedIn", 
  "Google Ads", "Twitter", "Pinterest", "Snapchat"
];

const engagementLevels = ["High", "Medium", "Low"];

const sampleAds = [
  {
    id: 1,
    title: "Screen Recorder Pro",
    platform: "Facebook",
    image: adScreenRecorder1,
    duration: "22 Days",
    date: "Dec 2023",
    engagement: "High",
    views: "2.3M",
    clicks: "45.2K",
    ctr: "1.96%"
  },
  {
    id: 2,
    title: "VideoCapture Elite",
    platform: "YouTube",
    image: adVideoCapture1,
    duration: "15 Days", 
    date: "Nov 2023",
    engagement: "High",
    views: "1.8M",
    clicks: "38.7K",
    ctr: "2.15%"
  },
  {
    id: 3,
    title: "RecordMax SaaS",
    platform: "LinkedIn",
    image: adSaasRecorder1,
    duration: "30 Days",
    date: "Jan 2024",
    engagement: "Medium",
    views: "890K",
    clicks: "12.4K",
    ctr: "1.39%"
  },
  {
    id: 4,
    title: "EditPro Capture",
    platform: "Instagram",
    image: adVideoEditor1,
    duration: "18 Days",
    date: "Dec 2023", 
    engagement: "High",
    views: "1.5M",
    clicks: "28.9K",
    ctr: "1.93%"
  }
];

const refinementPrompts = [
  "Show only ads with CTR > 2%",
  "Filter by enterprise targeting", 
  "Find competitor comparison ads"
];

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedEngagement, setSelectedEngagement] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleEngagement = (level: string) => {
    setSelectedEngagement(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const getPlatformBadgeColor = (platform: string) => {
    const colors: Record<string, string> = {
      "Facebook": "bg-blue-500",
      "YouTube": "bg-red-500", 
      "Instagram": "bg-pink-500",
      "LinkedIn": "bg-blue-600",
      "TikTok": "bg-black",
      "Google Ads": "bg-green-500",
      "Twitter": "bg-sky-500",
      "Pinterest": "bg-red-600",
      "Snapchat": "bg-yellow-500"
    };
    return colors[platform] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Persistent Top Bar */}
      <div className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">AdSpyder</h1>
            <div className="flex-1 max-w-2xl relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about ads..."
                className="pl-10 pr-12"
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full bg-accent hover:bg-accent/90 p-0"
              >
                <Sparkles className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Collapsible Left Sidebar */}
        {sidebarOpen && (
          <div className="w-80 flex-shrink-0">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Platforms */}
                <div>
                  <h4 className="font-medium mb-3">Platforms</h4>
                  <div className="space-y-2">
                    {platforms.map(platform => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform}
                          checked={selectedPlatforms.includes(platform)}
                          onCheckedChange={() => togglePlatform(platform)}
                        />
                        <label htmlFor={platform} className="text-sm cursor-pointer">
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <h4 className="font-medium mb-3">Date Range</h4>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Engagement Level */}
                <div>
                  <h4 className="font-medium mb-3">Engagement Level</h4>
                  <div className="flex gap-2">
                    {engagementLevels.map(level => (
                      <Button
                        key={level}
                        variant={selectedEngagement.includes(level) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleEngagement(level)}
                        className="flex-1"
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>

              {/* AI Assistant Chat */}
              <div className="border-t p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">AI Assistant – Refine your search</span>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                  Try refining your search with more specific criteria like engagement metrics or competitor analysis.
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Try Asking:</div>
                  {refinementPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs h-8"
                      onClick={() => setChatMessage(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask to refine search..."
                    className="text-sm"
                  />
                  <Button size="sm" className="px-3">
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Results Grid */}
        <div className="flex-1">
          {!sidebarOpen && (
            <Button
              variant="outline"
              onClick={() => setSidebarOpen(true)}
              className="mb-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              Show Filters
            </Button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sampleAds.map(ad => (
              <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{ad.title}</h3>
                    <Badge className={`${getPlatformBadgeColor(ad.platform)} text-white text-xs`}>
                      {ad.platform}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {ad.duration} • {ad.date} • {ad.engagement} Engagement
                  </div>
                </CardHeader>

                <CardContent className="py-0">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm font-medium">{ad.views}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{ad.clicks}</div>
                      <div className="text-xs text-muted-foreground">Clicks</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{ad.ctr}</div>
                      <div className="text-xs text-muted-foreground">CTR</div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Bookmark className="h-3 w-3 mr-1" />
                    Save ad
                  </Button>
                  <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
                    <Zap className="h-3 w-3 mr-1" />
                    Create Similar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            
            {[1, 2, 3].map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-accent text-accent-foreground" : ""}
              >
                {page}
              </Button>
            ))}
            
            <span className="text-muted-foreground">...</span>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;