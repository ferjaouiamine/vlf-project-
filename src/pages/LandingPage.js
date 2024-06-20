/* eslint-disable */

import React, { useState } from 'react';
import Slider from 'react-slick';
import './LandingPage.scss';
import DashboardNavbarLandingPage from 'src/layouts/dashboard/DashboardNavbarLandingPage';
import DashboardSidebar from 'src/layouts/dashboard/DashboardSidebar';
import useResponsive from 'src/hooks/useResponsive';
import DashboardText from 'src/components/dashboardText/DashboardText';

const LandingPage = (props) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'lg');
  const settings = {
    dots: true,
    infinite: true,
    dotsClass: 'slick-dots',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="landing-page">
      {<DashboardNavbarLandingPage landingPage onOpenSidebar={() => setOpen(true)} />}
      <DashboardText />
      {/* {!isDesktop && <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />} */}
      <Slider className="slick-slider" {...settings}>
        <div>
          <img src="images/slider-image-red.png" alt="Slide 1" />
        </div>
        <div>
          <img src="images/slider-image-bulb.png" alt="Slide 2" />
        </div>
        <div>
          <img src="images/slider-image-friends.png" alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};
LandingPage.propTypes = {};
export default LandingPage;
