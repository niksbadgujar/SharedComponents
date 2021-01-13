import './App.css';
import { BrowserRouter, } from 'react-router-dom';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainComponent />
        {/* <ParentComponent /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
