import styles from './Footer.module.css';

const LocationMap = () => {
  const address = "Unit 3, 95-97 Western Ave, Westmeadows VIC 3049, Australia";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.175736637954!2d144.88392!3d-37.676110000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad659a9ab99328f%3A0x95f4775e39b9aa87!2s95-97%20Western%20Ave%2C%20Westmeadows%20VIC%203049!5e0!3m2!1sen!2sau!4v1637000000000!5m2!1sen!2sau&style=feature:all|element:labels.text.fill|color:0x808080&style=feature:all|element:labels.text.stroke|color:0x242f3e&style=feature:administrative|element:geometry|color:0x242f3e&style=feature:administrative.land_parcel|element:labels|visibility:off&style=feature:administrative.locality|element:labels.text.fill|color:0x808080&style=feature:poi|element:labels.text|visibility:off&style=feature:poi|element:labels.text.fill|color:0x808080&style=feature:road|element:geometry|color:0x242f3e&style=feature:road|element:labels.text.fill|color:0x808080&style=feature:road.arterial|element:geometry|color:0x242f3e&style=feature:road.highway|element:geometry|color:0x242f3e&style=feature:road.highway|element:labels.text.fill|color:0x808080&style=feature:road.local|element:geometry|color:0x242f3e&style=feature:transit|element:geometry|color:0x242f3e&style=feature:water|element:geometry|color:0x242f3e&style=feature:water|element:labels.text.fill|color:0x808080`;

  return (
    <div className={`${styles.mapContainer} bg-gray-800 rounded-lg overflow-hidden relative group`}>
      <iframe
        src={embedUrl}
        className="w-full h-full border-0 grayscale contrast-75"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Faith Auto location map"
      />
      <a 
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-lg transition-all flex items-center gap-2"
      >
        <i className="fas fa-location-arrow"></i>
        Get Directions
      </a>
    </div>
  );
};

export default LocationMap; 