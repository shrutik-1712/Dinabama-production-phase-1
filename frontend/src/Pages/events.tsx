// Image imports for Book Exhibition
import bookExb0 from "../Jsons/Images/Events/Book Exb-p0.jpg";
import bookExb1 from "../Jsons/Images/Events/Book Exb-p1.jpg";
import bookExb2 from "../Jsons/Images/Events/Book Exb-p2.jpg";
import bookExb3 from "../Jsons/Images/Events/Book Exb-p3.jpg";
import bookExb5 from "../Jsons/Images/Events/Book Exb-p5.jpg";
import bookExb6 from "../Jsons/Images/Events/Book Exb-p6.jpg";
import bookExb7 from "../Jsons/Images/Events/Book Exb-p7.jpg";

// Image imports for APJ Abdul Kalam
import apjKalam1 from "../Jsons/Images/Events/APJ Kalam-p1.jpg";
import apjKalam2 from "../Jsons/Images/Events/APJ Kalam-p2.jpg";
import apjKalam3 from "../Jsons/Images/Events/APJ Kalam-p3.jpg";

// Image imports for Dr. S.R. Ranganathan
import srRanganathan1 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-1.jpg";
import srRanganathan2 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-2.jpg";
import srRanganathan3 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-3.jpg";
import srRanganathan4 from "../Jsons/Images/Events/Dr.- S.R-ranganathan-p-4.jpg";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ImageViewer = ({ image, onClose, title }) => (
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
          e.currentTarget.src = '/api/placeholder/800/600';
          e.currentTarget.onerror = null;
        }}
      />
      <p className="text-white text-center mt-4 text-lg">{title}</p>
    </div>
  </div>
);

const Events = () => {
  const events = [
    {
      "_id": "1",
      "title": "Book Exchange Exhibition",
      "date": "",
      "description": "Discover the magic of books at the Book Exhibition! Explore a wide range of genres, and enjoy exciting workshops. Perfect for readers of all ages. 📅. Don't miss it!",
      "address": "Bhandup-west (At library)",
      "location": "",
      "timings": "",
      "images": [
        bookExb0,
        bookExb1,
        bookExb2,
        bookExb3,
        bookExb5,
        bookExb6,
        bookExb7
      ]
    },
    {
      "_id": "2",
      "title": "APJ Abdul Kalam Birth Anniversary",
      "date": "",
      "description": "October 15 marks the birth anniversary of Dr. APJ Abdul Kalam, fondly remembered as the Missile Man of India and the People's President. Born in 1931, Dr. Kalam was a visionary scientist, an inspiring leader, and a beloved teacher who dedicated his life to making India a self-reliant and innovative nation. \n His remarkable contributions to space and defense technology, along with his vision for youth empowerment and education, continue to inspire millions. On this day, we honor his legacy and commitment to building a better and more developed India. Let us celebrate his life by striving for excellence, dreaming big, and working hard to make those dreams a reality. 🌟",
      "address": "Bhandup-west (At library)",
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
      "date": "",
      "description": "August 12 is celebrated as Librarian Day in India to honor the birth anniversary of Dr. S. R. Ranganathan, the Father of Library Science in India. Born in 1892, Dr. Ranganathan was a pioneering mathematician and librarian who transformed the field of library science with his innovative ideas and contributions.He is best known for formulating the Five Laws of Library Science and the Colon Classification System, which are globally recognized principles that revolutionized the organization and management of libraries.On this day, we celebrate the invaluable role of librarians in promoting knowledge, learning, and information access while paying tribute to Dr. Ranganathan's lasting legacy in the world of libraries and education.",
      "address": "Bhandup-west (At library)",
      "location": "",
      "timings": "",
      "images": [
        srRanganathan1,
        srRanganathan2,
        srRanganathan3,
        srRanganathan4
      ]
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [viewerImage, setViewerImage] = useState(null);
  const [viewerTitle, setViewerTitle] = useState('');

  const nextImage = (eventId) => {
    setCurrentImageIndex(prev => {
      const event = events.find(e => e._id === eventId);
      if (!event) return prev;
      return {
        ...prev,
        [eventId]: ((prev[eventId] || 0) + 1) % event.images.length
      };
    });
  };

  const prevImage = (eventId) => {
    setCurrentImageIndex(prev => {
      const event = events.find(e => e._id === eventId);
      if (!event) return prev;
      return {
        ...prev,
        [eventId]: ((prev[eventId] || 0) - 1 + event.images.length) % event.images.length
      };
    });
  };

  const openImageViewer = (image, title) => {
    setViewerImage(image);
    setViewerTitle(title);
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
                      e.currentTarget.src = '/api/placeholder/800/600';
                      e.currentTarget.onerror = null;
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
                    {event.date && (
                      <CardDescription className="text-center text-lg mt-2">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-lg text-justify leading-relaxed mb-8 ">
                      {event.description}
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