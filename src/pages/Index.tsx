import { useState } from "react";
import { Header } from "@/components/Header";
import { AircraftInfoCard } from "@/components/AircraftInfoCard";
import { MaintenanceLog } from "@/components/MaintenanceLog";
import { WarningCard } from "@/components/WarningCard";
import { MaintenanceDetailPanel } from "@/components/MaintenanceDetailPanel";

const Index = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string>("0");

  return (
    <div className="min-h-screen bg-background bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/images/background.jpeg)' }}>
      <div className="min-h-screen bg-background/50">
        <Header />

      <main className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AircraftInfoCard />
            <MaintenanceLog 
              selectedId={selectedEntryId}
              onSelectEntry={setSelectedEntryId}
            />
          </div>
          <div>
            <MaintenanceDetailPanel entryId={selectedEntryId} />
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Index;
