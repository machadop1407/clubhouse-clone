import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

export const LiveButton = () => {
  // this utility hook returns the call object from the <StreamCall /> context
  const call = useCall();
  // will emit a new value whenever the call goes live or stops being live.
  // we can use it to update the button text or adjust any other UI elements
  const { useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();
  return (
    <button
      style={{
        backgroundColor: "rgb(35, 35, 35)",
        boxShadow: isLive ? "0 0 1px 2px rgba(0, 255, 0, 0.3)" : "none",
      }}
      onClick={async () => {
        if (isLive) {
          await call?.stopLive();
        } else {
          await call?.goLive();
        }
      }}
    >
      {isLive ? "Stop Live" : "Go Live"}
    </button>
  );
};
