import { Menu, Plane, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-lg border-b border-border/30 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/fleet" className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AeroSense</h1>
          </Link>
        </div>
        <Link to="/fleet">
          <Button variant="outline" className="gap-2">
            <Grid3x3 className="h-4 w-4" />
            View Fleet
          </Button>
        </Link>
      </div>
    </header>
  );
};
