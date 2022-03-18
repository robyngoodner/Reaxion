import { useState, useEffect } from 'react';
// import { func } from 'prop-types';
import * as eventService from '../../api/event.service';
import { Link } from 'react-router-dom';


const EventsIndex = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        async function getEventsIndex() {
            const communities = await eventService.index();
            setCommunities(communities.data.data);
            console.log("community data: ",communities.data.data)
        }
        getEventsIndex();
    }, [])

    return (
        <div>
            {communities.map((community) => {
                return (
                    <Link
                    to={community._id}>{community.communityName}
                    </Link>
                )
            })}
        </div>
    )

}

export default EventsIndex;

