import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "The journey from being Miss to CA krishna Taparia was a long but fulfilling one. I have so many people to thank for me being what I am today. Foremost my family and friends who have been very patient and supportive throughout the process. ICAI for providing the opportunity so that I can fulfill my dreams. Dina Bama Patil Library is one institute that I cannot thank enough without it. I could have never found that space and zone where I can  spend my dedicated hours. All I needed was patience, hard work, and lots of perseverance's don't give up ever and you will find yourself right next to the finish line with a title in front of your name.",
    name: "krishna Taparia",
    profession: "chartered accountant"
  },
  {
    id: 2,
    content: "Finally , a long awaited prefix is here CA Sanket Nailesh Patel. I thank to my parents, ICAI ,Dina Bama Patil library, my mentors who gave me the right direction at right point of time for achieving this success. For achieving this name tag is you should be patience, confident, disciplined and hardworking without this the journey of becoming is incomplete. So there are my views which are required to become a Chartered accountant.",
    name: "Sanket Nailesh Patel",
    profession: "Chartered Accountant"
  },
  {
    id: 3,
    content: "I feel so blessed every time I See my CA final Marksheet, I must say the feeling can't be described in words. Finally I have added prefix CA to my name Sunil Pandey. The dream of becoming a Chartered Accountant is came Through. The discipline, hard work, patience finally paid off I would like to thanks to My Parents, Dina Bama Library ICAI Teachers, friends. I am Chartered Accountant today is just because of you all.",
    name: "Sunil Pandey",
    profession: "Chartered Accountant"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="container mx-auto py-20 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold" style={{ color: '#D2B48C' }}>Testimonials</h2>
        </div>
        <div className="relative bg-white rounded-xl p-8 md:p-12">
          <div className="text-center">
            <Quote className="text-primary font-bold w-20 h-20 mx-auto mb-6" />
            <p className="font-medium mb-6 text-xl md:text-2xl text-gray-800 leading-relaxed min-h-[200px] flex items-center justify-center">
              "{currentTestimonial.content}"
            </p>
            
            <div className="mt-6">
              <h5 className="text-2xl font-bold text-primary mb-2">{currentTestimonial.name}</h5>
              <span className="text-lg text-neutral font-semibold">{currentTestimonial.profession}</span>
            </div>
          </div>
          
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-0 -ml-4 md:-ml-10 transform -translate-y-1/2 bg-primary/20 hover:bg-primary/30 text-primary p-2 md:p-3 rounded-full shadow-md"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-0 -mr-4 md:-mr-10 transform -translate-y-1/2 bg-primary/20 hover:bg-primary/30 text-primary p-2 md:p-3 rounded-full shadow-md"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full mx-2 transition-all duration-300 ${
                index === currentIndex ? 'bg-secondary w-6' : 'bg-muted'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;