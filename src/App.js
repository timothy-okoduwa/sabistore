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
import Editpro from './pages/EditProduct/EditPro';
import SDetails from './Components/SDetails';
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
          <Route
            path="/productpage"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <StoreOwner />
              </ProtectedRoute>
            }
          />
          <Route path="/:busName" element={<PSCustomer />} />
          <Route path="/:busName/:productId" element={<SDetails />} />
          <Route
            path="/edit/:productId"
            element={
              <ProtectedRoute>
                <Editpro />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/edit/:productId" element={<Editpro />} /> */}
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
