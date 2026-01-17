import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../../services/supabaseClient";
import './LoginPage.css';

export default function LoginPage() {

      const navigate = useNavigate();

      const goToApp = (e: React.FormEvent) => {
        // Prevent Page refresh
        e.preventDefault();
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

        navigate('/app/resin');

        };

    return (
        // Allow ENTER key to call goToApp Function
        <form onSubmit={goToApp}>
        <div className="login-layout">
            <p>Here for Resins?</p>
            <div>
            <InputText placeholder="Username" className="username-input" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
            <InputText placeholder="Password" type="password" className="password-input" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
            <Button onClick={goToApp} label="Login"/>
            </div>
        </div>
        </form>
    )
}