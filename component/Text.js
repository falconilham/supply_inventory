import { Typography } from '@mui/material';

function Text({ children, ...props }) {
    return (
        <Typography
            sx={{
                fontSize: {
                    lg: 30,
                    md: 20,
                    sm: 20,
                    xs: 13
                }
            }}
            {...props}
        >
            {children}
        </Typography>
    )
}

export default Text