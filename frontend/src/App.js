import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth';
import Crud from './components/Crud';

function App() {
  return (
    <div className="App">
      <Auth/>
      <Crud/>
    </div>
  );
}

export default App;
