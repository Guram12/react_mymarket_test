import React, { useEffect, useState } from 'react';
import "./Category.css"
export default function Category() {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = localStorage.getItem('authToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }
        const response = await fetch('http://127.0.0.1:8000/category/', {
        method:'GET',
        headers: headers,
        });
        console.log(token)
        console.log('Response Status:', response); 

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCategories();
  }, []);

  function renderCategoryTree(categoryList) {
    const categoryTree = [];

    categoryList.forEach(category => {
      if (category.level === 0) {
        // Top-level category
        categoryTree.push(
          <li key={category.id} className="parent-category">
            {category.name}
            <ul className="subcategories">
              {renderSubcategories(categoryList, category.id)}
            </ul>
          </li>
        );
      }
    });

    return categoryTree;
  }

  function renderSubcategories(categoryList, parentId) {
    const subcategories = categoryList.filter(category => category.parent === parentId);

    return subcategories.map(category => (
      <li key={category.id}>
        {category.name}
        <ul>{renderSubcategories(categoryList, category.id)}</ul>
      </li>
    ));
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul className="category-list">{renderCategoryTree(categories)}</ul>
    </div>
  );
}