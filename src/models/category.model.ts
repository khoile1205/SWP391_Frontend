export class Category {
	id: string;
	imageURL: string;
	name: string;

	constructor(id: string, imageURL: string, name: string) {
		this.id = id;
		this.imageURL = imageURL;
		this.name = name;
	}
}
