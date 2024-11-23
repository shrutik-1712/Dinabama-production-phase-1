import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Settings, Book, Link as LinkIcon } from "lucide-react";

const libraryContent = {
  images: [
    new URL('../assets/LibImages/Picture0.jpg', import.meta.url).href,
    new URL('../assets/LibImages/Picture1.jpg', import.meta.url).href,
    new URL('../assets/LibImages/Picture3.jpg', import.meta.url).href
  ],
  descriptions: [
    "Entrance",
    "The reference section houses our extensive collection of academic materials",
    "The reference section houses our extensive collection of academic materials",
  ],
};

const LibraryFacilities = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === libraryContent.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? libraryContent.images.length - 1 : prev - 1
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
              src={libraryContent.images[currentImageIndex]}
              alt={`Library view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/1200/800";
                console.error("Image failed to load:", libraryContent.images[currentImageIndex]);
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#1B1464]/90 text-[#FFFFF0] p-2 sm:p-4">
              <p className="text-xs sm:text-sm md:text-base">
                {libraryContent.descriptions[currentImageIndex]}
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
            {libraryContent.images.map((_, index) => (
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
              Facilities & Collection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules">
            <Card className="shadow-lg border-2 border-[#8DB6CD]">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold mb-6 text-[#1B1464]">Rules & Regulations</h3>
                <div className="space-y-4">
                  <p className="leading-relaxed">1. To become a member of the library application needed.</p>
                  <p className="leading-relaxed">2. Deposit amount Rs. 500/- will be accepted.</p>
                  <p className="leading-relaxed">3. Members will be given one Books at a time.</p>
                  <p className="leading-relaxed">4. Books should be returned within 15 days, otherwise, a late fee of Rs. 2/- per day will be charged.</p>
                  <p className="leading-relaxed">5. Members should pay their subscription by the date 10 of every month.</p>
                  <p className="leading-relaxed">6. If the subscription is not paid for 3 months, no books will be issued in their name, and the deposit amount will be credited to the institution.</p>
                  <p className="leading-relaxed">7. If the membership is cancelled after the date 5th, the subscription for that month will have to be paid.</p>
                  <p className="leading-relaxed">8. Reference books and competitive exam books will not be given at home but should be read sitting in the library.</p>
                  <p className="leading-relaxed">9. Handle the book with care and return it to the library in good condition.</p>
                  <p className="leading-relaxed">10. Members should check the condition of a book before borrowing it from the library. If the book is found to be damaged, they should promptly inform the library staff.</p>
                  <p className="leading-relaxed">11. If the book is missing or damaged, the member should bring a new book. Otherwise, the cost of recovery shall be borne by the institution. The decision of the board in this regard will be final.</p>
                  <p className="leading-relaxed">12. Library timings are 06:00 AM. To 10:00 p.m. Members can exchange books during this time.</p>
                  <p className="mt-4 italic text-[#1B1464] font-medium">
                    The right to change the Library Rules is reserved to the Board of the Institute.
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
                    <h3 className="text-3xl font-semibold mb-6 text-[#1B1464]">Library Facilities</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Reading and Study Areas</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Quiet zones with comfortable seating and proper lighting for focused reading.</li>
                          <li>Dedicated spaces for students, researchers, and children.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Technology Integration</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Computers, printers, and Wi-Fi for research and digital learning.</li>
                          <li>Access to digital catalogues and multimedia resources.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Event Spaces</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Rooms for hosting workshops, lectures, book clubs, and cultural events.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Children's Sections</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Kid-friendly zones with age-appropriate books and storytelling sessions.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Community Engagement</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Spaces for group study, discussion, and collaboration.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-semibold mb-6 text-[#1B1464]">Book Collection</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Diverse Genres</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Fiction, non-fiction, classics, graphic novels, and poetry.</li>
                          <li>Specialized collections in science, technology, history, culture, and art.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Educational Resources</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Academic textbooks, research papers, reference materials, and journals.</li>
                          <li>Competitive exam guides, career-related books, and skill-development materials.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B1464] mb-2">Regional and Multilingual Texts</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Collections in regional languages such as Marathi, Hindi, English</li>
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
            href="/library-admission" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1B1464] text-[#FFFFF0] rounded-lg hover:bg-[#DAA520] transition-colors"
          >
            <LinkIcon className="mr-2 h-5 w-5" />
            Library Admission
          </a>
        </div>
      </div>
    </section>
  );
};

export default LibraryFacilities;