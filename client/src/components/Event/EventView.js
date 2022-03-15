import React, { useEffect, useState } from 'react';
import * as eventService from "../../api/event.service"

export default function EventView() {

    const [event, setEvent] = useState(null);

    useEffect((event) => {
        eventService.get(event).then((response) => {
            setEvent(response.data);

        })
    }, []);

    if (!event) return null;

    return(
        <>
            <h1>{event.title}</h1>
        </>
    )
}