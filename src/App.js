import SignUp from './pages/SignPage/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignPage/SignIn';
import ScrollToTop from './ScrollToTop';
import { UserAuthContextProvider } from './Components/context/UserAuthContext';
import Dashboard from './pages/DashBoard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import ProductPage from './pages/ProductPage/ProductPage';
function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productpage" element={<ProductPage />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
