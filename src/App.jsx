import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import Calendar from './pages/Calendar/Calendar';
import Board from './pages/Board/Board';
import DataGrid from './pages/DataGrid/DataGrid';


 const App = () => {
   return ( <div id="dashboard">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="calendar" element={<Calendar />} /> 
          <Route path="board" element={<Board />} /> 
          <Route path="users" element={<DataGrid />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
};

export default App;

