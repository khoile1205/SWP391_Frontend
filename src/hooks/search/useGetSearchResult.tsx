import { SearchData } from "@/types/search";
import { searchStore } from "@/zustand/search.store";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";

export const useGetSearchResult = () => {
	// Zustand state
	const { search } = searchStore((state) => state);
	// Get params
	const { type } = useParams();
	// Local state
	const [result, setResult] = useState<SearchData>({
		recipes: [],
		users: [],
	});
	// Get query
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const searchKeyword = query.get("q");

	const fetchData = async () => {
		if (type !== "all" && type !== "users" && type !== "recipes") {
			return;
		}

		if (!searchKeyword) return;

		const data = await search({
			keyword: searchKeyword,
			type: type,
		});

		if (data.isSuccess) {
			setResult(data.data);
		}
	};

	useEffectOnce(() => {
		fetchData();
	});

	return { type, result, searchKeyword };
};
