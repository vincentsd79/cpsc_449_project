# CPSC 449 Shop - React TypeScript Application

A modern e-commerce web application built with React and TypeScript.

## Features

- Responsive design
- Product listings with featured products section
- Category browsing
- Admin dashboard with order management
- Authentication system
- Supabase backend integration

## Tech Stack

- React 18
- TypeScript
- Vite (Build tool)
- Supabase (Backend-as-a-Service)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)
- A Supabase account (free tier works for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd my-app
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the root directory and add your Supabase credentials:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to:
```
http://localhost:5173
```

## Setting Up Supabase

1. Sign up for a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from the API settings
4. Add them to the `.env` file as described above
5. Set up the database tables using the SQL below:

```sql
-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  isFeatured BOOLEAN DEFAULT false,
  category_id INTEGER REFERENCES categories(id),
  inventory INTEGER DEFAULT 0,
  imageUrl TEXT DEFAULT 'https://via.placeholder.com/300'
);

-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_email TEXT NOT NULL,
  order_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Pending',
  total DECIMAL(10, 2) NOT NULL,
  items_count INTEGER NOT NULL
);
```

6. Enable Row Level Security (RLS) for your tables and set up appropriate policies
7. Configure authentication in the Supabase dashboard

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── categories/
│   │   ├── orders/
│   │   └── products/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
├── .env (not in repo - create locally)
├── package.json
└── README.md
```

## Admin Access

To access the admin dashboard, use the following credentials:
- Email: admin@cpsc449.com
- Password: any password will work for the admin account

## Build for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License.
