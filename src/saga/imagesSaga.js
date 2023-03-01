import { call, put, select, takeEvery } from 'redux-saga/effects';
import { IMAGES } from '../constants';
import { fetchImages } from '../api';
import { setError, setImages } from '../actions';

const getPageNumber = state => state.page;

function* handleLoadImages() {
    try {
        const page = yield select(getPageNumber);
        const images = yield call(fetchImages, page);
        yield put(setImages(images));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

function* loadImagesWatcher() {
    yield takeEvery(IMAGES.LOAD, handleLoadImages);
}

export default loadImagesWatcher;
