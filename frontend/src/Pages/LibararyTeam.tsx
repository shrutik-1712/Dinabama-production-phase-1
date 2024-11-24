import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import libraryTeamData from '../Jsons/libraryTeam.json';

interface TeamMember {
  name: string;
  image: string;
  role: string;
}

const LibraryTeam = () => {
  const [libraryTeam, setLibraryTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLibraryTeam(libraryTeamData);
        setError(null);
      } catch (err) {
        setError('Failed to load team data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h2 className="text-3xl font-semibold mb-8 flex items-center">
        <Users className="mr-2" /> Library Pillars
      </h2>
      <div className="flex flex-col space-y-6">
        {libraryTeam.map((member, index) => (
          <Card key={index} className="p-8">
            <div className="flex items-center space-x-12">
              <div className="relative w-40 h-48 flex-shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/placeholder/128/128';
                  }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-2xl mb-3">{member.name}</h3>
                <p className="text-gray-600 text-lg font-medium">{member.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LibraryTeam;