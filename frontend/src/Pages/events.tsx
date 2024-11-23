import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ImageViewer from './ImageViewer';
import eventsData from '../Jsons/eventsdata.json';

// TypeScript interfaces
interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  address: string;
  location: string;
  timings: string;
  images: string[];
}

interface ImageIndices {
  [key: string]: number;
}

const Events: React.FC = () => {
  // State management with TypeScript types
  const [events] = useState<Event[]>(eventsData.events);
  const [currentImageIndex, setCurrentImageIndex] = useState<ImageIndices>({});
  const [viewerOpen, setViewerOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const nextImage = (eventId: string): void => {
    if (viewerOpen && selectedEvent) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [selectedEvent._id]: ((prev[selectedEvent._id] || 0) + 1) % selectedEvent.images.length
      }));
    } else {
      setCurrentImageIndex(prev => {
        const event = events.find(e => e._id === eventId);
        if (!event) return prev;
        return {
          ...prev,
          [eventId]: ((prev[eventId] || 0) + 1) % event.images.length
        };
      });
    }
  };

  const prevImage = (eventId: string): void => {
    if (viewerOpen && selectedEvent) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [selectedEvent._id]: ((prev[selectedEvent._id] || 0) - 1 + selectedEvent.images.length) % selectedEvent.images.length
      }));
    } else {
      setCurrentImageIndex(prev => {
        const event = events.find(e => e._id === eventId);
        if (!event) return prev;
        return {
          ...prev,
          [eventId]: ((prev[eventId] || 0) - 1 + event.images.length) % event.images.length
        };
      });
    }
  };

  const openImageViewer = (event: Event): void => {
    setSelectedEvent(event);
    setViewerOpen(true);
  };

  const handleImageClick = (e: React.MouseEvent, event: Event): void => {
    e.stopPropagation();
    openImageViewer(event);
  };

  if (events.length === 0) {
    return (
      <div className="text-center p-8">
        <Alert>
          <AlertTitle>No Events Found</AlertTitle>
          <AlertDescription>
            There are currently no upcoming events scheduled.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Events and Exhibitions
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event._id} className="overflow-hidden">
            <div className="relative h-64 group">
              <img
                src={event.images[currentImageIndex[event._id] || 0]}
                alt={event.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={(e) => handleImageClick(e, event)}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget;
                  target.src = '/api/placeholder/400/320';
                  target.onerror = null;
                }}
              />
              {event.images.length > 1 && (
                <>
                  <button
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      prevImage(event._id);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      nextImage(event._id);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  openImageViewer(event);
                }}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="View full size"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            </div>

            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{event.address}, {event.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{event.timings}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {viewerOpen && selectedEvent && (
        <ImageViewer
          images={selectedEvent.images}
          currentIndex={currentImageIndex[selectedEvent._id] || 0}
          onClose={() => setViewerOpen(false)}
          onNext={() => nextImage(selectedEvent._id)}
          onPrevious={() => prevImage(selectedEvent._id)}
          imageTitle={selectedEvent.title}
        />
      )}
    </div>
  );
};

export default Events;