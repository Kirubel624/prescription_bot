import logo from './logo.svg';
import './App.css';
import PrescriptionUploader from './Components/PrescriptionUploader';
import PrescriptionUpload from './Components/language test/PrescriptionUpload';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavigationBar from './Components/Bottombar/Bottombar';
import HomePage from './Pages/Homepage';
import ScanPage from './Pages/Scanpage';
function App() {
  return (
    <div>
    {/* <PrescriptionUpload/> */}
<Router>
  <Routes>
    <Route path="/Home" element={
    
    <HomePage/>
    
    }/>
   <Route path="/Scan" element={
    
    <ScanPage/>
    
    }/>
  </Routes>
  <BottomNavigationBar/>
</Router>
    </div>
  );
}

export default App;
