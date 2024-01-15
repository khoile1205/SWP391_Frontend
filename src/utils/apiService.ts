import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_BASE_URL;

class ApiService {
	private static instance: ApiService;
	private baseUrl: string = baseUrl;

	public static getInstance(): ApiService {
		if (!ApiService.instance) {
			ApiService.instance = new ApiService();
		}
		return ApiService.instance;
	}

	private getUrl(url: string): string {
		const urlObject = new URL(url, this.baseUrl);
		const pathWithoutDoubleSlashes = urlObject.pathname.replace(/\/{2,}/g, "/");
		urlObject.pathname = pathWithoutDoubleSlashes;
		return urlObject.toString();
	}

	private getHeaders(uploadfile: boolean, token?: string): Headers {
		const headers = new Headers();
		const bearerToken = Cookies.get("accessToken");
		if (!uploadfile) {
			headers.append("Content-Type", "application/json");
		}
		headers.append("Authorization", `Bearer ${token ? token : bearerToken}`);
		return headers;
	}

	private async request(
		method: string,
		url: string,
		data: unknown,
		token?: string
	): Promise<Response> {
		try {
			return await fetch(this.getUrl(url), {
				method: method,
				mode: "cors",
				headers: this.getHeaders(false, token),
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	}

	async get(url: string, token?: string): Promise<Response> {
		return this.request("GET", url, null, token);
	}

	async post(url: string, data: unknown, token?: string): Promise<Response> {
		return this.request("POST", url, data, token);
	}

	async patch(url: string, data: unknown, token?: string): Promise<Response> {
		return this.request("PATCH", url, data, token);
	}

	async put(url: string, data: unknown, token?: string): Promise<Response> {
		return this.request("PUT", url, data, token);
	}

	async delete(url: string, data?: unknown, token?: string): Promise<Response> {
		return this.request("DELETE", url, data, token);
	}
}

const apiService = ApiService.getInstance();
export default apiService;
