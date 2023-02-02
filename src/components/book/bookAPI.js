import api from "../../apiService";


export const fetchBooks = async ({ pageNumber, limit, query }) => {
    try {
        let url = `/books?_page=${pageNumber}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
};

