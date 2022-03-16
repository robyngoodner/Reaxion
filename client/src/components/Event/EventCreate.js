import { useState } from 'react';
// import { func } from 'prop-types';
import * as eventService from '../../api/event.service';

const EventCreate = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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

    return (
        <div>
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