const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const multer = require("multer");

const path = require("path");

const fs = require("fs");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

// Create all required directories

const advisoryDir = path.join(__dirname, "images", "advisory");

const teamDir = path.join(__dirname, "images", "team");

const alumniDir = path.join(__dirname, "images", "alumni");

const eventsDir = path.join(__dirname, "images", "events");

const booksDir = path.join(__dirname, "images", "books");

fs.mkdirSync(advisoryDir, { recursive: true });

fs.mkdirSync(teamDir, { recursive: true });

fs.mkdirSync(alumniDir, { recursive: true });

fs.mkdirSync(eventsDir, { recursive: true });

fs.mkdirSync(booksDir, { recursive: true });

app.use("/images", express.static("images"));

// Configure multer for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir;

    if (req.path.includes("advisoryCommittee")) {
      dir = advisoryDir;
    } else if (req.path.includes("libraryTeam")) {
      dir = teamDir;
    } else if (req.path.includes("alumni")) {
      dir = alumniDir;
    } else if (req.path.includes("events")) {
      dir = eventsDir;
    } else if (req.path.includes("books")) {
      dir = booksDir;
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "book-" + uniqueSuffix + path.extname(file.originalname));
  },
});

//

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, GIF and WebP are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Connect to MongoDB

mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => {
    console.log("Connected to MongoDB");

    initializeDatabase();
  })

  .catch((err) => {
    console.error("Could not connect to MongoDB", err);

    process.exit(1);
  });

// Define all schemas

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  description: { type: String, required: true },

  image: { type: String, required: true },
});

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  role: { type: String, required: true },

  description: { type: String, required: true },

  image: { type: String, required: true },
});

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  designation: { type: String, required: true },

  Rank: { type: String, required: true },
  posting: { type: String, required: true },

  image: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },

  date: { type: Date, required: true },

  description: { type: String, required: true },

  address: { type: String, required: true },

  location: { type: String, required: true },

  timings: { type: String, required: true },

  images: [{ type: String }],
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  cover: {
    type: String,
    required: true,
    get: (cover) => `http://localhost:${PORT}${cover}` // Add full URL to cover
  },
}, {
  toJSON: { getters: true } // Enable getters when converting to JSON
});
const Member = mongoose.model("Member", memberSchema);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

const Alumni = mongoose.model("Alumni", alumniSchema);

const Event = mongoose.model("Event", eventSchema);

const Book = mongoose.model("Book", bookSchema);

// Initialize database function

const initializeDatabase = async () => {
  try {
    const memberCount = await Member.countDocuments();

    const teamMemberCount = await TeamMember.countDocuments();

    const alumniCount = await Alumni.countDocuments();

    const eventCount = await Event.countDocuments();

    const bookCount = await Book.countDocuments();

    // Initialize existing data...

    if (memberCount === 0) {
      const sampleData = [
        {
          name: "John Doe",
          description: "Expert in library science",
          image: "/images/advisory/john-doe.jpg",
        },

        {
          name: "Jane Smith",
          description: "Literacy advocate",
          image: "/images/advisory/jane-smith.jpg",
        },
      ];

      await Member.insertMany(sampleData);
    }

    if (teamMemberCount === 0) {
      const sampleTeamData = [
        {
          name: "Emily Brown",
          role: "Head Librarian",
          description: "20 years of library management experience",
          image: "/images/team/emily-brown.jpg",
        },

        {
          name: "Michael Lee",
          role: "Assistant Librarian",
          description: "Specializes in digital resources",
          image: "/images/team/michael-lee.jpg",
        },
      ];

      await TeamMember.insertMany(sampleTeamData);
    }

    if (alumniCount === 0) {
      const sampleAlumniData = [
        {
          name: "Jane Doe",
          designation: "Published author",
          Rank: "Class of 2020",
          image: "/images/alumni/jane-doe.jpg",
        },

        {
          name: "John Smith",
          designation: "Founder",
          Rank: "Class of 2018",
          image: "/images/alumni/john-smith.jpg",
        },
      ];

      await Alumni.insertMany(sampleAlumniData);
    }

    if (eventCount === 0) {
      const sampleEventData = [
        {
          title: "Summer Reading Festival",

          date: new Date("2024-07-15"),

          description: "Annual summer reading celebration",

          address: "123 Library Street",

          location: "Main Library Hall",

          timings: "10:00 AM - 6:00 PM",

          images: [
            "/images/events/summer-reading-1.jpg",
            "/images/events/summer-reading-2.jpg",
          ],
        },
      ];

      await Event.insertMany(sampleEventData);
    }

    // Initialize books data

    if (bookCount === 0) {
      const sampleBookData = [
        {
          title: "The Great Gatsby",

          author: "F. Scott Fitzgerald",

          description: "A story of decadence and excess.",

          cover: "/images/books/default-book.jpg",
        },

        {
          title: "To Kill a Mockingbird",

          author: "Harper Lee",

          description: "A classic of modern American literature.",

          cover: "/images/books/default-book.jpg",
        },
      ];

      await Book.insertMany(sampleBookData);

      console.log("Books initialized with sample data");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Helper function for deleting images

const deleteImage = (imagePath) => {
  if (!imagePath || imagePath === "/images/books/default-book.jpg") return;
  const fullPath = path.join(__dirname, imagePath);

  fs.unlink(fullPath, (err) => {
    if (err) console.error("Error deleting image:", err);
  });
};

// Advisory Committee Routes

app.get("/api/advisoryCommittee", async (req, res) => {
  try {
    const members = await Member.find();

    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Error fetching members" });
  }
});

app.post("/api/advisoryCommittee", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const newMember = new Member({
      name: req.body.name,

      description: req.body.description,

      image: `/images/advisory/${req.file.filename}`,
    });

    await newMember.save();

    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: "Error creating member" });
  }
});

