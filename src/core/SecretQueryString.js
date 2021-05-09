class SecretQueryString {
    constructor() {
        this.queryString = '';
    }

    update(key, year, property, value) {
        const queryObject = this.getObject(key);
        queryObject[year] = queryObject[year] || {};
        queryObject[year][property] = value;
        this.queryString = `?${key}=${btoa(JSON.stringify(queryObject))}`;
    }

    getObject(key){
        const currentQueryString = this.queryString.match(new RegExp(`[?&]${key}=([^&]+)`)) || null;
        return currentQueryString ? JSON.parse(atob(currentQueryString[1])) : {};
    }
}
export default SecretQueryString;
