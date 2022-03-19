import CommunityCreate from "./CommunityCreate";
import CommunityJoin from "./CommunityJoin";


export default function Community () {
    return (
        <>
            <h1>Create a new community</h1>
            <h3>Set your keyword to something unique, so your community members can use it to join your community</h3>
            <CommunityCreate />
            <h1>Join an existing community using your keyword</h1>
            <CommunityJoin />
        </>
    )
}