import React, { useState, useEffect } from 'react';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
  });

  // Define the fetchItems function at the component level
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      };
      const response = await fetch('http://127.0.0.1:8000/items/', {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call the fetchItems function when the component mounts
    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add the new item to the database
      const token = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      };

      const response = await fetch('http://127.0.0.1:8000/items/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        // Item created successfully, you can update the list of items
        // or take other actions here
        // Call the fetchItems function to reflect the newly added item
        fetchItems();

        // Reset the form
        setNewItem({
          title: '',
          description: '',
          price: '',
        });
      } else {
        // Handle the error, e.g., show an error message to the user
        console.error('Error creating item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Item List</h1>
      <button>add item</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newItem.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newItem.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleInputChange}
        />
        <button type="submit">Create Item</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Price: {item.price}</p>
            {/* Display other item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
