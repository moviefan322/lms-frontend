import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);
  return (
    <div>
      <h1>Home Page</h1>
      {isLoggedIn && <h2>Welcome, User</h2>}
    </div>
  );
}
