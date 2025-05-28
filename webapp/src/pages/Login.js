import {useState} from 'react';
import axios from 'axios';
import { Container, Snackbar, Link, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../style/Base.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [setOpenSnackbar] = useState(false);

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const navigate = useNavigate();

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
        <Container component="main" maxWidth="xs" sx={{ maxHeight: "100vh", width: "100%", padding: 0 }}>
            <img src="/Tuky_mini.png" alt="Logo" className="logo" /> 

            <Typography component="h1" variant="h5">
                Login
            </Typography>

            <TextField 
                margin="normal"
                fullWidth
                label={"Username"}
                value={username}
                type={"text"}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                margin="normal"
                fullWidth
                label={"Password"}
                value={password}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button varint="contained" onClick={handleLogin} className="button" sx={{ backgroundColor: "#e28351", color: "#78361c" }}>
                Login
            </Button>

            {error && (
                <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseSnackbar} message={error} />
            )}

            <Typography component="div" sx={{ marginTop: 2 }}>
                <Link component="button" variant="body2" onClick={() => navigate('/register')}>
                    Don't have an account? Register here.
                </Link>
            </Typography>
            
        </Container>
    )
};

export default Login;