import Weeklys from '../features/weeklys/Weeklys';
import DisplayTodos from '../features/display/DisplayTodos';
import Footer from '../components/Footer'
import DisplayHistory from '../features/display/DisplayHistory';
import DisplaySubTodos from '../features/display/DisplaySubTodos';

const HomePage = () => {
    return (
        <>
            <Weeklys />
            <DisplayTodos />
            <DisplaySubTodos />
            <DisplayHistory />
            <Footer />
        </>
    );
};

export default HomePage;
