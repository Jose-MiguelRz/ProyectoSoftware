import { ProtectedRoute } from "./protected-route";
import { Root } from "./root";

export function ProtectedRoot() {
  return (
    <ProtectedRoute>
      <Root />
    </ProtectedRoute>
  );
}

