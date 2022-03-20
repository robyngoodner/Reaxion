import CommunityCreate from "./CommunityCreate";
import CommunityJoin from "./CommunityJoin";
import CommunityView from "./CommunityView";

export default function Community () {
    return (
        <>
        <div>
            <h1>My Communities</h1>
            <CommunityView />
            <CommunityJoin />
            <CommunityCreate />
            </div>
            <div>
            </div>
        </>
    )
}