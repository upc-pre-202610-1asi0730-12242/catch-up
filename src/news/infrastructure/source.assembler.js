import {LogoDevApi} from "../../shared/infrastructure/logo-dev-api.js";
import {Source} from "../domain/model/source.entity.js";

const logoApi = new LogoDevApi();

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
 * Infrastructure mapper that builds Source entities from provider resources.
 */
export class SourceAssembler {
    /**
     * @param {SourceResource} resource
     * @returns {Source}
     */
    static toEntityFromResource(resource) {
        let source = new Source({...resource});
        source.urlToLogo = source.url !== '' ? logoApi.getUrlToLogo(source.url) : '';
        return source;
    }

    /**
     * @param {import('axios').AxiosResponse<SourcesResponse>} response
     * @returns {Source[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.data.status !== 'ok') {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }
        const sourcesResponse = response.data;
        return sourcesResponse.sources.map((source) => {
            return this.toEntityFromResource(source);
        });
    }
}