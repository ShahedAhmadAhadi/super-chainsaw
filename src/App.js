import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Posts from './Components/Posts';
import InfiniteSpecies from './Components/person/InfiniteSpecies';

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>

    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ComponentA />
      </header> */}
      {/* <h1>Lorem Ipsom</h1>
      <Posts /> */}
      <InfiniteSpecies />
      <ReactQueryDevtools />
    </div>
    </QueryClientProvider>
  );
}

export default App;
