import * as React from 'react';
import Button from '@mui/material/Button';

type ButtonVariant = 'text' | 'contained' | 'outlined';

interface DynamicButtonProps {
  variant: ButtonVariant;
  text:string
}

const DynamicButton: React.FC<DynamicButtonProps> = ({ variant ,text}) => {
  return (
    <Button variant={variant}>
        {text} 
    </Button>
  );
}

export default DynamicButton;
