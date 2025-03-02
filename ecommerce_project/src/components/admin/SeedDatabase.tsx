import React, { useState } from 'react';

const SeedDatabase: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const [hasData, setHasData] = useState(false);

  // Mock product data for seeding
  const products = [
    {
      name: 'Laptop Pro',
      price: 1299.99,
      description: 'High-performance laptop for professionals',
      isFeatured: true,
      category_id: 1,
      inventory: 25,
      imageUrl: 'https://via.placeholder.com/300'
    },
    {
      name: 'Desktop Computer',
      price: 999.99,
      description: 'Powerful desktop for all your computing needs',
      isFeatured: true,
      category_id: 1,
      inventory: 15,
      imageUrl: 'https://via.placeholder.com/300'
    },
    {
      name: 'Monitor 4K',
      price: 399.99,
      description: 'Crystal clear 4K resolution monitor',
      isFeatured: false,
      category_id: 4,
      inventory: 30,
      imageUrl: 'https://via.placeholder.com/300'
    },
    {
      name: 'Wireless Mouse',
      price: 49.99,
      description: 'Ergonomic wireless mouse for comfort',
      isFeatured: false,
      category_id: 3,
      inventory: 50,
      imageUrl: 'https://via.placeholder.com/300'
    },
    {
      name: 'Mechanical Keyboard',
      price: 129.99,
      description: 'Tactile mechanical keyboard for gaming and typing',
      isFeatured: true,
      category_id: 3,
      inventory: 40,
      imageUrl: 'https://via.placeholder.com/300'
    },
    {
      name: 'External SSD 1TB',
      price: 159.99,
      description: 'Fast and portable external solid state drive',
      isFeatured: false,
      category_id: 1,
      inventory: 35,
      imageUrl: 'https://via.placeholder.com/300'
    }
  ];

  // Mock category data for seeding
  const categories = [
    {
      id: 1,
      name: 'Laptops & Computers',
      description: 'High performance computing solutions'
    },
    {
      id: 2,
      name: 'Phones & Tablets',
      description: 'Stay connected with the latest devices'
    },
    {
      id: 3,
      name: 'Gaming & Accessories',
      description: 'Enhance your gaming experience'
    },
    {
      id: 4,
      name: 'Monitors & Displays',
      description: 'Crystal clear visuals for work and play'
    }
  ];

  // Mock orders data for seeding
  const orders = [
    {
      id: 1001,
      customer_email: 'john@example.com',
      order_date: '2025-02-25',
      status: 'Delivered',
      total: 249.99,
      items_count: 2
    },
    {
      id: 1002,
      customer_email: 'emily@example.com',
      order_date: '2025-02-28',
      status: 'Processing',
      total: 1499.99,
      items_count: 1
    },
    {
      id: 1003,
      customer_email: 'michael@example.com',
      order_date: '2025-03-01',
      status: 'Pending',
      total: 179.97,
      items_count: 3
    },
    {
      id: 1004,
      customer_email: 'sarah@example.com',
      order_date: '2025-03-01',
      status: 'Shipped',
      total: 529.98,
      items_count: 2
    }
  ];

  const handleSeedDatabase = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate database seeding with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set flag to indicate data is seeded
      setHasData(true);
      
      setMessage({
        text: 'Database seeded successfully with initial data!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      setMessage({
        text: `Error seeding database: ${(error as Error).message}`,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate database clearing with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set flag to indicate data is cleared
      setHasData(false);
      
      setMessage({
        text: 'Database cleared successfully!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error clearing database:', error);
      setMessage({
        text: `Error clearing database: ${(error as Error).message}`,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Database Management</h2>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleSeedDatabase}
          disabled={isLoading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px',
            cursor: isLoading ? 'wait' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Processing...' : 'Seed Database'}
        </button>
        <button 
          onClick={handleClearDatabase}
          disabled={isLoading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'wait' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Processing...' : 'Clear Database'}
        </button>
      </div>
      
      {message && (
        <div 
          style={{ 
            marginTop: '20px',
            padding: '10px 15px',
            backgroundColor: message.type === 'success' ? '#c8e6c9' : '#ffccbc',
            color: message.type === 'success' ? '#2e7d32' : '#d84315',
            borderRadius: '4px'
          }}
        >
          {message.text}
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <h3>Status</h3>
        <p>Database status: {hasData ? 'Contains seed data' : 'Empty'}</p>
        <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>
          Note: This is currently a mock implementation. Firebase integration will be added in the future.
        </p>
      </div>
    </div>
  );
};

export default SeedDatabase; 