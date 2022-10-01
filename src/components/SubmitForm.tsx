import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

type Props = {
  setCommits: any;
  setError: any;
};

const SubmitForm = ({ setCommits, setError }: Props) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [repoName, setRepoName] = useState('');

  const navigate = useNavigate();
  const handleSubmitCommits = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${userName}/${repoName}/commits`,
        headers: {
          accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.REACT_APP_TOKEN}`,
        },
      });
      setLoading(false);
      setCommits(data.data);
      navigate(`/${userName}/${repoName}`);
    } catch (err) {
      setError(err);
      navigate('/does/not/exist');
    }
  };
  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <h1>Users Github Detail</h1>
        <form className='form' onSubmit={(event) => handleSubmitCommits(event)}>
          <label htmlFor='username' className='label'>
            Github username:
            <input
              type='text'
              name='username'
              id='username'
              className='input'
              placeholder='john'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <label htmlFor='repoName' className='label'>
            Github repo name:
            <input
              type='text'
              name='repoName'
              id='repoName'
              className='input'
              placeholder='repo'
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              required
            />
          </label>

          <button type='submit' className='button '>
            {loading ? 'Please wait...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
