//app/page.tsx
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      {/* <UserButton afterSignOutUrl="/"/>btn */}
      <h1 className="head-text text-left">Home</h1>
    </div>
  )
}