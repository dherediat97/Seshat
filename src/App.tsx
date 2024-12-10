import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookList from './pages/Books';
import BookDetail from './pages/BookDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book/:isbn" element={<BookDetail />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
}
