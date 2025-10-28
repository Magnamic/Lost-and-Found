import React, { useState, useEffect } from 'react';
import { getItems, claimItem } from './api';

function ItemList({ refresh }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [claiming, setClaiming] = useState({});
  const [showOnlyUnclaimed, setShowOnlyUnclaimed] = useState(true);

  const itemTypes = [
    "Pencil Case", "Pen", "Pencil", "Bag", "Lunch Box", "Book / Notebook", "File", "Paper / Worksheet", "Water Bottle"
  ];

  async function fetchItems() {
    const data = await getItems({ itemType: filter, onlyUnclaimed: showOnlyUnclaimed });
    setItems(data);
  }

  useEffect(() => { fetchItems(); }, [refresh, filter, showOnlyUnclaimed]);

  async function handleClaim(id) {
    setClaiming(c => ({ ...c, [id]: true }));
    await claimItem(id);
    fetchItems();
    setClaiming(c => ({ ...c, [id]: false }));
    alert("Item claimed! Please visit the lost and found department.");
  }

  return (
    <div>
      <div className="filter-bar">
        <label>Filter by Item Type: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          {itemTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <label style={{ marginLeft: '1rem' }}>
          <input type="checkbox" checked={showOnlyUnclaimed} onChange={e => setShowOnlyUnclaimed(e.target.checked)} />
          Show only unclaimed
        </label>
      </div>
      {items.length === 0 && <div>No items found.</div>}
      {items.map(item => (
        <div className="item-card" key={item.id}>
          <img src={item.imageUrl} alt={item.itemType} />
          <div className="item-info">
            <strong>{item.itemType}</strong><br/>
            <span>Name Tag: <b>{item.studentName}</b></span>
          </div>
          <div className="item-actions">
            <button
              disabled={item.claimed || claiming[item.id]}
              onClick={() => handleClaim(item.id)}
            >
              {item.claimed ? 'Claimed' : (claiming[item.id] ? 'Claiming...' : 'Claim')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;