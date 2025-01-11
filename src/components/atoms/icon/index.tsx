import React from 'react';
import { SvgIconProps } from '@mui/material';
import * as Icons from '@mui/icons-material';

// DynamicIcon component
interface DynamicIconProps extends SvgIconProps {
  name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // Dynamically select the icon based on the "name" prop
  const IconComponent = Icons[name as keyof typeof Icons];

  // Check if the icon exists, and show a default if it doesn't
  if (!IconComponent) {
    console.warn(`Icon with name '${name}' not found.`);
    return <span>Icon not found</span>;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
