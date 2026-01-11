import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { supabase } from "../../services/supabaseClient";

export default function Footer () {

	const navigate = useNavigate();

	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
    		console.error('Logout error:', error.message);
    		return;
  			}

		navigate('/');
	}

	return (

		<div className="footer">
			 <Button label="Logout" className='footer-logout-button' onClick={logout}/>
		</ div>
	);
}
