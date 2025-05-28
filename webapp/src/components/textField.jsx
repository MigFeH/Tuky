import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, id, value, type }) => (
    <TextField label={label} id={id} value={value} type={type} />
);

export default CustomTextField;