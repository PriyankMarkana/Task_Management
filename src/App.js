import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './components/Home';
import UserView from './components/UserView';
import { useEffect } from 'react';
import { getTask } from './App/taskSlice';
import { useDispatch } from 'react-redux';
function App() {

  useEffect(() => {
    if (localStorage.getItem('task') === null) {
      localStorage.setItem('task', JSON.stringify([]))
    }
  }, [])
  let dispatch = useDispatch();
  dispatch(getTask());
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userView" element={<UserView />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
