import slugify from "slugify";

const titleToId = title => slugify(title.normalize('NFD'), {lower: true}).replace(/[()'"?!`~]/g, '');

const dataToSections = (data, predicate, adapter = x => x) => data.reduce((total, item) => {
    const current = total.find(x => x.id === predicate(item).id) || {};
    current.name
        ? current.items.push(adapter(item))
        : total.push({
            id: predicate(item).id,
            name: predicate(item).name,
            items: [adapter(item)]
        });
    return total;
}, []);

export {dataToSections};
export {titleToId};
