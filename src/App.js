import logo from './logo.svg';
import './App.css';
import ComponentA from './Components/ComponentA';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <ComponentA />
      </header>
    </div>
    </QueryClientProvider>
  );
}

export default App;
