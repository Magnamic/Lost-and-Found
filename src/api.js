const API_URL = '/api';

export async function uploadItem(formData) {
  const res = await fetch(`${API_URL}/items`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}

export async function getItems({ itemType, onlyUnclaimed }) {
  const params = [];
  if (itemType) params.push(`itemType=${encodeURIComponent(itemType)}`);
  if (onlyUnclaimed) params.push('onlyUnclaimed=true');
  const res = await fetch(`${API_URL}/items?${params.join('&')}`);
  return res.json();
}

export async function claimItem(id) {
  const res = await fetch(`${API_URL}/items/${id}/claim`, {
    method: 'POST'
  });
  return res.json();
}