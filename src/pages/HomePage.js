import DisplayFolders from '../features/display/DisplayFolders';
import DisplayTodos from '../features/display/DisplayTodos';

const HomePage = () => {
    return (
        <>
            <DisplayFolders />
            <DisplayTodos />
        </>
    );
};

export default HomePage;
