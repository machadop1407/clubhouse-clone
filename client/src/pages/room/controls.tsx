import { LiveButton } from "./live-button";
import { MicButton } from "./mix-button";

export const Controls = () => {
  return (
    <div className="controls-panel">
      <MicButton />
      <LiveButton />
    </div>
  );
};
