import {useState} from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTypography from '../components/typography';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

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
        <Container component="main" maxWidth="xs">
            <CustomTypography variant="h1">
                Register
            </CustomTypography>

            
        </Container>
    )
};

export default Register;