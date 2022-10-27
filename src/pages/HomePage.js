import DisplayFolders from '../features/display/DisplayFolders';
import DisplayTodos from '../features/display/DisplayTodos';
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <>
            <DisplayFolders />
            <DisplayTodos />
            <Footer />
        </>
    );
};

export default HomePage;
