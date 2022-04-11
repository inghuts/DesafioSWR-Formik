import './App.css';
import Routes from './Routes';
import { SWRConfig } from 'swr';

function App() {
  return (
    <div className="App">
      <SWRConfig
        value={{
          dedupingInterval: 5*60*1000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <Routes />
      </SWRConfig>
    </div>
  );
}

export default App;