app.put(
  "/api/advisoryCommittee/:name",
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        description: req.body.description,
      };

      if (req.file) {
        updateData.image = `/images/advisory/${req.file.filename}`;
      }

      const member = await Member.findOneAndUpdate(
        { name: req.params.name },

        updateData,

        { new: true }
      );

      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }

      if (req.file && member.image !== updateData.image) {
        deleteImage(member.image);
      }

      res.json(member);
    } catch (error) {
      res.status(400).json({ error: "Error updating member" });
    }
  }
);

app.delete("/api/advisoryCommittee/:name", async (req, res) => {
  try {
    const member = await Member.findOneAndDelete({ name: req.params.name });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    deleteImage(member.image);

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting member" });
  }
});

// Library Team Routes

app.get("/api/libraryTeam", async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();

    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching team members" });
  }
});

app.post("/api/libraryTeam", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const newTeamMember = new TeamMember({
      name: req.body.name,

      role: req.body.role,

      description: req.body.description,

      image: `/images/team/${req.file.filename}`,
    });

    await newTeamMember.save();

    res.status(201).json(newTeamMember);
  } catch (error) {
    res.status(400).json({ error: "Error creating team member" });
  }
});

app.put("/api/libraryTeam/:name", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
    };

    if (req.file) {
      updateData.image = `/images/team/${req.file.filename}`;
    }

    const teamMember = await TeamMember.findOneAndUpdate(
      { name: req.params.name },

      updateData,

      { new: true }
    );

    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    if (req.file && teamMember.image !== updateData.image) {
      deleteImage(teamMember.image);
    }

    res.json(teamMember);
  } catch (error) {
    res.status(400).json({ error: "Error updating team member" });
  }
});

app.delete("/api/libraryTeam/:name", async (req, res) => {
  try {
    const teamMember = await TeamMember.findOneAndDelete({
      name: req.params.name,
    });

    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    deleteImage(teamMember.image);

    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting team member" });
  }
});

// Alumni Routes

app.get("/api/alumni", async (req, res) => {
  try {
    const alumni = await Alumni.find();

    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: "Error fetching alumni" });
  }
});

app.post("/api/alumni", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const newAlumni = new Alumni({
      name: req.body.name,

      designation: req.body.designation,
      posting: req.body.posting,

      Rank: req.body.Rank,

      image: `/images/alumni/${req.file.filename}`,
    });

    await newAlumni.save();

    res.status(201).json(newAlumni);
  } catch (error) {
    res.status(400).json({ error: "Error creating alumni" });
  }
});

app.put("/api/alumni/:name", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      designation: req.body.designation,
      Rank: req.body.Rank,
      posting: req.body.posting,
    };

    if (req.file) {
      updateData.image = `/images/alumni/${req.file.filename}`;
    }

    const alumni = await Alumni.findOneAndUpdate(
      { name: req.params.name },

      updateData,

      { new: true }
    );

    if (!alumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }

    if (req.file && alumni.image !== updateData.image) {
      deleteImage(alumni.image);
    }

    res.json(alumni);
  } catch (error) {
    res.status(400).json({ error: "Error updating alumni" });
  }
});

app.delete("/api/alumni/:name", async (req, res) => {
  try {
    const alumni = await Alumni.findOneAndDelete({ name: req.params.name });

    if (!alumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }

    deleteImage(alumni.image);

    res.json({ message: "Alumni deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting alumni" });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Error fetching event" });
  }
});

app.post("/api/events", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imagePaths = req.files.map(
      (file) => `/images/events/${file.filename}`
    );

    const eventData = {
      ...req.body,

      images: imagePaths,

      date: new Date(req.body.date),
    };

    const newEvent = new Event(eventData);

    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: "Error creating event" });
  }
});

app.put("/api/events/:id", upload.array("images", 5), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(
        (file) => `/images/events/${file.filename}`
      );

      updateData.images = [...event.images, ...newImagePaths];
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,

      updateData,

      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: "Error updating event" });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete all images associated with the event

    event.images.forEach((imagePath) => {
      deleteImage(imagePath);
    });

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting event" });
  }
});

// Delete specific image from event

app.delete("/api/events/:id/images/:filename", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const imagePath = `/images/events/${req.params.filename}`;

    event.images = event.images.filter((img) => img !== imagePath);

    await event.save();

    deleteImage(imagePath);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting image" });
  }
});

app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

app.post("/api/books", upload.single("cover"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Book cover image is required" });
    }

    const bookData = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      cover: `/images/books/${req.file.filename}`,
    };

    const newBook = new Book(bookData);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      deleteImage(`/images/books/${req.file.filename}`);
    }
    res.status(400).json({ error: "Error creating book: " + error.message });
  }
});

app.put("/api/books/:id", upload.single("cover"), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updateData = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
    };

    if (req.file) {
      updateData.cover = `/images/books/${req.file.filename}`;
      // Delete old cover image if it exists and isn't the default
      if (book.cover && book.cover !== "/images/books/default-book.jpg") {
        deleteImage(book.cover);
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    if (req.file) {
      deleteImage(`/images/books/${req.file.filename}`);
    }
    res.status(400).json({ error: "Error updating book: " + error.message });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Delete book cover if it's not the default image
    if (book.cover && book.cover !== "/images/books/default-book.jpg") {
      deleteImage(book.cover);
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting book: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
