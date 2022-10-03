import React from 'react'
import { Box } from '@chakra-ui/react';
// import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  
const Coursel = () => {
    const [slider, setSlider] = React.useState(null);
    console.log("slider",slider)

    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    // const top = useBreakpointValue({ base: '90%', md: '50%' });
    // const side = useBreakpointValue({ base: '30%', md: '10px' });
  
    // These are the images used in the slide
    const cards = [
           'https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/6107d28b-2bcb-44e6-9743-655b54550b8f1659020199598-Workwear_Desk--1-.jpg',
           'https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/8/31/621f4daf-7b6a-4bbf-ab6e-015f5b59f0eb1661951482098-Tops---Tees_Desk.jpg',
           'https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg',
           'https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg',
           'https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/bc89bda3-e7dc-42fc-91f8-e380f36303c11651599573964-Tops---Tees_Desk.jpg',
           'https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/9dc6368b-8168-495f-8259-97e29f523b0c1649582887347-Loungewear_Desk.jpg',
            
    ];
  
    return (
      <Box
        position={'relative'}
        height={'400px'}
        width='95%'
        margin='auto'
        // overflow={'hidden'}
        >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              height='350px'
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>
  )
}

export default Coursel