import React, { useState, useRef } from 'react';
import { uploadItem } from './api';
import * as tmImage from '@teachablemachine/image';

const MODEL_URL = process.env.PUBLIC_URL || '.'; // For static hosting

function getStudentList() {
  // Replace with DB lookup in production
  return [
    "AbdelRahman Mohammed", "Zayed Rashed", "Yehya Jihad", "Sultan Ismael", "Mohammed Salim", "Mohammed Sayed", "Mubarak Eisaa", "Eyad Amr", "AbdelRahman Ahmed", "Fares Abdallah", "Rashed Abdallah", "Fallah Mohammed", "Ali Musabah", "Mohammed Ahmed", "Marwan Haithem", "Salem Mohammed", "Yousef Saeed"
  ];
}

function ItemForm({ onUpload }) {
  const [imageFile, setImageFile] = useState(null);
  const [predictedType, setPredictedType] = useState('');
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const imageRef = useRef();

  const studentList = getStudentList();

  // Load TM model once
  React.useEffect(() => {
    tmImage.load(`${MODEL_URL}/model.json`, `${MODEL_URL}/metadata.json`).then(m => setModel(m));
  }, []);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
    setPredictedType('');
    if (!model || !file) return;

    // Preview image in browser
    const reader = new FileReader();
    reader.onload = ev => {
      imageRef.current.src = ev.target.result;
      setTimeout(() => classifyImage(), 300); // Wait for img to render
    };
    reader.readAsDataURL(file);
  }

  async function classifyImage() {
    if (!model) return;
    const prediction = await model.predict(imageRef.current);
    if (prediction && prediction.length) {
      const top = prediction.reduce((a, b) => a.probability > b.probability ? a : b);
      setPredictedType(top.className);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile || !predictedType || !studentName) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('itemType', predictedType);
    formData.append('studentName', studentName);

    await uploadItem(formData);
    setImageFile(null);
    setPredictedType('');
    setStudentName('');
    setLoading(false);
    if (onUpload) onUpload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Item Image:</label><br/>
      <input type="file" accept="image/*" onChange={handleImageChange} /><br/>
      {imageFile && (
        <img ref={imageRef} alt="preview" style={{ width: 160, margin: '1rem 0' }} />
      )}
      <br/>
      <label>Detected Item Type:</label><br/>
      <input type="text" value={predictedType} readOnly /><br/>
      <label>Student Name:</label><br/>
      <select value={studentName} onChange={e => setStudentName(e.target.value)}>
        <option value="">Select student</option>
        {studentList.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select><br/>
      <button type="submit" disabled={loading || !imageFile || !predictedType || !studentName}>
        {loading ? 'Uploading...' : 'Submit Item'}
      </button>
    </form>
  );
}

export default ItemForm;