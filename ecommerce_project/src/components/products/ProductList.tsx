import React, { useState, useEffect } from 'react';
// Removed Supabase import

// Flexible interface that can adapt to the actual data structure
interface Product {
  id: string;
  name?: string;
  title?: string;  // Alternative to name
  price?: number;
  cost?: number;   // Alternative to price
  isFeatured?: boolean;
  featured?: boolean; // Alternative to isFeatured
  is_featured?: boolean; // Snake case alternative
  imageUrl?: string;
  image_url?: string; // Alternative to imageUrl
  image?: string;     // Another alternative
  description?: string;
  category_id?: string;
  categoryId?: string; // Alternative to category_id
  inventory?: number;
  stock?: number;      // Alternative to inventory
  brand_id?: string;   // Brand ID field
  [key: string]: any;  // Allow any other properties
}

interface ProductListProps {
  featuredOnly?: boolean;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    price: 1299.99,
    description: 'High-performance laptop for professionals',
    isFeatured: true,
    category_id: '1',
    inventory: 25,
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '2',
    name: 'Desktop Computer',
    price: 999.99,
    description: 'Powerful desktop for all your computing needs',
    isFeatured: true,
    category_id: '1',
    inventory: 15,
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '3',
    name: 'Monitor 4K',
    price: 399.99,
    description: 'Crystal clear 4K resolution monitor',
    isFeatured: false,
    category_id: '4',
    inventory: 30,
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    price: 49.99,
    description: 'Ergonomic wireless mouse for comfort',
    isFeatured: false,
    category_id: '3',
    inventory: 50,
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'Tactile mechanical keyboard for gaming and typing',
    isFeatured: true,
    category_id: '3',
    inventory: 40,
    imageUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '6',
    name: 'External SSD 1TB',
    price: 159.99,
    description: 'Fast and portable external solid state drive',
    isFeatured: false,
    category_id: '1',
    inventory: 35,
    imageUrl: 'https://via.placeholder.com/300'
  }
];

const ProductList: React.FC<ProductListProps> = ({ featuredOnly = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching products with a delay
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter products if featuredOnly is true
        let filteredProducts = featuredOnly 
          ? mockProducts.filter(product => 
              product.isFeatured || product.featured || product.is_featured)
          : mockProducts;
        
        if (filteredProducts.length > 0) {
          setProducts(filteredProducts);
        } else {
          setError('No products found matching the criteria.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('An unexpected error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [featuredOnly]);

  // Helper function to extract product information regardless of column names
  const getProductName = (product: Product): string => {
    return product.name || product.title || 'Unnamed Product';
  };
  
  const getProductPrice = (product: Product): number => {
    return product.price || product.cost || 0;
  };
  
  const getProductImage = (product: Product): string => {
    return product.imageUrl || product.image || product.image_url || 'https://placehold.co/300x200?text=No+Image';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        backgroundColor: '#ffebee',
        color: '#c62828',
        borderRadius: '4px' 
      }}>
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div 
            className="product-image" 
            style={{ backgroundImage: `url(${getProductImage(product)})` }}
          />
          <h3>{getProductName(product)}</h3>
          <p>${getProductPrice(product).toFixed(2)}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList; 