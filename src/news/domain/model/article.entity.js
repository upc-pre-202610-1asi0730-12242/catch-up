import {Source} from "./source.entity.js";

/**
 * @typedef {Object} ArticleAttributes
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [url]
 * @property {string} [urlToImage]
 * @property {string} [publishedAt]
 * @property {import('./source.entity.js').Source | Object | null} [source]
 */

/**
 * Domain entity that represents a published news article.
 */
export class Article {
    /**
     * @param {ArticleAttributes} attributes
     */
    constructor({ title = '', description = '',
                url = '', urlToImage = '', source = null,
                publishedAt = ''}) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.source = source ? new Source(source) : null;
        this.publishedAt = new Date(publishedAt);
    }

    /**
     * Builds a locale-formatted timestamp for presentation needs.
     *
     * @returns {string}
     */
    getFormattedPublishedAt() {
        return this.publishedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}