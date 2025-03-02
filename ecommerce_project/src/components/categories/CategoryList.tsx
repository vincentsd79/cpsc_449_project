import React, { useState, useEffect } from 'react';
// Removed Supabase import

// Flexible interface that can adapt to the actual data structure
interface Category {
  id: string;
  name?: string;
  title?: string;      // Alternative to name
  category_name?: string; // Another alternative
  description?: string;
  details?: string;    // Alternative to description
  info?: string;       // Another alternative
  [key: string]: any;  // Allow any other properties
}

// Mock category data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Laptops & Computers',
    description: 'High performance computing solutions'
  },
  {
    id: '2',
    name: 'Phones & Tablets',
    description: 'Stay connected with the latest devices'
  },
  {
    id: '3',
    name: 'Gaming & Accessories',
    description: 'Enhance your gaming experience'
  },
  {
    id: '4',
    name: 'Monitors & Displays',
    description: 'Crystal clear visuals for work and play'
  }
];

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('An unexpected error occurred while fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to extract category information regardless of column names
  const getCategoryName = (category: Category): string => {
    return category.name || category.title || category.category_name || 'Unnamed Category';
  };
  
  const getCategoryDescription = (category: Category): string => {
    return category.description || category.details || category.info || '';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading categories...</p>
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

  if (categories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Shop by Category</h2>
      <div className="product-grid">
        {categories.map(category => (
          <div key={category.id} className="product-card">
            <div className="product-image" />
            <h3>{getCategoryName(category)}</h3>
            <p>{getCategoryDescription(category)}</p>
            <button>Browse {getCategoryName(category)}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList; 