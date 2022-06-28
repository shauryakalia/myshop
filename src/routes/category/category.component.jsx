import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategories } from '../../store/categories/category.selector';



const Category = () => {
    const { category } = useParams();
    const { categories } = useSelector(selectCategories);
    const [products, setProducts] = useState(categories[category]);

    useEffect(() => {
        setProducts(categories[category]);
    }, [category, categories]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products?.map(product => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </>
    )
}

export default Category;