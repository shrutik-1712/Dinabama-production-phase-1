import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import {advisoryCommitteeData} from '../Jsons/advisoryCommittee';

interface AdvisoryMember {
  name: string;
  image: string;
  role: string;
  description:string;
}

const LibraryCommittee = () => {
  const [advisoryCommittee, setAdvisoryCommittee] = useState<AdvisoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAdvisoryCommittee(advisoryCommitteeData);
        setError(null);
      } catch (err) {
        setError('Failed to load committee data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span>Loading committee members...</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col sm:flex-row items-center gap-8 p-6 border rounded-lg">
              <div className="w-40 h-40 bg-gray-200 rounded-lg shrink-0" />
              <div className="flex-1 space-y-4 w-full">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-6xl mx-auto bg-red-50">
        <CardContent className="text-center p-6 text-red-600">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="pb-8">
        <CardTitle className="flex items-center gap-2 text-3xl">
          <Users className="h-8 w-8" />
          <span>Library Advisory Committee</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {advisoryCommittee.map((member, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-8 p-6 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-40 h-41 shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-lg shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/160/160';
                }}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-semibold mb-3">{member.name}</h3>
              <p className="text-lg text-gray-600">{member.role}</p>
              <p className="text-lg text-gray-600 text-justify">{member.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LibraryCommittee;