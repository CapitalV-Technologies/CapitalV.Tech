import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Footer () {

	const navigate = useNavigate();

	const logout = () => {
		navigate('/');
	}

	return (

		<div className="footer">
			 <Button label="Logout" className='footer-logout-button' onClick={logout}/>
		</ div>
	);
}
