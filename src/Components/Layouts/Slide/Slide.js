import React from 'react';
import { Carousel } from 'react-bootstrap';
import slide_1 from "../../../assets/slide_1.jpg";
import slide_2 from "../../../assets/slide_2.jpg";
import slide_3 from "../../../assets/slide_3.jpg";
import slide_4 from "../../../assets/slide_4.jpg";
import slide_5 from "../../../assets/slide_5.jpg";

const Slide = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 slide-image"
          src={slide_2}
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slide-image"
          src={slide_3}
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slide-image"
          src={slide_1}
          alt="Third slide"
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slide-image"
          src={slide_4}
          alt="Third slide"
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slide-image"
          src={slide_5}
          alt="Third slide"
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default Slide;
