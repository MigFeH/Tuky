import Button from '@mui/material/Button';

const CustomButton = ({ children, id, ...props }) => (
  <Button id={id} {...props}>
    {children}
  </Button>
);

export default CustomButton;