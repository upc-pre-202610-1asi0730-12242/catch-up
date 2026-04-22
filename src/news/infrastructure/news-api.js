import axios from "axios";

/**
 * @typedef {Object} SourceResource
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} [url]
 * @property {string} [category]
 * @property {string} [language]
 * @property {string} [country]
 */

/**
 * @typedef {Object} SourcesResponse
 * @property {string} status
 * @property {SourceResource[]} sources
 */

/**
 * @typedef {Object} ArticleResource
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [url]
 * @property {string} [urlToImage]
 * @property {string} [publishedAt]
 * @property {SourceResource} source
 */

/**
 * @typedef {Object} ArticlesResponse
 * @property {string} status
 * @property {ArticleResource[]} articles
 */

/**
 * Infrastructure adapter for NewsAPI HTTP endpoints.
 *
 * @remarks
 * This class isolates external transport concerns from the application and
 * domain layers.
 */
const newsApi               = import.meta.env.VITE_NEWS_API_URL;
const apiKey                = import.meta.env.VITE_NEWS_API_KEY;
const sourcesEndpoint       = import.meta.env.VITE_SOURCES_ENDPOINT_PATH;
const topHeadlinesEndpoint  = import.meta.env.VITE_TOP_HEADLINES_ENDPOINT_PATH;

const http = axios.create({
    baseURL: newsApi,
    params: {
        apiKey: apiKey,
    },
})

export class NewsApi {

    /**
     * Retrieves available news sources.
     *
     * @returns {Promise<import('axios').AxiosResponse<SourcesResponseResource>>}
     */
    getSources() {
        return http.get(`${sourcesEndpoint}`);
    }

    /**
     * Retrieves top headlines for a specific source id.
     *
     * @param {string} sourceId
     * @returns {Promise<import('axios').AxiosResponse<ArticlesResponseResource>>}
     */
    getArticlesForSourceId(sourceId) {
        return http.get(`${topHeadlinesEndpoint}`, {params: {sources: sourceId}});
    }

}