import { EyeOutlined } from '@ant-design/icons'
import numeral from 'numeral'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductItem({ isNew, product }) {

    const navigate = useNavigate()

    const handleToProduct = () => {
        navigate(`/detail/${product.productId}`)
    }

    return (
        <div className="p-[10px] group border relative">
            {
                isNew &&
                <div className='py-[4px] px-[16px] bg-[#222] absolute top-[10px] left-[10px]'>
                    <p className='text-white font-[600]'>New</p>
                </div>
            }
            <div
                style={{
                    transform: "translate(-50%, -50%)"
                }}
                className="hidden z-10 flex-col items-center text-white font-[500] group-hover:flex absolute top-[50%] left-[50%] transition-all duration-300">
                <div onClick={handleToProduct} className="cursor-pointer flex items-center justify-center bg-[#fdd444] px-[20px] py-[8px]">
                    <EyeOutlined className='mr-[8px]' />
                    View
                </div>
            </div>
            <div
                style={{
                    backgroundColor:
                        '#000',
                }}
                className="w-full h-full opacity-0 group-hover:opacity-[0.3] transition-all duration-300 top-0 left-0 absolute">

            </div>
            <img
                className="w-full h-[150px] object-contain"
                src={product.imageData}
                alt="Product Image"
            />
            <p className="text-[16px] font-[500] text-[#333] p-[10px] leading-[1.4]">
                {product.productName}
            </p>
            <p className="text-[18px] font-[700] text-[#fdd444] px-[10px] leading-[1.4]">
                {numeral(product.productPrice).format('0,0')} đ
            </p>
        </div>
    )
}

export default ProductItem