import { fork, take, put, call } from 'redux-saga/effects';
import { IMAGES } from '../constants';
import { fetchImageStats } from '../api';
import { loadImageStats, setImageStats, setImageStatsError } from '../actions';

//once the images are loaded, we would fire the request to load the statistics for each image

function* handleStatsRequest(id) {
    //while building production apps, we cannot only cover the golden cases, we need to look for the edge cases too
    //if there's an error while fetching the stats, we are retrying it thrice and then exiting.
    for (let i = 0; i < 3; i++) {
        try {
            yield put(loadImageStats(id));
            const res = yield call(fetchImageStats, id);
            yield put(setImageStats(id, res.downloads.total));
            return true; //if the stats have been received successfully, we would be exiting and not retry again.
        } catch (error) {}
    }

    yield put(setImageStatsError(id));
}

function* watchStatsLoad() {
    while (true) {
        const { images } = yield take(IMAGES.LOAD_SUCCESS);

        for (let i = 0; i < images.length; i++) {
            yield fork(handleStatsRequest, images[i].id); //call is a blocking effect which means two function calls cannot be processed pararally whereas fork is a non-blocking effect
        }
    }
}
export default watchStatsLoad;
