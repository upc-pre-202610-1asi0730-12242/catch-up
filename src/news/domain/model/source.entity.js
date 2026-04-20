export class Source {
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