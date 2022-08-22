import { useSelector } from 'react-redux';
import Todos from './Todos';
import { selectCommentsByCampsiteId } from './commentsSlice';
import CommentForm from './CommentForm';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const CommentsList = ({ campsiteId }) => {
    const comments = useSelector(selectCommentsByCampsiteId(campsiteId));

    const isLoading = useSelector((state) => state.comments.isLoading);
    const errMsg = useSelector((state) => state.comments.errMsg);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (errMsg) {
        return (
            <Error errMsg={errMsg} />
        );
    }

    if ( comments && comments.length > 0) {
        return (
            <Col md='5' className='m-1'>
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />
                })}
                <CommentForm campsiteId={campsiteId} />
            </Col>
        );
    };
    return (
        <Col md='5' className='m-1'>
            There are no commetns for this campsite yet.
        </Col>
    );
};

export default CommentsList;