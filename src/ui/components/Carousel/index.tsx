import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1,
	},
};

interface CarouselProps<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
	className?: string;
}

export const CarouselComponent = <T,>({ items, renderItem, className }: CarouselProps<T>) => {
	return (
		<Carousel
			responsive={responsive}
			infinite={true}
			containerClass={`${className} mt-2`}
			swipeable
			pauseOnHover
			autoPlay
			itemClass="px-2"
		>
			{items.map((item, index) => (
				<div key={index}>{renderItem(item)}</div>
			))}
		</Carousel>
	);
};
