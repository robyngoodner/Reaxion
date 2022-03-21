import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import { Link, Route } from 'react-router-dom';
import * as communityService from "../../api/community.service";
import PostCreate from '../Posts/PostCreate';
import CommunityView from '../Community/CommunityView';
import Post from '../Posts/Post';
import RecentEventView from '../Event/RecentEventView';



const UserIndex = () => {
    const [posts, setPosts] = useState([]);
    const [community, setCommunity] = useState([]);
    const [user, setUser] = useState([]);
    const [latestEvent, setLatestEvent] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [isEventRecent, setIsEventRecent] = useState(false);
    const [counter, setCounter] = useState(0);

    const findUser = async () => {
        await userProfileService.show().then((res) => {
            setUser(res.data.data);
        });
    }
    useEffect(() => {
        findUser();
    }, []);
 
    
    const getExistingProfile = async () => {
        let res = await userProfileService.show()
            .then((data) => {
        });
        if ( !res === 201 ) {
            alert("Profile Not Deleted") 
        } 
    }

    const handleSubmitDelete = async () => {
        let res = await postService.destroy()
            .then(() => {
                findPosts();
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         } 
    }        

    const handleSubmitEdit = (id) => {
        console.log(`/post/${id}`)
        // console.log(`/post/${post.id}`)
    
    //  if ( !res === 201 ) {
    //      alert(`Post error. Please submit again. ${res.status}`) 
    //  } 
}  
  
    const findPosts = async () => {
        await postService.getAll().then((res) => {
            setPosts(res.data.data);
        });
    }
    
    useEffect(() => {
        findPosts();
        getExistingProfile();
    }, []);

    const findCommunity = async () => {
        await communityService.getCommunities()
            .then((res) => {
           setCommunity(res.data.data)
        });
    }
        useEffect(() => {
            findCommunity();
        }, []);
//Finds recent events, compares to current time--if fewer than 20 minutes have passed since the event was last updated, the event and the option to post to it will show up on the home page
        const findRecentEvent = () => {
            setLatestEvent(community[0].Events[community[0].Events.length-1])
            console.log("event time:",latestEvent)
            let eventTime = (new Date(latestEvent.updatedAt).getTime());
            let currentTime = new Date().getTime();
            console.log("event time: ", eventTime);
            console.log("current time: ", currentTime)
            const checkEventTime = () => {
                //event limit set to 20 minutes
                if (currentTime < (eventTime+1200000)) 
                setIsEventRecent(true)
                else setIsEventRecent(false)
            }
            checkEventTime();

        }

        
//reloads events 10 times, due to delayed response from db
        useEffect(() => {
            if(counter<10){
            const interval = setInterval(() => {
                setCounter(counter + 1);
                findRecentEvent();
            }, 100)
            return () => clearInterval(interval)
            }
        }, [counter])
        
    
return (
    <div>
    <h1>Welcome, {user.firstName}</h1> 
    <Link to="/user/edit"><button type="submit">CHANGE PROFILE</button></Link>
       
{/*Add User Icon Here*/}
    <h2>Open Events</h2>
    {isEventRecent ? <RecentEventView eventId={latestEvent._id}/> : <p>You have no recent events</p>}
    <h2>My Communities</h2>
    <Link to="/community/new"><button type="submit">CREATE A COMMUNITY</button></Link>
    <Link to="/community/join"><button type="submit">JOIN A COMMUNITY</button></Link>
    <ul>
        {community?.map((community)=> {
            return (
                <>
                    <li style={{listStyle:"none"}} key={community.index}></li>
                    <CommunityView />
                </>
                
            )
        })}
    </ul> 



    <h2>My Recent Posts</h2>

    {/*here for easy access can be removed later on */}
    <Link to="/post/new"><button type="submit">CREATE A POST</button></Link>


    {/*here for easy access can be removed later on */}
    
    
    <ul>
        {posts.map((post)=> {
            return (
                <>
                    <li style={{listStyle:"none"}} key={post.index}></li>
                    <li> 
                        {/* Event:{post.event}
                        Reaction:{post.content}
                        User Comment:{post.User_Comment} */}
                        <Post post={post}/>
                    </li>
                    <div>
                        <Link to={`../../post/${post._id}`} state={{ postId: post._id }} >
                            <button>Edit</button>
                        </Link>
                        <button onClick={handleSubmitDelete}>Delete</button>
                    </div>
                </>
            )
        })}
    </ul> 
</div>
);  
        }



export default UserIndex;