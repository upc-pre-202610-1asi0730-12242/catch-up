
import {SourceAssembler} from "./source.assembler.js";
import {Article} from "../domain/model/article.entity.js";

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
 * Infrastructure mapper that translates article resources into domain entities.
 */
export class ArticleAssembler {
    /** @type {import('../domain/model/source.entity.js').Source | null} */
    static source = null;

    /**
     * Configures preferred source reuse to avoid recreating identical source entities.
     *
     * @param {import('../domain/model/source.entity.js').Source} source
     * @returns {typeof ArticleAssembler}
     */
    static withSource(source) {
        this.source = source;
        return this;
    }

    /**
     * @param {ArticleResource} resource
     * @returns {Article}
     */
    static toEntityFromResource(resource) {
        let article = new Article(resource);
        article.source = this.source && this.source.id === resource.source.id ? this.source : SourceAssembler.toEntityFromResource(resource.source);
        return article;
    }

    /**
     * Maps an HTTP response payload into article entities.
     *
     * @param {import('axios').AxiosResponse<ArticlesResponse>} response
     * @returns {Article[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error(`${response.status},  ${response.code}, ${response.message}`);
            return [];
        }
        const articlesResponse = response.data;
        return articlesResponse["articles"].map((article) => {
            return this.toEntityFromResource(article);
        });
    }

}