import './App.css';
import AddTask from './components/AddTask';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import EditTask from './components/EditTask';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addTask' element={<AddTask />} />
        <Route path='/editTask/:id' element={<EditTask/>} />
      </Routes>
    </div>
  );
}

export default App;
