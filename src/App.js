// import Capcha from './components/Capcha';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';

import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link,
  Routes
} from "react-router-dom";
import Table from './components/Table';
import ChangePassword from './components/ChangePassword';
import ContactUs from './components/ContactUs';
import TimeTable from './components/TimeTable';
import Register from './components/Register';
import AdminHome from './components/AdminHome';
import FacultySearch from './components/FacultySearch';
import UpdateRegister from './components/UpdateRegister';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/table" element={<Table />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/contacts" element={<ContactUs />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/facultysearch" element={<FacultySearch />} />
          <Route path="/updateregister/:id" element={<UpdateRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
