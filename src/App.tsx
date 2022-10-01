import { useState } from 'react';
import SubmitForm from './components/SubmitForm';
import { Routes, Route } from 'react-router-dom';
import List from './components/List';
import { Error } from './components/Error';

// type Props = {
//   error: {
//     code: string;
//     message: string;
//     response: { data: { message: string } };
//   };
// };

function App() {
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState();

  return (
    <div className='App' data-testid='app'>
      <Routes>
        <Route
          path='/'
          element={<SubmitForm setCommits={setCommits} setError={setError} />}
        />
        <Route
          path='/:user/:repo'
          element={
            <List
              commits={commits}
              setCommits={setCommits}
              setError={setError}
            />
          }
        />
        <Route path='/does/not/exist' element={<Error error={error} />} />
      </Routes>
    </div>
  );
}

export default App;
