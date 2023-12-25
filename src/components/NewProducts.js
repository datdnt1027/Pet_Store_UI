import axios from 'axios'
import React from 'react'
import ProductItem from './ProductItem'
import endpoints from "../config/apiConfig"

function NewProducts() {

    const [products, setProducts] = React.useState([])

    const fetchNewProducts = async () => {

        const response = await axios.get(`${endpoints.NEW_PRODUCT}?numOfProducts=8`)

        if (response.status === 200) {

            setProducts(response.data)
        }
    }

    React.useEffect(() => {

        fetchNewProducts()
    }, [])

    return (
        <div className='px-[40px] py-[20px]'>
            <h1 className='text-[24px] text-[#342E37] font-bold'>New products</h1>
            <div className='grid grid-cols-4 gap-[20px]'>
                {
                    products.map((product) => (
                        <div key={product.productId}>
                            <ProductItem isNew={true} product={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NewProducts