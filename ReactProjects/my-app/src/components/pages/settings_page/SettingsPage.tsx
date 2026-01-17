import './SettingsPage.css';
import { useAuth } from '../../../auth/AuthContext';

export default function SettingsPage() {

   const { user } = useAuth();


    return (
        
        <div className="settings-layout">
            <b>Current User: {user?.email ?? "Should never see this Message"}</b>
        </div>
    )
}