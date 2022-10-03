import './App.css';
import Navbar from './Components/Navbar';
import MainRoutes from './Pages/MainRoutes';
import Status from './SingleProd/Status';
// import Addnew from './SingleProd/Addnew';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <MainRoutes/>
      {/* <Status/> */}
    </div>
  );
}

export default App;
