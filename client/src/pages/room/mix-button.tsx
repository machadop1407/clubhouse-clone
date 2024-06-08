import { useCallStateHooks } from "@stream-io/video-react-sdk";

export const MicButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  return (
    <button
      style={{ backgroundColor: "rgb(125, 7, 236)" }}
      onClick={async () => {
        if (isMute) {
          await microphone?.enable();
        } else {
          await microphone?.disable();
        }
      }}
    >
      {isMute ? "Unmute" : "Mute"}
    </button>
  );
};
