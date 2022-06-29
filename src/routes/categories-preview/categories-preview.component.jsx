// import { useContext } from "react";
import { useSelector } from "react-redux";
// import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/cateogry-preview.component";

import { selectCategories } from '../../store/categories/category.selector';


const CategoriesPreview = () => {
    const categories = useSelector(selectCategories);
    return (
        <>
            {categories && Object.keys(categories).map(title => {
                const products = categories[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                )
            })}
        </>
    )
}

export default CategoriesPreview;