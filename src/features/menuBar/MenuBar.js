import { NavLink } from 'react-router-dom';

const MenuBar = () => {
    return (
        <div className='menuBar'>
            <div>logo</div>
            <NavLink to='/login'>login</NavLink>
            <button>signUp</button>
        </div>
    )
}

export default MenuBar;