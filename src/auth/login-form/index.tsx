import { BasicTextFields } from "@/components/atoms/input";
import { Box, Button } from "@mui/material";
import { BasicCard } from "@/components/atoms/card";

const LoginForm = () => {



	return (
		<Box sx={{
			width:'100%',
			border:'1px solid red ',
			display: 'flex',
			justifyContent:'center' 
		}}>
		<BasicCard>
					<BasicTextFields/>
					<BasicTextFields/>
					<Button/>
			</BasicCard>
		</Box>
	);
};

export default LoginForm;
