import React, {useState} from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { userNavigate } from 'react-router-dom';
import H1 from '../components/h1';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const navigate = userNavigate();

    const handleLogin = async () => {
        try {
            if (username.trim().length < 3) {
                setError('Username must be at least 3 characters long');
                setOpenSnackbar(true);
                return;
            }

            if (password.trim().length < 6) {
                setError('Password must be at least 6 characters long');
                setOpenSnackbar(true);
                return;
            }

            const response = await axios.post(`${apiEndpoint}/login`, {
                username,
                password
            });

            const { token } = response.data;
            if (token) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('username', username);
            }

            navigate('/home');
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setError('');
    };

    return (
        <Container component="main" maxWidth="xs">
            <H1>Login</H1>

            
        </Container>
    )
};

export default Login;