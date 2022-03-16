import { string } from 'prop-types';

function showPost() {
    const [post, setPost] = useState([]);
    
    useEffect(() => {
        async function getPost() {
            const post = await postService.get();
                setPost(post.data);
        }
        getPost();
    }, [])

    const handleSubmitDelete = async () => {
        let res = await postService.desroy()
            .then(() => {
                window.location.href = "/post";
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         } 
    }        

    const handleSubmitEdit = async () => {
        window.location.href = `/${post}/${id}`;
    
     if ( !res === 201 ) {
         alert(`Post error. Please submit again. ${res.status}`) 
     } 
}  
    return (
        <>
        <div>
            <h2>User: {props.User}</h2>
            <p>Reaction: {props.content}</p>
            <p>Comment: {props.User_Comment}</p>
            <p>Comments: {props.Comments}</p>
            <p>UpVotes: {props.upVotes}</p>
        </div>
        <div>
            <button onClick={handleSubmit}>Edit</button>
            <button onClick={handleSubmit}>Delete</button>
        </div>
        </>
        
    )
}

export default showPost; 