import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


 interface IBasicCard {
    title?:string
    children: React.ReactNode;
 }
export const BasicCard :React.FC<IBasicCard> = ({title,children}) => {
  return (
    <Card sx={{
        width:"50%",
        backgroundColor:'#f5f5f5',
        minHeight:"300px",
        borderRadius:"5px"
   }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
         {title ?? ''}
        </Typography>
        <Box>
            {children}
            </Box>
            </CardContent>
    </Card>
  );
}
