import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import { Link, Route } from 'react-router-dom';
import * as communityService from "../../api/community.service";
import PostCreate from '../Posts/PostCreate';
import CommunityView from '../Community/CommunityView';
import CommunityJoin from '../Community/CommunityJoin';
import CommunityCreate from '../Community/CommunityCreate';
import Post from '../Posts/Post';
import EventCreate from '../Event/EventCreate'
import RecentEventView from '../Event/RecentEventView';
import EventsIndex from '../Event/EventsIndex';
import UserProfileUpdate from './UserProfileUpdate'
import EventView from "../Event/EventView";
import PostUpdate from '../Posts/PostUpdate';

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

        const userEvents = [];
//Finds recent events, compares to current time--if fewer than 20 minutes have passed since the event was last updated, the event and the option to post to it will show up on the home page
        // const findRecentEvent = () => {
        //     setLatestEvent(community[0].Events[community[0].Events.length-1])
        //     console.log("latest event: ",latestEvent)
        //     setEventTime((new Date(latestEvent.createdAt).getTime()));
        //     setCurrentTime(new Date().getTime());
        //     // console.log("event time: ", eventTime);
        //     // console.log("current time: ", currentTime)
        //     const checkEventTime = () => {
        //         //event limit set to 20 minutes
        //         if (currentTime < (eventTime+1200000)) 
        //         setIsEventRecent(true)
        //         else setIsEventRecent(false)
        //     }
        //     checkEventTime();

        // }

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

            
            

        }

        const setAllEvents = () => {
            // console.log("community events: ", community[0].Events)
            community.map((comms) => {
                // console.log(comms)
                comms.Events.map((comm) => {
                    // console.log("community.events ", comm)
                    setEvents(events => [...events, comm])
                })
                
            })
            // userEvents.push(events);
            // console.log("userEvents: ",userEvents)
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
                setEvents(userEvents);
                setAllEvents();
            }, 100)
            return () => clearInterval(interval)
            }
        }, [counter])
        
//Allows for toggling
    const [communityJoin, setCommunityJoin] = useState('none')
    const [communityCreate, setCommunityCreate] = useState('none')
    const [eventCreate, setEventCreate] = useState('none')
    const [profileUpdate, setProfileUpdate] = useState('none')
    const [eventsView, setEventsView] = useState('flex');
    const [postUpdate, setPostUpdate] = useState('none')

    const toggleCommunityJoin = () => {
        setPostUpdate('none')
        setProfileUpdate('none')
        setCommunityCreate('none')
        setEventCreate('none')
        setEventsView('none')
        if(communityJoin === 'none'){
            setCommunityJoin('flex')
        } else {
            setCommunityJoin('none')
        }
    }

    const toggleCommunityCreate = () => {
        setPostUpdate('none')
        setProfileUpdate('none')
        setCommunityJoin('none')
        setEventCreate('none')
        setEventsView('none')
        if(communityCreate === 'none'){
            setCommunityCreate('flex')
        } else {
            setCommunityCreate('none')
        }
    }
    
    const toggleEventCreate = () => {
        setPostUpdate('none')
        setProfileUpdate('none')
        setCommunityJoin('none')
        setCommunityCreate('none')
        setEventsView('none')
        if(eventCreate === 'none'){
            setEventCreate('flex')
        } else {
            setEventCreate('none')
        }
    }
    
    const toggleProfileUpdate = () => {
        setPostUpdate('none')
        setCommunityJoin('none')
        setCommunityCreate('none')
        setEventCreate('none')
        setEventsView('none')
        if(profileUpdate === 'none'){
            setProfileUpdate('flex')
        } else {
            setProfileUpdate('none')
        }
    }

    const toggleEventsView = () => {
        setPostUpdate('none')
        setCommunityJoin('none')
        setCommunityCreate('none')
        setEventCreate('none')
        setEventsView('none')
        setProfileUpdate('none')
        if(eventsView === 'none'){
            setEventsView('flex')
        } else {
            setEventsView('none')
        }
    }
    const togglePostUpdate = () => {
        setPostUpdate('none')
        setCommunityJoin('none')
        setCommunityCreate('none')
        setEventCreate('none')
        setEventsView('none')
        setProfileUpdate('none')
        if(postUpdate === 'none'){
            setPostUpdate('flex')
        } else {
            setPostUpdate('none')
        }
    }

return (    
    <div className="profile-page">
        <div className="userProfile">
            <div className="userHeight">
                <div className="infoHead">
                    <div className="userHead">
                        <img className="userIcon" src={user.userIcon} alt="not found"/>
                        <div className="infoBlock">
                            <h3>Welcome</h3>
                            <h2>{user.firstName}</h2>
                        </div>
                    </div> 
                    <p>{user.description}</p>
                </div>
                <div className="communitiesView">
                    <h2>Communities</h2>
                    <CommunityView toggle={toggleEventCreate}/>
                    {/* <ul>
                        {community?.map((community)=> {
                            return (
                                <>
                                    <li style={{listStyle:"none"}} key={community.index}></li>
                                    <CommunityView active={eventCreate} toggle={toggleEventCreate}/>
                                </>
                            )
                        })}
                    </ul> */}
                    <div className="stack">
                        <button onClick={toggleCommunityCreate} className="smallButton" type="submit">CREATE Community</button>
                        <button onClick={toggleCommunityJoin} className="smallButton" type="submit">JOIN Community</button>
                        <button onClick={toggleEventCreate} className="smallButton">Create event</button>
                        <button onClick={toggleEventsView} className="smallButton">View events</button>
                        <button onClick={togglePostUpdate} className="smallButton">Update Post</button>
                    </div>
                </div>    
                    <button onClick={toggleProfileUpdate} className="standardButton">Update Profile</button>
            </div>
       </div>
       <div className="eventsAndCommunities">
            <div className="recentPosts">
                <CommunityCreate active={communityCreate}/>
                <CommunityJoin active={communityJoin}/>
                <EventCreate active={eventCreate} />
                <UserProfileUpdate active={profileUpdate} />
                <EventsIndex active={eventsView} />
                <PostUpdate active={postUpdate}/>  

                {/* <EventsIndex /> */}

                    {/*here for easy access can be removed later on */}
                    {/* <Link to="/post/new"><button type="submit">CREATE A POST</button></Link> */}
                    {/*here for easy access can be removed later on */}
                {/* <ul>
                    {posts.map((post)=> {
                        return (
                            <>
                                <li key={post.index}>
                                </li>
                                <li className="postShow"> 
                                    Event:{post.event}
                                    Reaction:{post.content}
                                    User Comment:{post.User_Comment}
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
                </ul> */}
            </div>
            <div className="openEvents">
            <h1>Open Events</h1>
                {events.map((event) => {
                            {/* console.log("event: ",event.createdAt); */}
                            return (
                            compareEventTimes(event.createdAt) ? null
                            : <RecentEventView eventId={event._id}/>
                            )
                        })}
                       
            <h1>Past Events</h1>
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