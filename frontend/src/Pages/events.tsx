import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Image imports (kept as-is)

import apjKalam1 from "../Jsons/Images/Events/APJ Kalam-p1.jpg";
import apjKalam2 from "../Jsons/Images/Events/APJ Kalam-p2.jpg";
import apjKalam3 from "../Jsons/Images/Events/APJ Kalam-p3.jpg";

import srRanganathan1 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-1.jpg";
import srRanganathan2 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-2.jpg";
import srRanganathan3 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-3.jpg";
import srRanganathan4 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-4.jpg";

import bookexb2024_1 from "../Jsons/Images/Events/bookexb2024-1.jpg"
import bookexb2024_2 from "../Jsons/Images/Events/bookexb2024-2.jpg"
// Define interface for Event
interface Event {
  _id: string;
  title: string;
  fromDate: string;
  toDate: string;
  description: string;
  address: string;
  location: string;
  timings: string;
  images: string[];
}

// Define interface for ImageViewer props
interface ImageViewerProps {
  image: string;
  onClose: () => void;
  title: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ image, onClose, title }) => (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
    <button 
      onClick={onClose}
      className="absolute top-4 right-4 text-white hover:text-gray-300"
      aria-label="Close viewer"
    >
      <X className="h-8 w-8" />
    </button>
    <div className="max-w-7xl mx-auto px-4">
      <img
        src={image}
        alt={title}
        className="max-h-[90vh] w-auto object-contain"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = '/api/placeholder/800/600';
          target.onerror = null;
        }}
      />
      <p className="text-white text-center mt-4 text-lg">{title}</p>
    </div>
  </div>
);

