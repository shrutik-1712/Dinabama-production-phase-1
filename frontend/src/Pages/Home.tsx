import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import HeroCarousel from './HeroCarousel';
import Testimonials from './Testimonials';

interface BookType {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
}

const API_BASE_URL = 'http://localhost:3001';


const BookCard = ({ book }: { book: BookType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 w-48">
        <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
          <img
            src={book.cover || "/api/placeholder/150/225"}
            alt={`Cover of ${book.title}`}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardHeader className="relative">
          <CardTitle className="text-base leading-tight line-clamp-2">{book.title}</CardTitle>
          <CardDescription className="line-clamp-1 text-sm">by {book.author}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-between">
          <button
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors text-sm"
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
            <p>{book.description}</p>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

const BooksCarousel = ({ books }: { books: BookType[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 3 >= books.length) ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 3 < 0) ? Math.max(0, books.length - 3) : prevIndex - 3
    );
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative space-y-4">
      <div className="flex justify-end space-x-2">
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
          disabled={currentIndex + 3 >= books.length}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

const NewArrivalsSection = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/books`);
        if (!response.ok) {
          throw new Error('Books will be updated later on!');
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {/* Failed to load books: {error} */}
          Books will be added on later date
        </AlertDescription>
      </Alert>
    );
  }

  if (books.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No books available at the moment.
        </AlertDescription>
      </Alert>
    );
  }

  return <BooksCarousel books={books} />;
};

const Home = () => (
  <div className="min-h-screen bg-background">
    <HeroCarousel />
    <div className="container mx-auto px-4 py-12">
      
      <section className="space-y-6 mb-16">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <p className="text-muted-foreground">Discover our latest additions to the library</p>
          </div>
        </div>
        <NewArrivalsSection />
      </section>

      <section className="space-y-6 mb-16">
        <div>
          <h2 className="text-3xl font-bold">What Our Community Says</h2>
          <p className="text-muted-foreground">Testimonials from our valued members</p>
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