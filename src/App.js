import SignUp from './pages/SignPage/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignPage/SignIn';
import ScrollToTop from './ScrollToTop';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
