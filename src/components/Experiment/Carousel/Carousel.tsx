import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import CarouselBox from "./CarouselBox";
import { ExperimentDataType } from "@/pages/experiment";

export default function Carousel(props: {
    experimentData: ExperimentDataType[];
}) {
    const { experimentData } = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <SliderWrapper {...settings}>
            {experimentData.map((el, index) => (
                <CarouselBox key={index} experimentData={el} />
            ))}
        </SliderWrapper>
    );
}

const SliderWrapper = styled(Slider)`
    width: 100%;
    height: 300px;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
`;
