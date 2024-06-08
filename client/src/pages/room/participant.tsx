import { Avatar, StreamVideoParticipant } from "@stream-io/video-react-sdk";

const speakingSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <circle cx="4" cy="12" r="3" fill="currentColor">
      <animate
        id="svgSpinners3DotsBounce0"
        attributeName="cy"
        begin="0;svgSpinners3DotsBounce1.end+0.25s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      />
    </circle>
    <circle cx="12" cy="12" r="3" fill="currentColor">
      <animate
        attributeName="cy"
        begin="svgSpinners3DotsBounce0.begin+0.1s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      />
    </circle>
    <circle cx="20" cy="12" r="3" fill="currentColor">
      <animate
        id="svgSpinners3DotsBounce1"
        attributeName="cy"
        begin="svgSpinners3DotsBounce0.begin+0.2s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      />
    </circle>
  </svg>
);
export const Participant = ({
  participant,
}: {
  participant: StreamVideoParticipant;
}) => {
  // `isSpeaking` information is available on the participant object,
  // and it is automatically detected by our system and updated by our SDK.
  const { isSpeaking } = participant;

  return (
    <div className="participant">
      {isSpeaking && speakingSVG}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          imageSrc={participant.image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div>{participant.name}</div>
    </div>
  );
};
