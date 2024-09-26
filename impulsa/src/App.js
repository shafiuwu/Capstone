import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Header, SeccionPrincipal } from './components';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <SeccionPrincipal></SeccionPrincipal>
    </div>
  );
}

export default App;
