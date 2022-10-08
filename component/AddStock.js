import { useState } from 'react'
import { Box, TextField, Grid, Typography, Input, Button } from '@mui/material'
import { addStock as addNewStock } from '../utils/request'

function AddStock({ data }) {
    const { sku_code, sku_name, amount } = data
    const [value, setValue] = useState(amount)
    const onSubmit = async () => {
        const response = await addNewStock(sku_code, value)
        console.log({ response })
    }
    return (
        <Box style={style}>
            <Grid justifyContent="space-between" style={{ width: '80%', height: '80%' }}>
                <Box sx={{ flexDirection: 'column', display: 'flex', mb: 2 }}>
                    <Typography gutterBottom variant="h4" style={{ fontWeight: 'bold' }}>Add Stock</Typography>
                    <Typography color="text.secondary" gutterBottom>{sku_code}</Typography>
                    <Typography gutterBottom>{sku_name}</Typography>
                </Box>
                <Box sx={{ flexDirection: 'column', display: 'flex', mb: 5 }}>
                    <Typography color="text.secondary" gutterBottom>Amount</Typography>
                    <Input type='number' value={value} onChange={(e) => setValue(e.target.value)} label="amount" />
                </Box>
                <Box>
                    <Button onClick={onSubmit} variant="contained" style={{ width: '100%', backgroundColor: 'green', }}>Submit</Button>
                </Box>

            </Grid>
        </Box>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

export default AddStock