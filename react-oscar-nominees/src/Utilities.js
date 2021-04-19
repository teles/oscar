import slugify from "slugify";

const titleToId = title => slugify(title.normalize('NFD'), {lower: true}).replace(/[()'"?!`~]/g, '');

const dataToSections = (data, predicate, adapter = x => x) => data.reduce((total, item) => {
    const current = total.find(x => x.name === predicate(item)) || {};
    current.name
        ? current.items.push(adapter(item))
        : total.push({
            name: predicate(item),
            items: [adapter(item)]
        });
    return total;
}, []);

export {dataToSections};
export {titleToId};
