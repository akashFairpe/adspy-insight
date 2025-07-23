import { useState } from 'react';

// AdSpyder API Integration
// Replace with your actual API endpoint and key

const API_BASE_URL = 'YOUR_API_ENDPOINT_HERE';
const API_KEY = 'YOUR_API_KEY_HERE';

export interface AdData {
  id: number;
  title: string;
  platform: string;
  image?: string; // Optional for text ads
  duration: string;
  date: string;
  engagement: string;
  views: string;
  clicks: string;
  ctr: string;
  adType: 'image' | 'text'; // New field to distinguish ad types
  headline?: string; // For text ads
  description?: string; // For text ads
  displayUrl?: string; // For text ads
}

export interface SearchResponse {
  ads: AdData[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const searchAds = async (query: string, page: number = 1, adType?: 'image' | 'text' | 'all'): Promise<SearchResponse> => {
  try {
    // TODO: Replace with your actual API call
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        query,
        page,
        limit: 12,
        adType: adType || 'all' // Include ad type in API request
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Search API Error:', error);
    throw error;
  }
};

// Hook for using the search API
export const useSearchApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SearchResponse | null>(null);

  const search = async (query: string, page: number = 1, adType?: 'image' | 'text' | 'all') => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchAds(query, page, adType);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return { search, loading, error, data };
};