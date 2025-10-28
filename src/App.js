import React, { useState } from 'react';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import './styles.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className="header">
        <img src="/logo.png" alt="Smart Nametag Logo" className="header-logo" />
        <h1>Smart Nametag: Lost and Found</h1>
        <p>Find and claim your lost items!</p>
      </div>
      <div className="container">
        <div className="form-section">
          <h2>Upload Found Item</h2>
          <ItemForm onUpload={() => setRefresh(r => !r)} />
        </div>
        <div className="list-section">
          <h2>Browse & Claim Lost Items</h2>
          <ItemList refresh={refresh} />
        </div>
      </div>
    </>
  );
}

export default App;