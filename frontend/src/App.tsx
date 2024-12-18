import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import OPAC from './Pages/OPAC';
import Achivers from './Pages/Alumi';
import Events from './Pages/events';
import Donations from './Pages/Donations';
import Contact from './Pages/Contact';
import EResource from './Pages/Eresource';
import ErrorPage from './Pages/Error404'
import Libinfo from './Pages/Libinfo'
import StudyRoom from './Pages/StudyRoom'
import LibraryCommittee from './Pages/LibraryCommittee';
import LibraryTeam from './Pages/LibararyTeam';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            {/* <Route path="/admin" element={<AdminPanel/>} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/opac" element={<OPAC />} />
            <Route path="/achivers" element={<Achivers />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/e-resource" element={<EResource />} />
            <Route path="*" element={<ErrorPage />}/>
            <Route path="/Library-info" element={<Libinfo />} />
            <Route path="/StudyRoom" element={<StudyRoom />} />
            <Route path="/LibraryCommittee" element={<LibraryCommittee />} />
            <Route path="/LibraryTeam" element={<LibraryTeam />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;