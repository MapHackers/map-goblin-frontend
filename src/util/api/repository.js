import Api from '../Api'

export const getAllRepositoryAPI = () => {
    return Api.get('/repositories')
}

export const getRepositoryByCategoryNameAPI = (categoryName) => {
    return Api.get(`/${categoryName}/repositories/category`)
}

export const getLikedRepositoryByUserIdAPI = (userId) => {
    return Api.get(`/${userId}/repositories/likes`)
}