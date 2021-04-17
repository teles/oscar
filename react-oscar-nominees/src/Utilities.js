import slugify from "slugify";

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const titleToId = title => slugify(title, {lower: true}).replace(/[()]/g, '');

export {groupBy};
export {titleToId};
