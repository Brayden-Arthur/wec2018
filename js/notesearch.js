function noIndexSearch(query, data) {
    console.time('noIndexSearch')
    const tokens = query.toLowerCase().split(' ')
    const results = []
    for (const token of tokens) {
        for (const room in data) {
        const object = data[room]
        let strings = object.tags
        strings.push(room, object.name)
        if (object.contact) {
            strings.push(object.contact)
        }
        strings = strings.map(x => x.toLowerCase())
        for (const string of strings) {
            if (string.includes(token)) {
            results.push(room)
            break
            }
        }
        }
    }
    console.timeEnd('noIndexSearch')
    return results
}

const search = document.getElementById('search')