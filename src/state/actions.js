export const initPages = (pages) => {
    return {
        type: 'INIT_PAGES',
        payload: pages,
    }
}

export const addPage = (page) => {
    return {
        type: 'ADD_PAGE',
        payload: page,
    }
}