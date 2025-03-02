import React, { useState, useEffect } from 'react';

interface Order {
  id: number;
  customer_email: string;
  order_date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  total: number;
  items_count: number;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using only mock data since Supabase has been removed
        // In the future, this will be replaced with Firebase
        setTimeout(() => {
          setOrders([
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
          ]);
          setLoading(false);
        }, 500); // Simulate network delay
        
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading orders...</p>
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

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Recent Orders</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Order ID</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Customer</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Total</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>#{order.id}</td>
              <td style={{ padding: '10px' }}>{order.customer_email}</td>
              <td style={{ padding: '10px' }}>{order.order_date}</td>
              <td style={{ padding: '10px' }}>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    backgroundColor: 
                      order.status === 'Delivered' ? '#c8e6c9' : 
                      order.status === 'Shipped' ? '#bbdefb' : 
                      order.status === 'Processing' ? '#fff9c4' : 
                      '#ffccbc',
                    color: 
                      order.status === 'Delivered' ? '#2e7d32' : 
                      order.status === 'Shipped' ? '#1565c0' : 
                      order.status === 'Processing' ? '#f9a825' : 
                      '#d84315'
                  }}
                >
                  {order.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>${order.total.toFixed(2)}</td>
              <td style={{ padding: '10px' }}>
                <button 
                  style={{ 
                    padding: '5px 10px', 
                    backgroundColor: '#3498db', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    marginRight: '5px' 
                  }}
                >
                  View
                </button>
                <button 
                  style={{ 
                    padding: '5px 10px', 
                    backgroundColor: '#2c3e50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList; 