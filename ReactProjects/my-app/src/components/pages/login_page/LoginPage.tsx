import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import Classic_Button from '../../buttons/classic_button/Classic_Button.tsx'
import { supabase } from "../../../services/supabaseClient";
import dataPhoto from '../../../assets/data-photo.png'
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

        navigate('/app');

        };

    return (
        // Allow ENTER key to call goToApp Function
        <form onSubmit={goToApp}>
        <div className="login-layout"> 
            <img src={dataPhoto} alt="Data Photo" width="400" />
            <br></br>
            <p>ScienceDMA</p>
            <div>
            <InputText placeholder="Username" className="username-input" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
            <InputText placeholder="Password" type="password" className="password-input" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="login-classic-button">
            <Classic_Button label="Login" onClick={goToApp}></Classic_Button>
            </div>
        </div>
        </form>
    )
}