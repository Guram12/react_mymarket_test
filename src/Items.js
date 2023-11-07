import './Items.css'


import React, { useState } from 'react';

export default function Items() {
  const [itemData, setItemData] = useState({
    title: '',
    description: '',
    price: '',
    specifications: false,
    mobile: '',
    category: 1, // Set the appropriate category ID
    image: null, // If you want to handle file uploads, use 'File' type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setItemData({
      ...itemData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in itemData) {
        formData.append(key, itemData[key]);
      }
      const token = localStorage.getItem("authToken")
      const response = await fetch('http://127.0.0.1:8000/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newItem = await response.json();
        // Update your state or perform any necessary action with the new item data
      } else {
        console.error('Error creating item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  
  return (
    <div>
      <h1>Create Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={itemData.title} onChange={handleInputChange} />
        </div>
        {/* Add similar input fields for other item details */}
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileUpload} />
        </div>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}
