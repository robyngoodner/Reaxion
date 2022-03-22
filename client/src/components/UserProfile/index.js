import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import { Link, Route } from 'react-router-dom';
import * as communityService from "../../api/community.service";
import * as eventService from '../../api/event.service';
import PostCreate from '../Posts/PostCreate';
import CommunityView from '../Community/CommunityView';
import Post from '../Posts/Post';
import RecentEventView from '../Event/RecentEventView';
import CommunityCreate from '../Community/CommunityCreate';
import EventView from '../Event/EventView';


const UserIndex = () => {
    const [posts, setPosts] = useState([]);
    const [community, setCommunity] = useState([]);
    const [user, setUser] = useState([]);
    const [latestEvent, setLatestEvent] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [isEventRecent, setIsEventRecent] = useState(false);
    const [counter, setCounter] = useState(0);
    const [currentTime, setCurrentTime] = useState("");
    const [events, setEvents] = useState([]);

    //find single user
    const findUser = async () => {
        await userProfileService.show().then((res) => {
            setUser(res.data.data);
        });
    }
    useEffect(() => {
        findUser();
    }, []);
 
    //get existing profile info
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
        // console.log(`/post/${id}`)
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
        //    console.log(res.data.data)
        });
    }
    useEffect(() => {
        findCommunity();
    }, []);
    const userEvents = [];
//Finds recent events, compares to current time--if fewer than 20 minutes have passed since the event was last updated, the event and the option to post to it will show up on the home page
        const findRecentEvent = () => {
            setLatestEvent(community[0].Events[community[0].Events.length-1])
            setEventTime((new Date(latestEvent.createdAt).getTime()));
            setCurrentTime(new Date().getTime());
            const checkEventTime = () => {
                //event limit set to 20 minutes
                if (currentTime < (eventTime+1200000)) 
                setIsEventRecent(true)
                else setIsEventRecent(false)
            }
            checkEventTime();

            
            // console.log("community events: ", community[0].Events)
            community.map((community) => {
                // console.log("community.events ", community.Events)
                setEvents(community.Events)
            })
            
            // console.log("serEvents array: ", events)

        }
//compared event times to decide if past events can be seen
        const compareEventTimes = (event) => {
            if (currentTime > (new Date(event).getTime() + 1200000)) {
                // console.log("true")
                return true;
            }
        }

        
//reloads events 10 times, due to delayed response from db
        useEffect(() => {
            if(counter<10){
            const interval = setInterval(() => {
                setCounter(counter + 1);
                findRecentEvent();
                // adjustArray();
            }, 100)
            return () => clearInterval(interval)
            }
        }, [counter])
        

    
return (    
    <div className="profile-page">
        <div className="userProfile">
            <div className="userHeight">
                <div className="infoBlock">
                    <h2>Welcome</h2>
                    <h1>{user.firstName}</h1>
                    <img className="userIcon" src={user.userIcon} alt="not found"/>
                </div>
                <div className="communitiesView">
                    <h2>My Communities</h2>
                    <div className="stack">
                        <Link to="/community/new"><button className="standardButton" type="submit">CREATE A COMMUNITY</button></Link>
                        <Link to="/community/join"><button className="standardButton" type="submit">JOIN A COMMUNITY</button></Link>
                    </div>
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
                </div>    
                <Link to="/user/edit"><button className="standardButton" type="submit">CHANGE PROFILE</button></Link>
            </div>
       </div>
       <div className="eventsAndCommunities">
            <div className="recentPosts">
                <h2>My Recent Posts</h2>
                    {/*here for easy access can be removed later on */}
                    <Link to="/post/new"><button type="submit">CREATE A POST</button></Link>
                    {/*here for easy access can be removed later on */}
                <ul>
                    {posts.map((post)=> {
                        return (
                            <>
                                <li key={post.index}>
                                </li>
                                <li className="postShow"> 
                                    {/* Event:{post.event}
                                    Reaction:{post.content}
                                    User Comment:{post.User_Comment} */}
                                    <Post post={post}/>
                                    <div className="postButtons">
                                        <Link to={`../../post/${post._id}`} state={{ postId: post._id }} >
                                            <button className="standardButton">Edit</button>
                                        </Link>
                                        <button className="standardButton" onClick={handleSubmitDelete}>Delete</button>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul> 
            </div>
            <div className="openEvents">
                <h2>Open Events</h2>
                {latestEvent? (isEventRecent ? <RecentEventView eventId={latestEvent._id}/> : <p>You have no recent events</p>): <p>You have no recent events</p>}
                <h2>Past Events</h2>
                {/* {console.log("User events: ", events)} */}
                    {events.map((event) => {
                        {/* console.log("event: ",event.createdAt); */}
                        return (
                        compareEventTimes(event.createdAt) ? <EventView eventId={event._id}/> 
                        : <p>You have no past events</p>
                        )
                    })}
            </div>
        </div>
    </div>
);  
}



export default UserIndex;