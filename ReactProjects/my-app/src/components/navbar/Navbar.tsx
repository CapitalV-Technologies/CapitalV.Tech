import './Navbar.css';
import 'primeicons/primeicons.css';

export default function Navbar() {
    
    return (
        <div className="navbar">
            <div className='bars-icon'>
            <h1 className='pi pi-bars'></h1>
            </div>
            <h1 className='header'>Project Name</h1>
            <p className='company'>CapitalVTech</p>
        </div>
    );
}
