import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, Target, History } from 'lucide-react';
import dimabama from "../assets/Images/DinaBama.jpg"

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-gray-800">
          Dina Bama Patil Library & Study Room
        </h1>
     
        <section className="mb-18 items-center">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="lg:flex">
              <div className="lg:w-1/3 relative h-[400px] lg:h-[500px] flex items-center justify-center">
                <img
                  src={dimabama}
                  alt="Shri Dina Bama Patil"
                  className="w-full h-full object-cover p-5"
                />
              </div>
              <div className="lg:w-2/3 p-6 lg:p-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 flex items-center text-gray-800">
                  <History className="mr-3 h-6 w-6 lg:h-8 lg:w-8" /> Our Legacy
                </h2>
                <div className="space-y-6">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Late Dina Bama Patil always worked for the underprivileged people of the society. He always tried his best to uplift and empower them through education to achieve their life goals. He himself came from an ordinary family and was aware of the difficulties and challenges felt by the people to overcome them.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    While working for every section of society, he strongly believed that today's children are going to be the future citizens of India and to make a better society it is necessary to provide education and assistance to them.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    The library was established to provide a peaceful environment and amenities to educating children, working students, and all bibliophile people in the society. It has been started with the intention of initiating a campaign to accelerate the reading movement.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    The library is abundant with books in Marathi, Hindi, and English languages. It provides basic infrastructure facility for self-study and books related to all educational fields. DINA BAMA LIBRARY & STUDY ROOM is a unique organization dedicated to students who possess the will to study and move ahead in their careers.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    After him, his legacy is being continued by his son, honourable Mr. Sanjay Dina Patil sir, by reaching the person standing in the last row. Hon'ble Member of Parliament Shri. Sanjay Dina Patil sir established and inaugurated the Dina Bama Patil Library and Study room on 24th November 2015 as a tribute to his father's vision.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <Separator className="my-20" />

        <section className="mb-24">
          <h2 className="text-4xl font-semibold mb-8 flex items-center justify-center text-gray-800">
            <Eye className="mr-3 h-8 w-8" /> Our Vision
          </h2>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-8 lg:p-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start space-x-4 bg-white p-8 rounded-lg shadow-md">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-lg leading-relaxed text-gray-700">
                    To become a hub of knowledge and innovation where individuals of all backgrounds can access resources for learning and personal growth.
                  </p>
                </div>
                <div className="flex items-start space-x-4 bg-white p-8 rounded-lg shadow-md">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-lg leading-relaxed text-gray-700">
                    To inspire lifelong learning, foster creativity, and connect people with the world of ideas.
                  </p>
                </div>
                <div className="flex items-start space-x-4 bg-white p-8 rounded-lg shadow-md">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-lg leading-relaxed text-gray-700">
                    To empower communities by providing inclusive and equitable access to information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-semibold mb-8 flex items-center justify-center text-gray-800">
            <Target className="mr-3 h-8 w-8" /> Our Mission
          </h2>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-8 lg:p-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <p className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-3"></div>
                    Facilitate Learning
                  </p>
                  <ul className="space-y-4">
                    <li className="text-lg leading-relaxed text-gray-700">
                      Provide diverse, high-quality materials, including books, digital resources, and multimedia
                    </li>
                    <li className="text-lg leading-relaxed text-gray-700">
                      Create a conducive environment for study, research, and intellectual development
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <p className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-3"></div>
                    Promote Accessibility
                  </p>
                  <ul className="space-y-4">
                    <li className="text-lg leading-relaxed text-gray-700">
                      Ensure resources and services are available to individuals regardless of socioeconomic status
                    </li>
                    <li className="text-lg leading-relaxed text-gray-700">
                      Incorporate technology to make resources available both in-person and online
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <p className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-3"></div>
                    Support Community
                  </p>
                  <ul className="space-y-4">
                    <li className="text-lg leading-relaxed text-gray-700">
                      Serve as a meeting point for cultural, educational, and social interactions
                    </li>
                    <li className="text-lg leading-relaxed text-gray-700">
                      Organize events, workshops, and discussions to encourage participation
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;