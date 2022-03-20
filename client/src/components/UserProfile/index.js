import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import { Link, Route } from 'react-router-dom';
import * as communityService from "../../api/community.service";
import PostCreate from '../Posts/PostCreate';
import CommunityView from '../Community/CommunityView';



const UserIndex = () => {
    //const [firstName, setFirstName]= useState("");
    //const [lastName, setLastName]= useState("");
    //const [description, setDescription]= useState("");
    //const [userIcon, setUserIcon]= useState("");
    const [posts, setPosts] = useState([]);
    const [community, setCommunity] = useState([]);
    const [user, setUser] = useState([]);

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
            console.log(res.data.data)
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
    


return (
    <div>
    <h1 >Welcome, {user.firstName}</h1>
    <img src={user.userIcon} alt="not found" style={{width: "48px" , height: "48px" , borderRadius: "10%"}}></img>
    <Link to="/user/edit"><button type="submit">CHANGE PROFILE</button></Link>
       
{/*Add User Icon Here*/}
   
        <h2>My Communities</h2>
        <Link to="/community/new"><button type="submit">CREATE A COMMUNITY</button></Link>
        <Link to="/community/join"><button type="submit">JOIN A COMMUNITY</button></Link>
        <ul>
            {community?.map((community)=> {
                return (
                    <>
                        <li style={{listStyle:"none"}} key={community.index}></li>
                    
                    <CommunityView />
                           {/* <h3>{community.communityName} </h3> 
                           <h5>Facilitator:{community.Facilitator} </h5>   */}
        
                        
                        {/* <div>
                            <Link to={`../../community/${community._id}`} state={{ communityId: community._id }} >
                                <button>Edit</button>
                            </Link>
                            <button onClick={handleSubmitDelete}>Delete</button>
                        </div> */}
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
                            Event:{post.event}
                            Reaction:{post.content}
                            User Comment:{post.User_Comment}
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