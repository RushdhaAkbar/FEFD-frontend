import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser(); // Get user details

  if (!isLoaded) {
    return (
      <main>
        <h1>My Account</h1>
        <div>Loading...</div>
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  
  const isAdmin = user.publicMetadata.role === "admin";

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">My Account</h2>
      <div className="mt-4">
        <p>{user.fullName}</p>
        <p>{user.emailAddresses[0].emailAddress}</p>
      </div>
      <div className="mt-4">
        {isAdmin ? ( 
          <Button asChild>
            <Link to="/admin/products/create">Create Order</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/order">My Orders</Link>
          </Button>
        )}
      </div>
    </main>
  );
}

export default AccountPage;
