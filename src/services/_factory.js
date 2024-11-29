import api from "@/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getEndpointUrl = (path) => `${API_BASE_URL}${path}`;

/**
 * Sends a GET request to the specified endpoint with the given query parameters.
 *
 * @param {string} endpoint - The endpoint to send the GET request to.
 * @param {Object} [query] - An optional object containing query parameters.
 * @returns {Promise} - A promise that resolves to the response of the GET request.
 */
export function serviceGet(endpoint, query) {
  return api.get(getEndpointUrl(endpoint), { params: query ?? {} }).then((res) => res.data);
}

/**
 * Sends a POST request to the specified endpoint with the given payload.
 *
 * @param {string} endpoint - The endpoint to which the POST request is sent.
 * @param {Object} payload - The data to be sent in the body of the POST request.
 * @returns {Promise} - A promise that resolves to the response of the POST request.
 */
export function servicePost(endpoint, payload) {
  return api.post(getEndpointUrl(endpoint), payload);
}

/**
 * Sends a PATCH request to the specified endpoint with the given payload.
 *
 * @param {string} endpoint - The endpoint to send the PATCH request to.
 * @param {Object} payload - The data to be sent in the PATCH request.
 * @returns {Promise} - A promise that resolves to the response of the PATCH request.
 */
export function servicePatch(endpoint, payload) {
  return api.patch(getEndpointUrl(endpoint), payload);
}

/**
 * Deletes a resource at the specified endpoint.
 *
 * @param {string} endpoint - The endpoint URL where the resource is located.
 * @param {Object} payload - The data to be sent with the delete request.
 * @returns {Promise} - A promise that resolves to the response of the delete request.
 */
export function serviceDelete(endpoint, payload) {
  return api.delete(getEndpointUrl(endpoint), payload);
}
