import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import HeroCarousel from './HeroCarousel';
import Testimonials from './Testimonials';
import { booksData } from '../Jsons/books.ts';

interface BookType {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
}

const BookCard = ({ book }: { book: BookType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 w-full">
        <div className="aspect-[4/6] relative overflow-hidden rounded-t-lg">
          <img
            src={book.cover || "/api/placeholder/120/180"}
            alt={`Cover of ${book.title}`}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardHeader className="relative p-3">
          <CardTitle className="text-base leading-tight line-clamp-2">{book.title}</CardTitle>
          <CardDescription className="line-clamp-1 text-base">by {book.author}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-between p-3">
          <button
            className="inline-flex items-center space-x-1 text-primary hover:text-primary-600 transition-colors text-sm"
            onClick={openDialog}
          >
            <span>Read more</span>
          </button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[640px] flex items-start gap-6">
          <div className="w-1/3 aspect-[2/3] relative overflow-hidden rounded-lg">
            <img
              src={book.cover || "/api/placeholder/400/600"}
              alt={`Cover of ${book.title}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-2/3">
            <DialogHeader>
              <DialogTitle>{book.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{book.author}</DialogDescription>
              <br/>
              <p className='text-justify'>{book.description}</p>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const BooksCarousel = ({ books }: { books: BookType[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerPage = 4 ;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + booksPerPage >= books.length) ? 0 : prevIndex + booksPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - booksPerPage < 0) ? Math.max(0, books.length - booksPerPage) : prevIndex - booksPerPage
    );
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + booksPerPage);

  return (
    <div className="relative space-y-2">
      <div className="flex justify-end space-x-2 mb-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={nextSlide}
          disabled={currentIndex + booksPerPage >= books.length}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

const NewArrivalsSection = () => {
  const books = booksData;
  return <BooksCarousel books={books} />;
};

const Home = () => (
  <div className="min-h-screen bg-background">
    <HeroCarousel />
    <div className="container mx-auto px-4 py-8">
      <section className="space-y-4 mb-12">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <p className="text-sm text-muted-foreground">Discover our latest additions to the library</p>
          </div>
        </div>
        <NewArrivalsSection />
      </section>

      <section className="space-y-6 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-center">What Our Community Says</h2>
          <p className="text-center text-lg">Testimonials from our valued members</p>
        </div>
        <Testimonials />
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground">We're here to help and answer any questions</p>
        </div>
        <Card className="bg-primary/5">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <Phone className="mr-2 h-5 w-5 text-primary" />
              <span className="text-lg">+91 - 9702518684</span>
            </div>
            <div className="flex space-x-4">
              <Button className='bg-[#1B1464]' asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  </div>
);

export default Home;