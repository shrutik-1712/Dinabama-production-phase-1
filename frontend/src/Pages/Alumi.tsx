import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import alumniData from '../Jsons/Alumni.json';

interface AlumniMember {
  _id: string;
  name: string;
  designation: string;
  Rank: string;
  posting?: string;  // Made posting optional with '?'
  image: string;
}

const Alumni = () => {
  const [alumni, setAlumni] = useState<AlumniMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const sortedData = alumniData.sort((a, b) => {
          const rankA = parseInt(a.Rank.replace(/\D/g, '')) || Infinity;
          const rankB = parseInt(b.Rank.replace(/\D/g, '')) || Infinity;
          return rankA - rankB;
        });
        setAlumni(sortedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Achievers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Skeleton className="w-32 h-32 mb-4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}. Please try refreshing the page or contact support if the problem persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Achievers</h2>
          <p className="text-lg text-gray-600">
            Celebrating the remarkable achievements and contributions of our distinguished alumni who 
            continue to inspire future generations through their accomplishments and dedication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {alumni.map((member) => (
            <Card 
              key={member._id} 
              className="hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold text-gray-900">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover w-full h-full border-4 border-gray-100 shadow-sm"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/128/128';
                        target.alt = 'Profile placeholder';
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-800 mb-1">{member.designation}</p>
                    {member.posting && (
                      <p className="font-medium text-gray-800 mb-1">{member.posting}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {alumni.length === 0 && !loading && !error && (
          <div className="text-center text-gray-600 mt-8">
            No alumni records found. Check back later for updates.
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;