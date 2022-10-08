import axios from './axios'

const getProduct = async () => {
    const products = await axios({
        method: 'get',
        url: '/product'
    })
    return products
}

const addStock = async (sku, amount) => {
    const products = await axios({
        method: 'post',
        url: `/product/${sku}/add-stock`,
        data: {
            amount: parseInt(amount, 10)
        }
    })
    return products
}

const deductStock = async (sku, amount) => {
    const products = await axios({
        method: 'post',
        url: `/product/${sku}/deduct-stock`,
        data: {
            amount: parseInt(amount, 10)
        }
    })
    return products
}

export {
    getProduct,
    addStock,
    deductStock,
}