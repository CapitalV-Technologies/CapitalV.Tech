import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../../services/supabaseClient";
import './LoginPage.css';

export default function LoginPage() {

      const navigate = useNavigate();

      const goToApp = () => {
        signIn(username, password);
      };

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({email,password,});

        if (error) {
            console.error('Login error:', error.message);
            return;
        }

        navigate('/app');

        };

    return (
        <div className="login-layout">
            <p>Here for Resins?</p>
            <div>
            <InputText placeholder="Username" className="username-input" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
            <InputText placeholder="Password" type="password" className="password-input" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
            <Button onClick={goToApp} label="Submit"/>
            </div>
        </div>
    )
}