import axios from 'axios';
import React from 'react'
import sampleProduct from '../data/sampleProduct';
import { useToast } from "@chakra-ui/react";
import ProductList from '../components/ProductList';

function Product() {

    const [products, setProducts] = React.useState(sampleProduct.products)
    const toast = useToast()

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://localhost:7206/collections/products?page=1'); // Replace with your API endpoint
            const data = await response.data;
            //console.log(data);
            setProducts(data); // Assuming the API response returns an array of product objects
        } catch (error) {
            let message = `Error ${error.response.status}: ${error.response.data.message}`;

            if (error.response.status === 403) {
                message = `Xin lỗi tài khoản này không có quyền.`;
            }
            if (error.response.status === 401) {
                message = `Vui lòng đăng nhập lại.`;
            }
            if (error.response.status === 409) {
                message = `Thông tin bị trùng.`;
            }
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    return (
        <div>
            <ProductList products={products} />
        </div>
    )
}

export default Product