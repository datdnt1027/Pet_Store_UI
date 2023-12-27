import React from 'react'
import ProductItem from './ProductItem'
import endpoints from "../config/apiConfig"
import axios from 'axios'

function BestSell() {

    const [products, setProducts] = React.useState([])

    const fetchBestSellProduct = async () => {

        const response = await axios.get(`${endpoints.BEST_SELL_PRODUCT}?numOfProducts=8`)

        if (response.status === 200) {

            setProducts(response.data)
        }
    }

    React.useEffect(() => {

        fetchBestSellProduct()
    }, [])

    return (
        <div className='px-[40px] py-[20px]'>
            <h1 className='text-[24px] text-[#342E37] font-bold'>Best sale products</h1>
            <div className='grid grid-cols-4 gap-[20px]'>
                {
                    products.map((product) => (
                        <div key={product.productId}>
                            <ProductItem isNew={false} product={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BestSell