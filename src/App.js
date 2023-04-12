import SignUp from './pages/SignPage/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignPage/SignIn';
import ScrollToTop from './ScrollToTop';
import { UserAuthContextProvider } from './Components/context/UserAuthContext';
import Dashboard from './pages/DashBoard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import ProductPage from './pages/ProductPage/ProductPage';
import AddProduct from './pages/AddProduct/AddProduct';
import Settings from './pages/Settings/Settings';
import StoreOwner from './pages/Store/StoreOwner';
import PSCustomer from './Components/PSCustomer';
function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/store" element={<StoreOwner />} />
          <Route path="/cus" element={<PSCustomer />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
