import { useState, memo } from 'react'
import { Box, Grid, Typography, Input, Button, Modal as ComponentModal } from '@mui/material'
import { addStock, deductStock } from '../utils/request'

function Modal({ setDrawer, type, data, refetch }) {
    const { sku_code, sku_name } = data
    const [value, setValue] = useState(0)
    const [message, setMessage] = useState({
        code: null,
        msg: ''
    })
    const { msg, code } = message
    const isAddStock = type === 'Add'
    const onSubmit = async () => {
        if (isAddStock) {
            const result = await addStock(sku_code, value).then((res) => {
                refetch()
                return res
            }).catch(err => err)
            setMessage({
                code: result?.data?.code || result?.response?.data?.code,
                msg: result?.data?.msg || result?.response?.data?.msg
            })
        } else {
            const result = await deductStock(sku_code, value).then((res) => {
                refetch()
                return res
            }).catch(err => err)
            setMessage({
                code: result?.data?.code || result?.response?.data?.code,
                msg: result?.data?.msg || result?.response?.data?.msg,
            })
        }

    }
    const closeModal = () => {
        setDrawer({
            type: '',
            data: {},
        })
        setValue(0)
        setMessage({
            code: null,
            msg: ''
        })
    }
    const drawerIsOpen = type.length > 0
    const buttonByType = !isAddStock ? { width: '100%', backgroundColor: 'orange' } : { width: '100%', backgroundColor: 'green' }
    return (
        <ComponentModal
            open={drawerIsOpen}
            onClose={closeModal}
            closeAfterTransition
            BackdropProps={{
                timeout: 200,
            }}
            sx={styles.boxContent}
        >
            <Box style={style}>
                <Grid justifyContent="space-between" style={{ width: '80%', height: '80%' }}>
                    <Box sx={{ flexDirection: 'column', display: 'flex', mb: 2 }}>
                        <Typography gutterBottom variant="h4" style={{ fontWeight: 'bold' }}>{`${type} Stock`}</Typography>
                        <Typography color="text.secondary" gutterBottom>{sku_code}</Typography>
                        <Typography gutterBottom>{sku_name}</Typography>
                    </Box>
                    {code ? (
                        <Box>
                            <Typography gutterBottom sx={{ mb: 5 }}>{msg}</Typography>
                            <Button onClick={closeModal} variant="contained" style={buttonByType}>Ok</Button>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ flexDirection: 'column', display: 'flex', mb: 5 }}>
                                <Typography color="text.secondary" gutterBottom>Amount</Typography>
                                <Input type='number' value={value} onChange={(e) => setValue(e.target.value)} label="amount" />
                            </Box>
                            <Box>
                                <Button onClick={onSubmit} variant="contained" style={buttonByType}>Submit</Button>
                            </Box>
                        </>
                    )}
                </Grid>
            </Box>
        </ComponentModal>
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

const styles = {
    boxContent: {
        padding: {
            // xs: 50
        },
        width: {
            // xs: '80%'
        }
    }
}

export default memo(Modal)