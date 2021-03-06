import { useState, useEffect } from 'react';
// import { func } from 'prop-types';
import * as eventService from '../../api/event.service';
import * as communityService from '../../api/community.service';
import {Link} from "react-router-dom"

const EventCreate = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [communities, setCommunities] = useState([]);
    const [community, setCommunity] = useState("");

    const handleSubmit = async () => {
        let newEvent = { community, title, description };
        let res = await eventService.create(newEvent)
            .then(() => {
                setTitle("");
                setDescription("");
                setCommunity("");
                console.log("event-->eventcreate: ",newEvent);
            });

        if (!res === 201) {
                alert("Your event failed to save. More information: ", res.status)
        }
        window.location.href="/user";
    };

    const contentStyle = {
        display: (props.active)
    }

    const findCommunity = async () => {
        await communityService.getAll().then((res) => {
            setCommunities(res.data.data);
            console.log("found community: ", communities)
            setCommunity(res.data.data[0]._id)
        });

    }

    useEffect(() => {
        findCommunity();
    }, []);

    return (
        <div>
            <div className="libraryComponent" style={contentStyle}>
                <h2>Community</h2>
                    <select className="formInput" onChange={(e) => setCommunity(e.target.value)}>
                    {communities.map((community)=> {
                        return (
                            <option 
                            value={community._id} key={community.keyword}
                            name="community">{community.communityName}</option>
                        )
                    })}
                    </select> 
                <form className="formSpacing">
                    <label className="formInput">Event Title</label>
                    <input  
                        className = "input"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        name="title"
                        placeholder="Date or name of event"
                    />
                    <label className="formInput">Event Description</label>
                    <input  
                        className = "input"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        type="text"
                        name="description"
                        placeholder="Feel free to add a description"
                    />
                </form>
                <Link to="/user/"> <button className="standardButton" onClick={handleSubmit}>Post Event</button></Link>
            </div>
        </div>
    )

}

export default EventCreate;