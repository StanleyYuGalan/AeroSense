import { Header } from "@/components/Header";
import { AircraftInfoCard } from "@/components/AircraftInfoCard";
import { MaintenanceLog } from "@/components/MaintenanceLog";
import { WarningCard } from "@/components/WarningCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-tech-pattern relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <Header />

      <main className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AircraftInfoCard />
            <MaintenanceLog />
          </div>
          <div>
            <WarningCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
