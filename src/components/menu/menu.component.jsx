import './menu.styles.scss';
import DirectoryItem from '../directory-item/directory-item.component';

const Menu = ({ categories }) => {
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