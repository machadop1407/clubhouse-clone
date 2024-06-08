import {
  Avatar,
  ParticipantsAudio,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Participant } from "./participant";

export const Participants = () => {
  const { useParticipants } = useCallStateHooks();
  // whenever a participant receives an update, this hook will re-render
  // this component with the updated list of participants, ensuring that
  // the UI is always in sync with the call state.
  const participants = useParticipants();
  return (
    <div className="participants-panel">
      {/* <h4>Participants</h4> */}
      <div className="participants">
        <ParticipantsAudio participants={participants} />
        {participants.map((p) => (
          <Participant participant={p} key={p.sessionId} />
        ))}
      </div>
    </div>
  );
};
