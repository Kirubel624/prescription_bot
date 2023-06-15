import React from 'react';
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';

const HomePage = () => {
  // Dummy data for featured products and product categories
  const featuredProducts = [
    { id: 1, name: 'Product 1', price: 10.99, rating: 4.5, reviews: 100, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 19.99, rating: 4.2, reviews: 80, image: 'product2.jpg' },
    // Add more products...
  ];

  const productCategories = [
    { id: 1, name: 'Category 1', image: 'category1.jpg' },
    { id: 2, name: 'Category 2', image: 'category2.jpg' },
    // Add more categories...
  ];
  
  const pharmaciesList = [
    { id: 1, name: 'Polycure Pharmacy', image: 'category1.jpg', numberOfProducts:"12"},
    { id: 2, name: 'SAS Pharmacy', image: 'category2.jpg', numberOfProducts:"22" },
    { id: 3, name: 'Kenema Pharmacy', image: 'category2.jpg', numberOfProducts:"13" },
    // Add more pharmacies...
  ];

  const handleSearch = (searchQuery) => {
    // Implement search functionality
    console.log('Search Query:', searchQuery);
  };

  const handleUploadPrescription = () => {
    // Implement upload prescription functionality
    console.log('Upload Prescription');
  };

  const handleSeeAll = (section) => {
    // Implement see all functionality for each product section
    console.log('See All:', section);
  };

  return (
    <div className='overflow-scroll h-full'>
      <div className="flex justify-between p-4">
        <div>
          <UserOutlined className="text-xl" />
        </div>
        <h1>PharmaZ</h1>
        <div>
          <BellOutlined className="text-xl" />
        </div>
      </div>
      <div className="text-center">
        <h3>Your Prescription Our Priority</h3>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center border border-gray-300 rounded-full p-2">
          <SearchOutlined className="mr-2" />
          <input
            type="text"
            placeholder="Search medicine..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={handleUploadPrescription}>Upload Prescription</button>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => handleSeeAll('Recent Medications')}>Recent Medications</button>
        <button onClick={() => handleSeeAll('Browse Product')}>Browse Product</button>
      </div>
      <div className="mt-4">
        <div className='flex justify-between px-4 pb-6'>
          <h2>Featured Products</h2>
          <button onClick={() => handleSeeAll('Featured Products')}>See All</button>
        </div>
        <div className="flex justify-center">
          {featuredProducts.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Reviews: {product.reviews}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className='flex justify-between px-4 pb-6'>
          <h2>Product Categories</h2>
          <button onClick={() => handleSeeAll('Product Categories')}>See All</button>
        </div>
        <div className="flex justify-center">
          {productCategories.map((category) => (
            <div key={category.id}>
              <img src={category.image} alt={category.name} />
              <h4>{category.name}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2>Browse by Pharmacies</h2>
        <div className="flex justify-center">
          {pharmaciesList.map((pharmacy) => (
            <div key={pharmacy.id}>
              <img src={pharmacy.image} alt={pharmacy.name} />
              <h4>{pharmacy.name}</h4>
              <p>{pharmacy.numberOfProducts} Products</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
