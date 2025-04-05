
import React from 'react';
import { HeritageSite } from '../data/heritageSites';
import { Landmark, Calendar } from 'lucide-react';

interface SiteCardProps {
  site: HeritageSite;
  onClose: () => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ site, onClose }) => {
  return (
    <div className="ancient-scroll animate-fade-in absolute left-4 top-2 z-10 max-w-xs md:max-w-sm">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-stone/70 hover:text-terracotta"
      >
        ✕
      </button>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-terracotta flex items-center gap-2">
          <Landmark className="h-5 w-5" />
          {site.name}
        </h3>
        
        {site.imageUrl && (
          <div className="relative h-32 w-full overflow-hidden rounded-md">
            <img 
              src={site.imageUrl} 
              alt={site.name} 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <p className="text-sm text-stone/90 mt-1">{site.description}</p>
        
        <div className="flex items-center gap-2 text-xs text-stone/70 mt-1">
          <Calendar className="h-4 w-4" />
          <span>Inscribed in {site.yearInscribed}</span>
          <span className="ml-auto px-2 py-0.5 bg-stone/10 rounded-full">
            {site.type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
