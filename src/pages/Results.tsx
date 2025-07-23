import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Sparkles, ChevronLeft, ChevronRight, Bookmark, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Import ad images
import adScreenRecorder1 from "@/assets/ad-screen-recorder-1.jpg";
import adVideoCapture1 from "@/assets/ad-video-capture-1.jpg";
import adSaasRecorder1 from "@/assets/ad-saas-recorder-1.jpg";
import adVideoEditor1 from "@/assets/ad-video-editor-1.jpg";

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
    platform: "Google Ads",
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
    platform: "Google Ads", 
    image: adVideoEditor1,
    duration: "18 Days",
    date: "Dec 2023", 
    engagement: "High",
    views: "1.5M",
    clicks: "28.9K",
    ctr: "1.93%"
  }
];

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
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

  const getPlatformBadgeColor = (platform: string) => {
    const colors: Record<string, string> = {
      "Facebook": "bg-blue-500",
      "LinkedIn": "bg-blue-600", 
      "Google Ads": "bg-green-500"
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
                placeholder="Search for ads..."
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
  );
};

export default Results;