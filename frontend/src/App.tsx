import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import Home from "./pages/Home";
import "./index.scss"
import { ToastContainer } from 'react-toastify';
import "./index.css"
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchInitialData } from "./api";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchInitialData(dispatch,setLoading);
  }, [])
  return (
    <>
      <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={true}
      closeOnClick
      rtl={false}
      
      draggable
      theme="light"
      limit={1} // Limit the number of toasts displayed at once
      style={{ zIndex: 9999 }} // Ensure it doesn't overlap with other UI elements
      />
      <Router basename="/wood-panel">
    {loading === false &&  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>}
      </Router>
    </>

  );
}

export default App;