const Events: React.FC = () => {
  const initialEvents: Event[] = [
    {
      "_id": "0",
      "title": "Book Exchange Exhibition 2024✨",
      "fromDate": "06-12-2024",
      "toDate": "08-12-2024",
      "description": "Donate a book you read & collect a favorite book\n📖This Event is Mumbai's First Book Sharing Program, and it's happening in Bhandup Form 6th, 7th, 8th, December 2024.\n📖Book Exchange Exhibition is a one of a kind event that brings together book Lovers from all over Mumbai.\n📖The event is designed to promote reading and literacy, and it's a great opportunity to meet other book enthusiasts. Whether you're a fan of Fiction, non-fiction or poetry, I'm sure you'll find something that interests you at this event.\n📖The Book Exchange program is the highlight of the event, and it's a great way to get rid of your old books and discover new ones.\n📖All you have to do is bring your old books to the event, and you can exchange them for other books that catch your eye.\n",
      "address": "Dina Bama Patil Estate, Station Road, Bhandup (W) Mumbai – 78",
      "location": "",
      "timings": "4pm To 10 Pm",
      "images": [bookexb2024_1, bookexb2024_2]
    },
    {
      "_id": "2",
      "title": "APJ Abdul Kalam Birth Anniversary",
      "fromDate": "",
      "toDate":"",
      "description": "October 15 marks the birth anniversary of Dr. APJ Abdul Kalam, fondly remembered as the Missile Man of India and the People's President. \nBorn in 1931, Dr. Kalam was a visionary scientist, an inspiring leader, and a beloved teacher who dedicated his life to making India a self-reliant and innovative nation. \n His remarkable contributions to space and defense technology, along with his vision for youth empowerment and education, continue to inspire millions.\n On this day, we honor his legacy and commitment to building a better and more developed India. Let us celebrate his life by striving for excellence, dreaming big, and working hard to make those dreams a reality. 🌟",
      "address": "Dina Bama Patil Estate, Station Road, Bhandup (W) Mumbai – 78",
      "location": "",
      "timings": "",
      "images": [
        apjKalam1,
        apjKalam2,
        apjKalam3
      ]
    },
    {
      "_id": "3",
      "title": "Dr. S. R. Ranganathan Birth Anniversary & Librarian Day",
      "fromDate": "",
      "toDate":"",
      "description": "August 12 is celebrated as Librarian Day in India to honor the birth anniversary of Dr. S. R. Ranganathan, the Father of Library Science in India. \n Born in 1892, Dr. Ranganathan was a pioneering mathematician and librarian who transformed the field of library science with his innovative ideas and contributions.\nHe is best known for formulating the Five Laws of Library Science and the Colon Classification System, which are globally recognized principles that revolutionized the organization and management of libraries.\nOn this day, we celebrate the invaluable role of librarians in promoting knowledge, learning, and information access while paying tribute to Dr. Ranganathan's lasting legacy in the world of libraries and education.",
      "address": "Dina Bama Patil Estate, Station Road, Bhandup (W) Mumbai – 78",
      "location": "",
      "timings": "",
      "images": [
        srRanganathan1,
        srRanganathan2,
        srRanganathan3,
        srRanganathan4
      ]
    }
    // ... other events (kept as-is)
  ];

  // Helper function to parse date string
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Sort events by most recent date, excluding events with empty dates
  const events: Event[] = initialEvents
    .filter(event => event.fromDate && event.toDate)
    .sort((a, b) => {
      const dateA = parseDate(a.fromDate);
      const dateB = parseDate(b.fromDate);
      
      // Handle potential null dates
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      return dateB.getTime() - dateA.getTime();
    })
    .concat(initialEvents.filter(event => !event.fromDate || !event.toDate));

  // State types
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});
  const [viewerImage, setViewerImage] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState('');

  // Image navigation functions
  const nextImage = (eventId: string) => {
    setCurrentImageIndex(prev => {
      const event = events.find(e => e._id === eventId);
      if (!event) return prev;
      return {
        ...prev,
        [eventId]: ((prev[eventId] || 0) + 1) % event.images.length
      };
    });
  };

  const prevImage = (eventId: string) => {
    setCurrentImageIndex(prev => {
      const event = events.find(e => e._id === eventId);
      if (!event) return prev;
      return {
        ...prev,
        [eventId]: ((prev[eventId] || 0) - 1 + event.images.length) % event.images.length
      };
    });
  };

  // Open full image viewer
  const openImageViewer = (image: string, title: string) => {
    setViewerImage(image);
    setViewerTitle(title);
  };

  // Format date to localized string
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = parseDate(dateString);
    return date 
      ? date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '';
  };

  // Function to render description with line breaks
  const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // Render no events alert if no events
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Events and Exhibitions
        </h1>
        
        <div className="flex flex-col items-center space-y-16 max-w-5xl mx-auto rounded-md">
          {events.map((event) => (
            <Card key={event._id} className="w-full shadow-lg">
              <div className="flex flex-col">
                <div className="relative h-[60vh]">
                  <img
                    src={event.images[currentImageIndex[event._id] || 0]}
                    alt={event.title}
                    className="w-full h-full object-contain bg-black rounded-md"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = '/api/placeholder/800/600';
                      target.onerror = null;
                    }}
                  />
                  {event.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(event._id)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-8 w-8" />
                      </button>
                      <button
                        onClick={() => nextImage(event._id)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-8 w-8" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => openImageViewer(event.images[currentImageIndex[event._id] || 0], event.title)}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="View full size"
                  >
                    <Maximize2 className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-8">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-3xl font-bold text-center">{event.title}</CardTitle>
                    {(event.fromDate || event.toDate) && (
                      <CardDescription className="text-center text-lg mt-2">
                        {event.fromDate === event.toDate 
                          ? formatDate(event.fromDate)
                          : `${formatDate(event.fromDate)} - ${formatDate(event.toDate)}`}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-lg text-justify leading-relaxed mb-8 ">
                      {renderDescription(event.description)}
                    </p>
                    
                    <div className="flex flex-col items-center space-y-4">
                      {event.address && (
                        <div className="flex items-center gap-3 text-gray-500">
                          <MapPin className="h-6 w-6" />
                          <span className="text-lg">
                            {event.address}
                            {event.location && `, ${event.location}`}
                          </span>
                        </div>
                      )}
                      
                      {event.timings && (
                        <div className="flex items-center gap-3 text-gray-500">
                          <Clock className="h-6 w-6" />
                          <span className="text-lg">{event.timings}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {viewerImage && (
        <ImageViewer
          image={viewerImage}
          title={viewerTitle}
          onClose={() => {
            setViewerImage(null);
            setViewerTitle('');
          }}
        />
      )}
    </div>
  );
};

export default Events;