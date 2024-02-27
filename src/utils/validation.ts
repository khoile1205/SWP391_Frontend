import { Roles } from "@/enums";
import { User } from "@/models/user.model";
import * as Yup from "yup";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const loginSchema = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	password: Yup.string().required("Password is required"),
});

const signUpValidationSchema = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	email: Yup.string().email("Invalid email format").required("Email is required"),
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/\d/, "Password must contain at least one number")
		.matches(/[!@#$%^&*.,_-]/, "Password must contain at least one special character"),
});

const createRecipeValidationSchema = (user: User) =>
	Yup.object().shape({
		title: Yup.string().required("Title is required"),
		description: Yup.string().required("Description is required"),
		portion: Yup.number()
			.required("Portion is required")
			.min(1, "Portion must be greater than 0")
			.max(999, "Portion must be less than 999"),
		cookingTime: Yup.number()
			.required("Cooking time is required")
			.min(1, "Cooking time must be greater than 0")
			.max(999, "Cooking time must be less than 999"),
		price:
			user?.role === Roles.CHEF
				? Yup.number().required("Price is required").min(1, "Price must be greater than 0")
				: Yup.number(),
		categories: Yup.array()
			.required("Categories is required")
			.min(1, "Recipe must be have at least one category"),
		difficult: Yup.number()
			.min(0.5, "Difficult of recipe must be greater than 0")
			.max(5, "Difficult of recipe must be less than 5")
			.required("Difficult of recipe is required"),
		ingredients: Yup.array().of(
			Yup.object().shape({
				name: Yup.string().required("Ingredient name is required"),
				amount: Yup.string().required("Ingredient amount is required"),
			})
		),
		instructors: Yup.array().of(
			Yup.object().shape({
				description: Yup.string().required("Step description is required"),
			})
		),
	});

export { phoneRegExp, signUpValidationSchema, loginSchema, createRecipeValidationSchema };
