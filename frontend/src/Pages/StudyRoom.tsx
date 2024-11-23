import { useState } from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Settings, Book, Link as LinkIcon } from 'lucide-react';

const studyRoomContent = {
  images: [
    new URL('../assets/StudyRoomImages/Picture1.jpg', import.meta.url).href,
    new URL('../assets/StudyRoomImages/Picture0.jpg', import.meta.url).href,
    new URL('../assets/StudyRoomImages/Picture2.jpg', import.meta.url).href,
  ],
  descriptions: [
    "study carrels for focused learning",
    "Group study rooms equipped with modern facilities",
    "Comfortable seating areas with proper lighting"
  ]
};

const StudyRoom = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === studyRoomContent.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? studyRoomContent.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="min-h-screen bg-[#FFFFF0]">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#1B1464]">
          Dina Bama Patil Library & Study Room
        </h2>

        <div className="relative mb-8">
          <div className="aspect-video relative overflow-hidden rounded-lg border-2 border-[#8DB6CD]">
            <img
              src={studyRoomContent.images[currentImageIndex]}
              alt={`Study room view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/1200/800";
                console.error("Image failed to load:", studyRoomContent.images[currentImageIndex]);
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#1B1464]/90 text-[#FFFFF0] p-2 sm:p-4">
              <p className="text-xs sm:text-sm md:text-base">
                {studyRoomContent.descriptions[currentImageIndex]}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-[#FFFFF0] hover:bg-[#DAA520] text-[#1B1464] hover:text-[#FFFFF0] border-[#8DB6CD] h-8 w-8 sm:h-10 sm:w-10"
            onClick={previousImage}
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-[#FFFFF0] hover:bg-[#DAA520] text-[#1B1464] hover:text-[#FFFFF0] border-[#8DB6CD] h-8 w-8 sm:h-10 sm:w-10"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>

          <div className="flex justify-center mt-2 sm:mt-4 gap-1 sm:gap-2">
            {studyRoomContent.images.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                  currentImageIndex === index ? "bg-[#DAA520]" : "bg-[#8DB6CD]"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <Tabs defaultValue="rules" className="w-full">
          <TabsList className="w-full mb-8 grid grid-cols-2 gap-4">
            <TabsTrigger 
              value="rules" 
              className="py-4 text-lg font-semibold flex items-center justify-center bg-[#FFFFF0] hover:bg-[#DAA520] data-[state=active]:bg-[#DAA520] text-[#1B1464]"
            >
              <Settings className="mr-2 h-5 w-5" />
              Rules & Regulations
            </TabsTrigger>
            <TabsTrigger 
              value="facilities" 
              className="py-4 text-lg font-semibold flex items-center justify-center bg-[#FFFFF0] hover:bg-[#DAA520] data-[state=active]:bg-[#DAA520] text-[#1B1464]"
            >
              <Book className="mr-2 h-5 w-5" />
              Facilities & Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules">
            <Card className="shadow-lg border-2 border-[#8DB6CD]">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold mb-6 text-[#1B1464]">Rules & Regulations</h3>
                <div className="space-y-4">
                  <p className="leading-relaxed">1. Talking on mobile phones is strictly prohibited in the Library Premises. Membership of students will be cancelled if found talking on mobile phones.</p>
                  <p className="leading-relaxed">2. Fees once paid will not be refunded at any circumstances.</p>
                  <p className="leading-relaxed">3. Silence should be maintained in the study room, and no discussion be held in study rooms & Corridor of any kind.</p>
                  <p className="leading-relaxed">4. There is no reserved seat for any student in the study room, one chair should be used for sitting in the study room.</p>
                  <p className="leading-relaxed">5. It is necessary to enter your name on the attendance Register before sitting in the study room.</p>
                  <p className="leading-relaxed">6. Everyone should take care that they should not to damage institutions, as well as their belonging.</p>
                  <p className="leading-relaxed">7. A student should use the lunchroom to eat any kind of food, please do not eat any kind of food while sitting in the study room.</p>
                  <p className="leading-relaxed">8. In case of loss or damage of identity card Rs. 10/- will be fined.</p>
                  <p className="leading-relaxed">9. Students should maintain the dress code while coming to the study room, they should not come to the study room wearing half pants, Bermuda, sleeveless or any indecent dress etc.</p>
                  <p className="mt-4 italic text-[#1B1464] font-medium">
                    The right to change the rules & Condition of study room is reserved to the Board of the Institute.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities">
            <Card className="shadow-lg border-2 border-[#8DB6CD]">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-semibold mb-6 text-[#1B1464]">Study Room Facilities</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Study Environment</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Comfortable, ergonomic chairs and study carrels</li>
                          <li>Proper lighting to reduce eye strain</li>
                          <li>Quiet, distraction-free zones for focused learning</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Technology and Resources</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>High-speed Wi-Fi connectivity</li>
                          <li>Power outlets at each study station</li>
                          <li>Access to reference materials and digital resources</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Group Study Areas</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Spaces for collaborative learning and group discussions</li>
                          <li>Whiteboards and presentation tools available</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Comfort and Accessibility</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Climate-controlled environment</li>
                          <li>Accessible to students with diverse needs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-semibold mb-6 text-[#1B1464]">Additional Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Operating Hours</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Open from 6:00 AM to 10:00 PM</li>
                          <li>Flexible study time for students</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Monitoring and Safety</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>CCTV surveillance</li>
                          <li>Staff present to ensure adherence to study room guidelines</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <a 
            href="/study-room-registration" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1B1464] text-[#FFFFF0] rounded-lg hover:bg-[#DAA520] transition-colors"
          >
            <LinkIcon className="mr-2 h-5 w-5" />
            Study Room Registration
          </a>
        </div>
      </div>
    </section>
  );
};

export default StudyRoom;