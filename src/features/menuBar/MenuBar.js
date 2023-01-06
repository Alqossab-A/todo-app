import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <div className='menuBar'>
            <div>logo</div>
            <Link to='/login'>login</Link>
            <Link to='/signup'>signUp</Link>
        </div>
    )
}

export default MenuBar;