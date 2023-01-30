import './App.css';
import React,{useState,useEffect} from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup'; 
import Profile from "./components/auth/profile";

import MentorNav from './components/mentor/mentorNav';
import StuDataCard from './components/mentor/datacard';
import QueryCard from "./components/mentor/dashboard";


import StudentNav from './components/student/studentNav';
import StuDashboard from './components/student/dashboard';
import AddQuery from './components/student/addQuery';





function App() {

   const [user, setUser] = useState({});

   const [token,setToken]=useState(false)

  
   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(true);
    }
  }, [user]);

 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn setUser={setUser} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/mentor/:id/"
            element={
              token ? <MentorNav user={user} /> : <SignIn setUser={setUser} />
            }
          >
            <Route path="" element={<StuDataCard />} />
            <Route
              path="query/:studentId"
              element={<QueryCard user={user} />}
            />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route
            path="/student/:id/"
            element={
              token ? <StudentNav user={user} /> : <SignIn setUser={setUser} />
            }
          >
            <Route path="" element={<StuDashboard />} />
            <Route path="addquery" element={<AddQuery />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
