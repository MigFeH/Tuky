import { Typography } from '@mui/material';

const CustomTypography = ({ children, variant, id }) => (
  <Typography variant={variant} id={id}>
    {children}
  </Typography>
);

export default CustomTypography;