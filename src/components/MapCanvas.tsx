import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HeritageSite, MapLayer } from '../data/heritageSites';
import { Excavation, excavations } from '../data/excavations';
import LayerToggle from './LayerToggle';
import SiteCard from './SiteCard';
import ExcavationModal from './ExcavationModal';
import AddExcavationForm from './AddExcavationForm';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface MapCanvasProps {
  sites: HeritageSite[];
  layers: MapLayer[];
}

const MapCanvas: React.FC<MapCanvasProps> = ({ sites, layers }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const excavationMarkersRef = useRef<L.Marker[]>([]);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const excavationLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayersRef = useRef<Record<string, L.TileLayer>>({});
  
  const [activeLayer, setActiveLayer] = useState('default');
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [selectedExcavation, setSelectedExcavation] = useState<Excavation | null>(null);
  const [showExcavations, setShowExcavations] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isAddingExcavation, setIsAddingExcavation] = useState(false);
  const [newExcavationLocation, setNewExcavationLocation] = useState<[number, number] | null>(null);
  const { toast } = useToast();

  // Load saved excavations from localStorage
  const [savedExcavations, setSavedExcavations] = useState<Excavation[]>(() => {
    const saved = localStorage.getItem('excavations');
    return saved ? JSON.parse(saved) : [];
  });

  // Save excavations to localStorage when they change
  useEffect(() => {
    localStorage.setItem('excavations', JSON.stringify(savedExcavations));
  }, [savedExcavations]);

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      // Create map instance
      map.current = L.map(mapContainer.current, {
        center: [20.5937, 78.9629], // Center of India
        zoom: 5,
        minZoom: 3,
        maxZoom: 30,
        attributionControl: true,
        zoomControl: true
      });

      // Create the layer groups for markers
      layerGroupRef.current = L.layerGroup().addTo(map.current);
      excavationLayerGroupRef.current = L.layerGroup().addTo(map.current);

      // Setup tile layers
      tileLayersRef.current = {
        default: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19
        }),
        rainfall: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          maxZoom: 17
        }),
        geomorphology: L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
          maxZoom: 19
        })
      };

      // Add default layer
      tileLayersRef.current.default.addTo(map.current);
      
      // Set up markers
      addMarkers();
      
      // Set map as loaded
      setIsMapLoaded(true);
      
      // Show a success toast
      toast({
        title: "Map Loaded Successfully",
        description: "Explore Now !!!",
      });

      // Add click handler for adding new excavations
      map.current.on('click', (e) => {
        if (isAddingExcavation) {
          const { lat, lng } = e.latlng;
          setNewExcavationLocation([lng, lat]);
        }
      });

      // Cleanup function
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "There was an error loading the map. Please try again.",
        variant: "destructive"
      });
    }
  }, [isAddingExcavation]);

  // Function to add markers for heritage sites
  const addMarkers = () => {
    if (!map.current || !layerGroupRef.current) return;
    
    // Clear existing markers
    layerGroupRef.current.clearLayers();
    markersRef.current = [];

    // Create custom icon
    const siteIcon = L.divIcon({
      className: 'site-marker animate-pulse-slow',
      iconSize: [24, 24]
    });

    // Add markers for each site
    sites.forEach(site => {
      const marker = L.marker([site.location[1], site.location[0]], {
        icon: siteIcon,
        title: site.name
      }).addTo(layerGroupRef.current!);
      
      // Add click event to marker
      marker.on('click', () => {
        setSelectedSite(site);
        // Zoom to marker location
        map.current?.setView([site.location[1], site.location[0]], 12, {
          animate: true,
          duration: 1
        });
      });
      
      // Store marker reference
      markersRef.current.push(marker);
    });
  };

  // Function to add excavation markers
  const addExcavationMarkers = () => {
    if (!map.current || !excavationLayerGroupRef.current) return;
    
    // Clear existing excavation markers
    excavationLayerGroupRef.current.clearLayers();
    excavationMarkersRef.current = [];

    // Create custom icon for excavations
    const excavationIcon = L.divIcon({
      className: 'excavation-marker animate-pulse',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
      html: '<div class="excavation-marker-inner"></div>'
    });

    // Add markers for each excavation
    [...excavations, ...savedExcavations].forEach(excavation => {
      const marker = L.marker([excavation.location[1], excavation.location[0]], {
        icon: excavationIcon,
        title: excavation.name,
        riseOnHover: true,
        draggable: false
      }).addTo(excavationLayerGroupRef.current!);
      
      // Add click event to marker
      marker.on('click', () => {
        setSelectedExcavation(excavation);
        // Zoom to marker location
        map.current?.setView([excavation.location[1], excavation.location[0]], 12, {
          animate: true,
          duration: 1
        });
      });
      
      // Add hover effect
      marker.on('mouseover', () => {
        marker.setZIndexOffset(1000);
      });
      
      marker.on('mouseout', () => {
        marker.setZIndexOffset(0);
      });
      
      // Store marker reference
      excavationMarkersRef.current.push(marker);
    });
  };

  // Toggle excavation markers
  const toggleExcavations = () => {
    setShowExcavations(!showExcavations);
    if (!showExcavations) {
      // Hide heritage site markers
      if (layerGroupRef.current) {
        layerGroupRef.current.clearLayers();
      }
      addExcavationMarkers();
      toast({
        title: "Excavation Sites Added",
        description: "Click on the markers to view excavation details.",
      });
    } else {
      // Show heritage site markers again
      if (excavationLayerGroupRef.current) {
        excavationLayerGroupRef.current.clearLayers();
      }
      addMarkers();
      setSelectedExcavation(null);
      toast({
        title: "Heritage Sites Restored",
        description: "Excavation sites have been hidden.",
      });
    }
  };

  // Handle adding new excavation
  const handleAddExcavation = () => {
    setIsAddingExcavation(true);
    setNewExcavationLocation(null);
    toast({
      title: "Add Excavation",
      description: "Click on the map to select the excavation location.",
    });
  };

  // Handle saving new excavation
  const handleSaveExcavation = (excavation: Omit<Excavation, 'id'>) => {
    const newExcavation: Excavation = {
      ...excavation,
      id: Date.now().toString()
    };
    
    setSavedExcavations([...savedExcavations, newExcavation]);
    setIsAddingExcavation(false);
    setNewExcavationLocation(null);
    
    // Update markers if excavations are currently shown
    if (showExcavations) {
      addExcavationMarkers();
    }
    
    toast({
      title: "Excavation Added",
      description: "Your new excavation has been saved.",
    });
  };

  // Handle canceling new excavation
  const handleCancelExcavation = () => {
    setIsAddingExcavation(false);
    setNewExcavationLocation(null);
  };

  // Effect to update the map style when the active layer changes
  useEffect(() => {
    if (map.current && isMapLoaded) {
      // Remove all existing tile layers
      Object.values(tileLayersRef.current).forEach(layer => {
        if (map.current!.hasLayer(layer)) {
          map.current!.removeLayer(layer);
        }
      });

      // Add the selected layer
      const layerId = activeLayer === 'default' ? 'default' : activeLayer;
      if (tileLayersRef.current[layerId]) {
        tileLayersRef.current[layerId].addTo(map.current);
        
        // Show toast for layer change
        const selectedLayer = layers.find(l => l.id === activeLayer);
        if (selectedLayer) {
          toast({
            title: `${selectedLayer.name} Layer Activated`,
            description: selectedLayer.description,
          });
        }
      }
    }
  }, [activeLayer, isMapLoaded]);

  // Handle layer change
  const handleLayerChange = (layerId: string) => {
    setActiveLayer(layerId);
  };

  // Handle closing site card
  const handleCloseCard = () => {
    setSelectedSite(null);
  };

  // Handle closing excavation modal
  const handleCloseExcavationModal = () => {
    setSelectedExcavation(null);
  };

  return (
    <div className="w-full">
      <div className="map-container relative h-[100vh]">
        <div ref={mapContainer} className="w-full h-[100vh] rounded-lg" />
        
        {isMapLoaded && (
          <div className="map-controls">
            <LayerToggle
              layers={layers}
              activeLayer={activeLayer}
              onLayerChange={handleLayerChange}
            />
            <Button
              onClick={toggleExcavations}
              variant="outline"
              className="bg-parchment hover:bg-parchment/90 text-stone shadow-md"
            >
              {showExcavations ? 'Hide Excavations' : 'Check Excavations'}
            </Button>
            {showExcavations && (
              <Button
                onClick={handleAddExcavation}
                variant="outline"
                className="bg-parchment hover:bg-parchment/90 text-stone shadow-md"
              >
                Update Your Excavation
              </Button>
            )}
          </div>
        )}
        
        {selectedSite && (
          <SiteCard site={selectedSite} onClose={handleCloseCard} />
        )}
        
        {selectedExcavation && (
          <ExcavationModal
            excavation={selectedExcavation}
            onClose={handleCloseExcavationModal}
          />
        )}
        
        {isAddingExcavation && newExcavationLocation && (
          <AddExcavationForm
            location={newExcavationLocation}
            onClose={handleCancelExcavation}
            onSave={handleSaveExcavation}
          />
        )}
      </div>
    </div>
  );
};

export default MapCanvas;
