import { useCall, PermissionRequestEvent } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";

export const PermissionRequestsPanel = () => {
  // this hook will take the call instance from the <StreamCall /> context.
  const call = useCall();
  const [permissionRequests, setPermissionRequests] = useState<
    PermissionRequestEvent[]
  >([]);

  useEffect(() => {
    return call?.on("call.permission_request", (event) => {
      const request = event as PermissionRequestEvent;
      setPermissionRequests((reqs) => [...reqs, request]);
    });
  }, [call]);

  const handlePermissionRequest = useCallback(
    async (request: PermissionRequestEvent, accept: boolean) => {
      const { user, permissions } = request;
      try {
        if (accept) {
          await call?.grantPermissions(user.id, permissions);
        } else {
          await call?.revokePermissions(user.id, permissions);
        }
        setPermissionRequests((reqs) => reqs.filter((req) => req !== request));
      } catch (err) {
        console.error(`Error granting or revoking permissions`, err);
      }
    },
    [call]
  );

  if (!permissionRequests.length) return null;

  return (
    <div className="permission-requests">
      <h4>Permission Requests</h4>
      {permissionRequests.map((request) => (
        <div className="permission-request" key={request.user.id}>
          <span>
            {request.user.name} requested to {request.permissions.join(", ")}
          </span>
          <button
            onClick={() => handlePermissionRequest(request, true)}
            style={{ backgroundColor: "green" }}
          >
            Approve
          </button>
          <button onClick={() => handlePermissionRequest(request, false)}>
            Deny
          </button>
        </div>
      ))}
    </div>
  );
};
