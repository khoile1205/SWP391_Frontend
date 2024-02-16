export type CreatedBecomeChefRequestDTO = {
	identityImageUrl: string;
	certificateImageUrls: string[];
	fullName: string;
	phoneNumber: string;
	gender: string;
	address: string;
	dob: Date;
	category: string;
	email: string;
	experience: string;
	achievement: string;
};

export type UpdateBecomeChefRequestDTO = Partial<CreatedBecomeChefRequestDTO>;
