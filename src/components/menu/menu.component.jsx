import './menu.styles.scss';
import DirectoryItem from '../directory-item/directory-item.component';


const categories = [
    {
        "id": 1,
        "title": "category 1",
        "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
        "route": "shop/hats"
    },
    {
        "id": 2,
        "title": "category 2",
        "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
        "route": "shop/jackets"
    },
    {
        "id": 3,
        "title": "category 3",
        "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
        "route": "shop/sneakers"
    },
    {
        "id": 4,
        "title": "womens",
        "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
        "route": "shop/womens"
    },
    {
        "id": 5,
        "title": "mens",
        "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
        "route": "shop/mens"
    }
];


const Menu = () => {
    return (
        <div className='menu-container'>
            {
                categories.map((category) => (
                    <DirectoryItem key={category.id} category={category} />
                ))
            }
        </div>
    )
}

export default Menu;