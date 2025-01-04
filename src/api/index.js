const API_URL = '/api/scan/list'; // Endpoint where we fetch the data
const API_TOKEN = 'c7tZuNtr8zSOKinJlTIHjjUmEFkZ-eZmwkGVYv_7cKJ7-toZxW7SAKLNpdFGot9k-gUAzwSq63XaHfUH5GN4iw'; // Provided token

export const fetchTools = async ({ page, per_page, scan_category_id, query }) => {
    try {
        const requestBody = {
            page,
            per_page,
            token: API_TOKEN, // API token for authorization
        };

        // Add query and scan_category_id to the request body if provided
        if (scan_category_id) {
            requestBody.scan_category_id = scan_category_id;
        }
        if (query) {
            requestBody.query = query; // Include query if present
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `HTTP Error: ${response.status}`;

            switch (response.status) {
                case 400:
                    errorMessage = 'Bad Request: The server could not understand the request.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized: Invalid API token or insufficient permissions.';
                    break;
                case 403:
                    errorMessage = 'Forbidden: You do not have access to this resource.';
                    break;
                case 404:
                    errorMessage = 'Not Found: The requested resource does not exist.';
                    break;
                case 405:
                    errorMessage = 'Method Not Allowed: The HTTP method is not supported for this endpoint.';
                    break;
                case 500:
                    errorMessage = 'Internal Server Error: An error occurred on the server.';
                    break;
                case 503:
                    errorMessage = 'Service Unavailable: The server is currently unavailable. Please try again later.';
                    break;
                default:
                    errorMessage += ` - ${errorText}`;
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Response Data:', data);
        return data.value;
    } catch (error) {
        console.error('Error fetching scan data:', error.message);
        throw error;
    }
};
