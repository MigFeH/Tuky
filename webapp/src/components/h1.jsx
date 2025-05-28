import Typography from '@mui/material/Typography';

const H1 = ({ children, id }) => (
  <Typography variant="h1" id={id}>
    {children}
  </Typography>
);

export default H1;