import React, { useEffect, useState } from 'react';
import * as eventService from "../../api/event.service"

export default function EventView() {

    const [event, setEvent] = useState([]);
    
    useEffect(() => {
        async function getEvent() {
            const events = await eventService.get();
                setEvent(events.data);
        }
        getEvent();
    }, [])

    return(
        <>
            <h1>{event.title}</h1>
        </>
    )
}