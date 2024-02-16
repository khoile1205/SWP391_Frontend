import { Category } from "@/models/category.model";
import { categoriesUsecase } from "@/usecases";
import { useLoadingStore } from "@/zustand/loading.store";
import { useEffect, useState, useMemo } from "react";

export const useCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const { setLoading } = useLoadingStore((state) => state);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await categoriesUsecase.getAllCategories();
			if (response.isSuccess) {
				setCategories(response.data as Category[]);
			}
			setLoading(false);
		};

		fetchData();
	}, [setLoading]);

	const memoizedCategories = useMemo(() => categories, [categories]);

	return { categories: memoizedCategories };
};
