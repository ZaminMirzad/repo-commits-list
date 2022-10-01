import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Feed } from './Feed';

type Props = {
  commits: any[];
  setCommits: any;
  setError: any;
};

const List = ({ commits, setCommits, setError }: Props) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const params = useParams();
  const navigate = useNavigate();

  const loadMore = async () => {
    try {
      setLoading(true);
      setPage((prev) => prev + 1);
      const data = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${params.user}/${params.repo}/commits?page=${page}`,
        headers: {
          accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.REACT_APP_TOKEN}`,
        },
      });

      const uniq = commits.concat(data.data).filter((value, index, self) => {
        return self.findIndex((v) => v.node_id === value.node_id) === index;
      });
      setCommits(uniq);
      setLoading(false);
    } catch (err) {
      setError(err);
      navigate('/does/not/exist');
    }
  };
  return (
    <div className='list-wrapper'>
      <div className='list__title'>
        <h1>Commit Feed</h1>
        <h3>
          Showing results for{' '}
          <strong>
            /{params?.user}/{params?.repo}
          </strong>
        </h3>
        <h3>
          Total fetched commits:<strong> {commits.length} commits</strong>
        </h3>
      </div>
      <div className='feeds'>
        {commits.map((commit: any) => {
          return <Feed commit={commit} key={commit.node_id} />;
        })}
      </div>
      <div className='buttons-wrapper'>
        <Link to='/' className='back-btn'>
          Home
        </Link>
        <button
          type='button'
          onClick={() => loadMore()}
          className='button load-btn'
        >
          {loading ? 'Please wait...' : 'Load more'}
        </button>
      </div>
    </div>
  );
};

export default List;
