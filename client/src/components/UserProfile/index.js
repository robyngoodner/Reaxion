import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import { Link } from 'react-router-dom';
import * as communityService from "../../api/community.service";
//import PostCreate from '../Posts/PostCreate';
//import CommunityView from '../Community/CommunityView';
//import Post from '../Posts/Post';
import RecentEventView from '../Event/RecentEventView';



const UserIndex = () => {
    const [posts, setPosts] = useState([]);
    const [community, setCommunity] = useState([]);
    const [user, setUser] = useState([]);
    const [latestEvent, setLatestEvent] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [isEventRecent, setIsEventRecent] = useState(false);
    const [counter, setCounter] = useState(0);
    const [currentTime, setCurrentTime] = useState("")

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
            console.log("community data ! " + res.data.data)
           setCommunity(res.data.data)
        });
    }
        useEffect(() => {
            findCommunity();
        }, []);

//Finds recent events, compares to current time--if fewer than 20 minutes have passed since the event was last updated, the event and the option to post to it will show up on the home page
        const findRecentEvent = () => {
           
            setLatestEvent(community[0].Events[community[0].Events.length-1])
            console.log("latest event: ",latestEvent)
           
            // console.log("user! " + user._id)

            setEventTime((new Date(latestEvent.createdAt).getTime()));
            setCurrentTime(new Date().getTime());
            // console.log("event time: ", eventTime);
            // console.log("current time: ", currentTime)
            const checkEventTime = () => {
                //event limit set to 20 minutes
                if (currentTime < (eventTime+1200000)) 
                setIsEventRecent(false)
                else setIsEventRecent(true)
            }
            checkEventTime();

        }

        
//reloads events 10 times, due to delayed response from db
        useEffect(() => {
            if(counter<10){
            const interval = setInterval(() => {
                setCounter(counter + 1);
                findRecentEvent("");
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

                    {community?.map((singleCommunity, index) => {

                            if(singleCommunity.Members.includes(user._id)){  

                          return (
                     <div>

                   <li style={{listStyle:"none"}} key={index}>
                   <Link to={`/community/${singleCommunity._id}`}>
                   <h3>{singleCommunity.communityName}</h3>
                   </Link>
                   <h1>{posts._id}</h1>
                   </li>

                   </div>  
                              )
               }  else {
                   return (
                   <div>
                
                   <li style={{listStyle:"none"}} key={index}><Link to={`/community/${singleCommunity._id}`}><h3>{singleCommunity.communityName}</h3></Link></li> hi
           
                   </div>  
                   )
               }
                  })
                    
                    })
               
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
                
            </div>
            <div className="openEvents">
                <h2>Open Events</h2>
                {latestEvent? (isEventRecent ? <RecentEventView eventId={latestEvent._id}/> : <p>You have no recent events</p>): <p>You have no recent events</p>}
            </div>
        </div>
    </div>
);  
}



export default UserIndex;