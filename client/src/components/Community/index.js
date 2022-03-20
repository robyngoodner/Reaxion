import CommunityCreate from "./CommunityCreate";
import CommunityJoin from "./CommunityJoin";
import CommunityView from "./CommunityView";

export default function Community () {
    return (
        <>
        <div>

{/*should this be all communities? with who the facilitator is + be able to email them inquiring able joining */}
        
        <div>
            <CommunityView />
            <CommunityJoin />
            <CommunityCreate />
            </div>

            <div>

            </div>

            
            </div> 
        </>
    )
}