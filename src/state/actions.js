export const setPageNumber = (pageNumber) => {
    return {
        type: 'SET_PAGE_NUMBER',
        payload: pageNumber,
    }
}

export const setPage = (page) => {
    return {
        type: 'SET_PAGE',
        payload: page,
    }
}
