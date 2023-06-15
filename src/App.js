import logo from './logo.svg';
import './App.css';
import PrescriptionUploader from './Components/PrescriptionUploader';
import PrescriptionUpload from './Components/language test/PrescriptionUpload';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNavigationBar from './Components/Bottombar/Bottombar';
import HomePage from './Pages/Homepage';
import ScanPage from './Pages/Scanpage';
function App() {
  return (
    <div>
    <PrescriptionUpload/>
    </div>
  );
}

export default App;
