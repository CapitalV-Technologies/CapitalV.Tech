import './SettingsPage.css';
import { useAuth } from '../../../auth/AuthContext';
import { useState } from "react";
import Select_Button from '../../buttons/select_button/Select_Button'

export default function SettingsPage() {

    const { user } = useAuth();
    const darkModeSettingOptions = ['Dark Mode ON', 'Dark Mode OFF'];
    const [darkModeValue, setDarkModeValue] = useState(darkModeSettingOptions[0]);


    return (
        
        <div className="settings-layout">
            <b>Current User: {user?.email ?? "Should never see this Message"}</b>
            <div className="settings-row">
            <p> (Dark mode is currently not available): </p>
            <div className="dark-mode-select-button">
                <Select_Button options={darkModeSettingOptions} value={darkModeValue} onChange={(val) => setDarkModeValue(val)}/>
            </div>
            </div>
            
        </div>
    )
}