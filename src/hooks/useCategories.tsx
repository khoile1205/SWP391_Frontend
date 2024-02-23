import { categoriesStore } from "@/zustand/category.store";
import { useLoadingStore } from "@/zustand/loading.store";
import { useEffect } from "react";

export const useCategories = () => {
	const { setLoading } = useLoadingStore((state) => state);
	const { getAllCategories } = categoriesStore((state) => state);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			await getAllCategories();
			setLoading(false);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
