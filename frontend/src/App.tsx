import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

const App = () => {
  const {isLoggedIn}= useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p className="px-6">
            Home Page
          </p>
        </Layout>}/>
          <Route path="/search" element={<Layout>
          <p className="px-6">
           Search Page
          </p>
        </Layout>} />

        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="/signin" element={<Layout><SignIn/></Layout>}/>
        {isLoggedIn && <>
        <Route path="/add-hotel" element={
          <Layout>
            <AddHotel/>
          </Layout>
        }/>
        <Route path="/edit-hotel/:hotelId" element={
          <Layout>
            <EditHotel/>
          </Layout>
        }/>
        <Route path="/my-hotels" element={
          <Layout>
            <MyHotels/>
          </Layout>
        }/>
        </>}
          <Route path="*" element={<Navigate to="/" />} />
    
      </Routes>
    </Router>
  );
};

export default App;
