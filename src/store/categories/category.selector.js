import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesReselect = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategories = createSelector(
    [selectCategoriesReselect],
    (categoriesArray) => categoriesArray.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)