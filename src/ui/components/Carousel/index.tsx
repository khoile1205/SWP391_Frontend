import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type CarouselResponsiveRenderItems = {
	desktopItems?: number;
	mobileItems?: number;
	tabletItems?: number;
};

const responsive = ({ desktopItems, mobileItems, tabletItems }: CarouselResponsiveRenderItems) => ({
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: desktopItems ?? 3,
		slidesToSlide: desktopItems ?? 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: tabletItems ?? 2,
		slidesToSlide: tabletItems ?? 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: mobileItems ?? 1,
		slidesToSlide: mobileItems ?? 1,
	},
});

interface CarouselProps<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
	className?: string;
	responsiveItems?: CarouselResponsiveRenderItems;
}

export const CarouselComponent = <T,>({
	items,
	renderItem,
	className,
	responsiveItems,
}: CarouselProps<T>) => {
	if (items.length == 0) {
		console.log(items);
	}
	return (
		<Carousel
			responsive={responsive(responsiveItems ?? {})}
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
