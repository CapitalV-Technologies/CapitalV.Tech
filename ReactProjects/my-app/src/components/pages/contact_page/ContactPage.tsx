import './ContactPage.css';
import { useAuth } from '../../../auth/AuthContext';

export default function ContactPage() {

   const { user } = useAuth();


    return (
        
        <div>
            <h1>{user?.email ?? "Should never see this Message"}</h1>
        </div>
    )
}