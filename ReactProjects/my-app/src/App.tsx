import { useState } from 'react';
import './App.css';
import Layout from './components/layout/Layout.tsx';
import '../src/styles/colors.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App
