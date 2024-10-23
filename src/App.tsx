import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import client from './ApolloClient';
import { ApolloProvider } from '@apollo/client/react';
import { GET_ENS_DETAILS } from './queries';

const App: React.FC = () => {
  const [ensName, setEnsName] = useState('');
  const [getEnsDetails, { loading, data, error }] = useLazyQuery(GET_ENS_DETAILS);

  const handleSearch = () => {
    if (ensName) {
      getEnsDetails({ variables: { name: ensName } });
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center'}}>
      <h1>ENS Lookup</h1>
      <input
        type="text"
        value={ensName}
        onChange={(e) => setEnsName(e.target.value)}
        placeholder="Enter ENS name (e.g. vitalik.eth)"
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px', marginLeft: '10px' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.domains.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          <h2>Details for: {data.domains[0].name}</h2>
          <p><strong>Owner:</strong> {data.domains[0].owner.id}</p>
          <p><strong>Resolver:</strong> {data.domains[0].resolver.address}</p>
          <p><strong>Created At:</strong> {new Date(parseInt(data.domains[0].createdAt) * 1000).toLocaleDateString()}</p>
        </div>
      ) : (
        data && <p>No results found for "{ensName}"</p>
      )}
    </div>
  );
};

const WrappedApp: React.FC = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default WrappedApp;
