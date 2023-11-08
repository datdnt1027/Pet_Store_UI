import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import './css/CateSwiper.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import sampleCate from '../data/sampleCate';

export default () => {
    return (
        <div className="category-wrapper">
            <h1 className="category-title">Category</h1>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {sampleCate.map((item) => (
                    <SwiperSlide key={item.cate_id}>
                        <img src={item.image} alt={item.content} />
                        <p>{item.content}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
