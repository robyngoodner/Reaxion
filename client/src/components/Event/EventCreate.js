import { useState, useEffect } from 'react';
// import { func } from 'prop-types';
import * as eventService from '../../api/event.service';
import * as communityService from '../../api/community.service';

const EventCreate = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [communities, setCommunities] = useState([]);
    const [community, setCommunity] = useState("");

    const handleSubmit = async () => {
        let newEvent = { title, description };
        let res = await eventService.create(newEvent)
            .then(() => {
                setTitle("");
                setDescription("");
                console.log(newEvent);
            });

        if (!res === 201) {
                alert("Your event failed to save. More information: ", res.status)
        }
    };

    const findCommunity = async () => {
        await communityService.getAll().then((res) => {
            setCommunities(res.data.data);
            console.log("found community: ", communities)
        });

    }

    useEffect(() => {
        findCommunity();
    }, []);

    return (
        <div>
          <h2>Community</h2>
          {/* MUST SET SETCOMMUNITY VALUE TO COMMUNITY'S ID, NOT E.TARGET.VALUE */}
            <select onChange={(e) => setCommunity(e.target.value)}>
            {communities.map((community)=> {
                return (
                    <option 
                    value={community._id}
                    name="community">
                    {community.communityName}</option>
                )
            })}
            </select> 
          

            <form>
                <label>Event Title
                <input  
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    name="title"
                    placeholder="Date or name of event"
                /></label>
                <label>Event Description
                <input  
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    name="description"
                    placeholder="Feel free to add a description"
                /></label>
            </form>
            <button onClick={handleSubmit}>Post Event</button>
        </div>
    )

}

export default EventCreate;