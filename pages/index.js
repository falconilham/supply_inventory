
import { useContext, useState, useEffect } from 'react';
import { Container, Grid, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material'
import { Text, Modal } from '../component'
import { store } from '../store.js';
import { getProduct } from '../utils/request'

function Home() {
  const { state, dispatch } = useContext(store)
  const [drawer, setDrawer] = useState({
    type: '',
    data: {},
  })
  const { type, data } = drawer
  const getProducts = async () => {
    const { data } = await getProduct()
    dispatch({
      type: 'change Data',
      payload: data.data
    })
  }
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Container>
      <Modal setDrawer={setDrawer} type={type} data={data} refetch={() => getProducts()} />
      <Grid container direction="row" gap={2} justifyContent="center" padding={2}>
        {state.map(({ sku_code, amount, sku_img, sku_name, ...rest }, i) => {
          const items = {
            sku_code, amount, sku_img, sku_name, ...rest
          }
          return (
            <Card key={i} sm={3} xs={1} xl={4} sx={{ width: 300 }}>
              <Grid item flexDirection="row" sx={styles.content} alignContent="center" md={12} lg={12} xs={12}>
                <CardMedia
                  component="img"
                  alt={sku_name}
                  image={sku_img}
                  sx={styles.cardMedia}
                />
                <CardContent
                  sx={styles.cardContent}
                  xs={6}
                >
                  <Text gutterBottom style={styles.textContent} component="span" color="text.secondary">
                    {sku_code}
                  </Text>
                  <Text gutterBottom style={{ ...styles.textContent, fontWeight: 'bold' }} variant="h5" component="span">
                    {sku_name}
                  </Text>
                  <Text variant="body2" style={styles.textContent} color="text.secondary">
                    Qty: {amount}
                  </Text>
                </CardContent>
              </Grid>
              <CardActions style={styles.btnContent}>
                <Button
                  variant="contained"
                  onClick={() => setDrawer({
                    type: 'Add',
                    data: items
                  })}
                  sx={styles.btn}
                  style={styles.colorAdd}
                  size="small"
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  sx={styles.btn}
                  style={styles.colorDeduct}
                  size="small"
                  onClick={() => setDrawer({
                    type: 'Deduct',
                    data: items
                  })}
                >
                  Deduct
                </Button>
              </CardActions>
            </Card>
          )
        })}
      </Grid>
    </Container>
  )
}

const styles = {
  colorDeduct: {
    backgroundColor: 'orange'
  },
  colorAdd: {
    backgroundColor: 'green',
  },
  textContent: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  content: {
    display: {
      xs: 'flex',
    },
    flexDirection: {
      xs: 'row',
      md: 'column'
      // lg: 'row'
    },
    justifyContent: {
      xs: 'center'
    }
  },
  cardMedia: {
    alignItems: {
      xs: 'center',
    },
    width: {
      xs: 100,
      md: 1,
      sm: 1 / 2
    },
    maxWidth: {
      sm: '100%'
    },
    padding: {
      xs: 0,
      sm: 0
    }
  },
  cardContent: {
    width: {
      xs: 1 / 2,
      sm: 1 / 2,
      md: 1
    },
    textOverflow: {
      xl: 'ellipsis'
    },

    flexDirection: {
      xs: 'column',
    },
    display: {
      xs: 'flex'
    },
    paddingX: {
      // xs: 2
    },
    justifyContent: {
      xs: 'center',
      sm: 'normal'
    }
  },
  btnContent: {
    justifyContent: 'center',
    display: 'flex'
  },
  btn: {
    width: '40%'
  }
}

export default Home
