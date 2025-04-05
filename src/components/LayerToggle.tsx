
import React from 'react';
import { Layers, Image, CloudRain, Earth } from 'lucide-react';
import { MapLayer } from '../data/heritageSites';

interface LayerToggleProps {
  layers: MapLayer[];
  activeLayer: string;
  onLayerChange: (layerId: string) => void;
}

const LayerToggle: React.FC<LayerToggleProps> = ({ 
  layers, 
  activeLayer, 
  onLayerChange 
}) => {
  const getLayerIcon = (layerId: string) => {
    switch (layerId) {
      case 'satellite':
        return <Image className="h-5 w-5" />;
      case 'rainfall':
        return <CloudRain className="h-5 w-5" />;
      case 'geomorphology':
        return <Earth className="h-5 w-5" />;
      default:
        return <Layers className="h-5 w-5" />;
    }
  };

  return (
    <div className="layer-toggle absolute z-10 bg-parchment/90 p-0.5 rounded-lg shadow-md backdrop-blur-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="h-5 w-5 text-bronze" />
          <h3 className="text-sm font-semibold text-stone">Map Layers</h3>
        </div>
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => onLayerChange(layer.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              activeLayer === layer.id
                ? 'bg-terracotta/20 text-terracotta font-medium'
                : 'hover:bg-bronze/10 text-stone'
            }`}
            title={layer.description}
          >
            {getLayerIcon(layer.id)}
            <span className="text-sm">{layer.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayerToggle;
