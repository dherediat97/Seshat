import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookList from './pages/Books';
import BookDetail from './pages/BookDetail';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/book/:isbn" element={<BookDetail />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
