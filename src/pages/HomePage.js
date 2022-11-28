import Weeklys from '../features/weeklys/Weeklys';
import DisplayTodos from '../features/display/DisplayTodos';
import Footer from '../components/Footer'
import DisplayHistory from '../features/display/DisplayHistory';

const HomePage = () => {
    return (
        <>
            <Weeklys />
            <DisplayTodos />
            <DisplayHistory />
            <Footer />
        </>
    );
};

export default HomePage;
