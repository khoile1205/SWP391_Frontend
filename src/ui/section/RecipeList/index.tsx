import { Recipe } from "@/models/recipe.model";
import { RecipeCard } from "@/ui/components";
import React from "react";

interface RecipeListSectionProps {
	listRecipes: Recipe[];
	// className?: React.Class;
}
export const RecipeListSection: React.FC<RecipeListSectionProps> = ({ listRecipes }) => {
	return (
		<div className="md:grid md:grid-cols-3 md:gap-4">
			{listRecipes.map((recipe) => (
				<RecipeCard recipe={recipe} key={recipe.id}></RecipeCard>
			))}
		</div>
	);
};
