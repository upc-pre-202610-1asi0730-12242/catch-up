/**
 * @typedef {Object} SourceAttributes
 * @property {string} [id]
 * @property {string} [description]
 * @property {string} [url]
 * @property {string} [category]
 * @property {string} [language]
 * @property {string} [country]
 */

/**
 * Domain entity that models a news provider source.
 */
export class Source {
    /**
     * @param {SourceAttributes} attributes
     */
    constructor({ id = '', description = '', url = '',
                    category = '',
                    language = '', country = '' }) {
        this.id = id;
        this.description = description;
        this.url = url;
        this.category = category;
        this.language = language;
        this.country = country;
        this.urlToLogo = '';
    }
}