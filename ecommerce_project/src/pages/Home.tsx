import React from 'react';
import ProductList from '../components/products/ProductList';
import CategoryList from '../components/categories/CategoryList';

const HomePage: React.FC = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to CPSC 449 Shop</h1>
          <p>We love to sell the best products :)</p>
          <button className="primary-button">Shop Now</button>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories-section container">
        <CategoryList />
      </section>
      
      {/* Featured Products Section */}
      <section className="featured-products container">
        <h2>Featured Products</h2>
        <ProductList featuredOnly={true} />
      </section>
      
      {/* All Products Section */}
      <section className="all-products container">
        <h2>All Products</h2>
        <ProductList />
      </section>
    </>
  );
};

export default HomePage; 