import { all, call } from 'redix-saga/effects';

import { categoriesSaga } from './categories/categories.saga';


export function* rootSaga() {
    yield all([call(categoriesSaga)]);
}

