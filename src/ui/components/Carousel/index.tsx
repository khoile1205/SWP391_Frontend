import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Carousel = () => {
	const settings: Settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: <ArrowLeftCircleIcon />,
	};

	return (
		<div className="">
			<Slider {...settings}></Slider>
		</div>
	);
};

export default Carousel;
