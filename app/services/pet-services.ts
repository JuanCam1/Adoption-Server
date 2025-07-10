import axios from "axios";

export const getLatitudAndLongitud = async (location: string) => {
	try {
		const response = await axios.get<LatitudLongitudModelI[]>(
			`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`,
		);
		return response.data;
	} catch (_error) {
		return undefined;
	}
};
