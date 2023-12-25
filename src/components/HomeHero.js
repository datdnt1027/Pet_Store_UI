import React from 'react'
import { Carousel } from 'antd'
import BG1 from '../assets/backgrounds/BG1.png'
import BG2 from '../assets/backgrounds/BG2.png'
import BG3 from '../assets/backgrounds/BG3.png'
import { Link } from 'react-router-dom'

const contentStyle = {
    height: '38vw',
    objectFit: 'contain'
}

const listBackground = [
    {
        image: BG1,
        title1: "Make Your",
        title2: "pets Happy",
        label: "Pet food & accessories",
        type: 0
    },
    {
        image: BG2,
        title1: "best Dog clothing ",
        title2: "& accessories",
        label: "Satisfy Your Pet's Palate",
        type: 1
    },
    {
        image: BG3,
        title1: "EVERYTHING TO WELCOME",
        title2: "your puppy HOME!",
        label: "Get up to 20% off!",
        type: 0
    }
]
function HomeHero() {
    return (
        <Carousel autoplay dots>
            {
                listBackground.map(item => (
                    <div key={item.image}>
                        <div className='relative'>
                            <div className='absolute top-[25%] left-[10%] flex flex-col items-start'>
                                <p className={`text-[20px] font-[700] text-start ${item.type === 0 ? "text-white" : "text-[#222]"}`}>
                                    {item.label}
                                </p>
                                <h1 className={`text-[60px] uppercase font-[700] text-start leading-[1.2] ${item.type === 0 ? "text-white" : "text-[#222]"}`}>
                                    {item.title1} <br />
                                    {item.title2}
                                </h1>
                                <Link to="/" className={`flex items-center justify-center mt-[10px] py-[10px] px-[20px] ${item.type === 0 ? "bg-[#fff] text-[#333]" : "bg-[#fdd444] text-[#fff]"}`}>
                                    <p className='font-[700] text-[16px]'>Shop now</p>
                                </Link>
                            </div>
                            <img style={contentStyle} src={item.image} />
                        </div>
                    </div>
                ))
            }
        </Carousel>
    )
}

export default HomeHero