const KEY = '?client_id=hNtpPYlEJCfbfEn69OJAT5it5uOzFafMyEpb85XmOn8';
const URL = 'https://api.unsplash.com/photos/';

const fetchImages = async pageNum => {
    const response = await fetch(`${URL}${KEY}&per_page=3&page=${pageNum}`);
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    const data = await response.json();
    return data;
};

const fetchImageStats = async id => {
    const response = await fetch(`${URL}/${id}/statistics${KEY}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export { fetchImages, fetchImageStats };
