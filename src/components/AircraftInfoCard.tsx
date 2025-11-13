import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import aircraftImage from "@/assets/aircraft.jpg";

export const AircraftInfoCard = () => {
  return (
    <Card className="p-6 bg-card/60 backdrop-blur-sm border-border shadow-lg">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Aircraft Name:</p>
            <p className="text-xl font-bold text-foreground">A6-XWJ</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Model:</p>
            <p className="text-xl font-bold text-foreground">Airbus A350-900</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Operator:</p>
            <p className="text-xl font-bold text-foreground">Emirates</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Airworthiness:</p>
            <Badge className="bg-primary text-primary-foreground">Compliant</Badge>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img 
            src={aircraftImage} 
            alt="Emirates A350-900 Aircraft" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </Card>
  );
};
