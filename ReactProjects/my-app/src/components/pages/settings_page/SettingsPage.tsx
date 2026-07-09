import './SettingsPage.css';
import { useAuth } from '../../../auth/AuthContext';
import { SelectButton } from 'primereact/selectbutton';
import { useState } from "react";
// import "primereact/resources/themes/lara-light-indigo/theme.css"; 
// import "primereact/resources/primereact.min.css";                  
// import "primeicons/primeicons.css";

export default function SettingsPage() {

    const { user } = useAuth();
    const options = ['Off', 'On'];
    const [darkModeValue, setDarkModeValue] = useState(options[0]);


    return (
        
        <div className="settings-layout">
            <b>Current User: {user?.email ?? "Should never see this Message"}</b>
            <br></br>
            <b> Dark Mode? </b>
            <SelectButton value={darkModeValue} onChange={(e) => setDarkModeValue(e.value)} options={options} />
        </div>
    )
}