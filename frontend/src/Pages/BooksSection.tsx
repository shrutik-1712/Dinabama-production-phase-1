import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
}

const BooksSection = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentBook, setCurrentBook] = React.useState<Book | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    author: '',
    description: '',
    cover: null as File | null,
  });

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = () => {
    setCurrentBook(null);
    setFormData({
      title: '',
      author: '',
      description: '',
      cover: null,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      cover: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (book: Book) => {
    try {
      const response = await fetch(`http://localhost:3001/api/books/${book._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      toast.success('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('description', formData.description);
    if (formData.cover) {
      formDataToSend.append('cover', formData.cover);
    }

    try {
      const url = currentBook
        ? `http://localhost:3001/api/books/${currentBook._id}`
        : 'http://localhost:3001/api/books';
      const method = currentBook ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error(`Failed to ${currentBook ? 'update' : 'create'} book`);
      }
      toast.success(`Book ${currentBook ? 'updated' : 'created'} successfully`);
      setIsModalOpen(false);
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error(`Failed to ${currentBook ? 'update' : 'create'} book`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: fileInput.files ? fileInput.files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Button onClick={handleCreate} className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Book
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Cover</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-24 object-cover"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(book)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(book)}
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentBook ? 'Edit Book' : 'Add New Book'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Input
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              type="file"
              name="cover"
              onChange={handleInputChange}
              accept="image/*"
              className="mb-2"
            />
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BooksSection;