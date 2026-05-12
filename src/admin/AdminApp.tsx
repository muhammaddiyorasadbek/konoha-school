import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import DirectorPanel from "./DirectorPanel";
import TeacherPanel from "./TeacherPanel";
import ParentPanel from "./ParentPanel";

interface Props {
  onBackToSite: () => void;
}

function AdminInner({ onBackToSite }: Props) {
  const { user } = useAuth();

  if (!user) return <Login onBack={onBackToSite} />;
  if (user.role === "director") return <DirectorPanel onBackToSite={onBackToSite} />;
  if (user.role === "teacher") return <TeacherPanel onBackToSite={onBackToSite} />;
  if (user.role === "parent") return <ParentPanel onBackToSite={onBackToSite} />;
  return null;
}

export default function AdminApp({ onBackToSite }: Props) {
  return (
    <AuthProvider>
      <AdminInner onBackToSite={onBackToSite} />
    </AuthProvider>
  );
}
