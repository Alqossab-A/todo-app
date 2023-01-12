import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <div className='menuBar'>
            <Link to='/'>logo</Link>
            <Link to='/login'>login</Link>
            <Link to='/signup'>signUp</Link>
        </div>
    )
}

export default MenuBar;