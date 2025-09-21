import './Layout.css';
import { useState } from 'react';
import Navbar from '../navbar/Navbar.tsx';
import Sidebar from '../sidebar/Sidebar.tsx';


export default function Layout() {

    const [visible, setVisible] = useState(true);

    const toggle = () => {
        setVisible(!visible);
    }
    return (
        <div>
        <div className='navbar-component'>
        <Navbar toggleSidebar={toggle}/>
        </div>
        <div className="sidebar-component">
        <Sidebar isVisible={visible}/>
        </div>
        </div>
    );
}