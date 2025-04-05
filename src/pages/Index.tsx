
import React from 'react';
import Header from '@/components/Header';
import MapCanvas from '@/components/MapCanvas';
import { heritageSites, mapLayers } from '@/data/heritageSites';
import { Landmark, Info } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-parchment-texture">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-stone flex items-center gap-2">
            <Landmark className="h-6 w-6 text-terracotta" />
            Analyze Geospatial Data Here
          </h2>
          <p className="text-stone/80 mt-1">
            Explore India's cultural and natural treasures and plan your Excavations. 
            Toggle between different map layers to discover the geographical context of these magnificent sites.
          </p>
        </div>
        
        <MapCanvas sites={heritageSites} layers={mapLayers} />
        
        
      </main>
      

    </div>
  );
};

export default Index;
