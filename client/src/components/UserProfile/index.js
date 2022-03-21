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
    //const [firstName, setFirstName]= useState("");
    //const [lastName, setLastName]= useState("");
    //const [description, setDescription]= useState("");
    //const [userIcon, setUserIcon]= useState("");
    
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



    // useEffect(() => {
    //     UserIndex();
    //     }
        
    // }, [user])


    // const handleSubmit = async () => {
    //     let newUserInfo = { firstName, lastName, description, userIcon };
    //     let res = await userProfileService.update(newUserInfo).then(() => {
    //         setFirstName("");
    //         setLastName("");
    //         setDescription("");
    //         setUserIcon("");
    //         console.log("userprofile newuserinfo: ", newUserInfo)
    //     });
    //     if (!res === 201) {
    //         alert(`Error updating user information, ${res.status}`);
    //     }
    // };

    // const handleProfileDelete = async () => {
    //     console.log('in handleProfileDelete');
    //     let res = await userProfileService.destroy()
    //         .then(() => {
    //             // window.location.href = "/";
    //         });
    //      if ( !res === 201 ) {
    //          alert("Profile Not Deleted") 
    //      } 
    // }        
    
    const getExistingProfile = async () => {
        let res = await userProfileService.show()
            .then((data) => {
            // console.log("get existing profile: ", data.data.data)
           // setFirstName(data.data.data.firstName);
           // setLastName(data.data.data.lastName);
           // setDescription(data.data.data.description);
            //setUserIcon(data.data.data.setUserIcon);
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
        // checkEventTime();
    }, []);

    const findCommunity = async () => {
        await communityService.getCommunities()
            .then((res) => {
           setCommunity(res.data.data)
        //    console.log("res.data.data line 116: ",res.data.data[0].Events[res.data.data[0].Events.length-1])
           
        //    let eventTimee=new Date(latestEvent.updatedAt).getTime()
        //    console.log("latest",eventTimee);
        //    let eventTime = latestEvent.updatedAt.getTime();
            //setEventTime(latestEvent.updatedAt.getTime());
            // console.log(eventTime)
        });
    }
        useEffect(() => {
            findCommunity();
        }, []);

        const findRecentEvent = () => {
            setLatestEvent(community[0].Events[community[0].Events.length-1])
            let eventTime = (new Date(latestEvent.updatedAt).getTime());
            console.log("latest event", latestEvent);
            console.log(eventTime)
            let currentTime = new Date().getTime();
            console.log(currentTime)
            const checkEventTime = () => {
                if (currentTime < (eventTime+200000000)) 
                setIsEventRecent(true)
                else setIsEventRecent(false)
            }
            checkEventTime();
            console.log(isEventRecent);
        }
        // console.log(currentTime)
        

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