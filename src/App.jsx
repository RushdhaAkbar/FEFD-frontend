import Hero from "./Hero";
import NavigationBar from "./NavigationBar";
import {Button} from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Paging from "./Paging";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



function App() {
  const name ="Rushdha";
  const count = 0;
  return (
    <div>
      <NavigationBar name={name} count={count} />
      <Hero />
         <div className="p-4 w-96">
      <Card className="border-2">
        <CardHeader>
          <Badge className="w-fit">New</Badge>
          <CardTitle>Product Title</CardTitle>
          <CardDescription>Product Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Product Content</p>
         </CardContent>
        <CardFooter>
          <Button >Buy now</Button>
        </CardFooter>
      </Card>

    </div>
      <Paging/>
    </div>
  );
}

export default App;
