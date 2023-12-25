import React from 'react';
import CategoryList from '../components/CateList';
import HomeHero from '../components/HomeHero';
import NewProducts from '../components/NewProducts';
import BestSell from '../components/BestSell';

const HomePage = () => {

    return (
        <div className='mt-[74px]'>
            <HomeHero />
            <CategoryList />
            <NewProducts />
            <BestSell />
        </div>
    );
};

export default HomePage;