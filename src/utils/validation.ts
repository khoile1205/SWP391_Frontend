import * as Yup from "yup";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/\d/, "Password must contain at least one number")
		.matches(/[@$!%*?&]/, "Password must contain at least one special character"),
});

const signUpValidationSchema = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	email: Yup.string().email("Invalid email format").required("Email is required"),
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is required"),
	address: Yup.string().required("Address is required"),
	gender: Yup.string().required("Gender is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/\d/, "Password must contain at least one number")
		.matches(/[!@#$%^&*.,_-]/, "Password must contain at least one special character"),
	phoneNumber: Yup.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.required("Phone number is required"),
});

export { phoneRegExp, signUpValidationSchema, loginSchema };
