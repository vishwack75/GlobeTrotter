import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useGetCitiesQuery } from "../../store/api/apiSlice";

import kedarnathImg from "../../assets/images/kedarnath.webp";
import dwarkaImg from "../../assets/images/dwarka.avif";
import varanasiImg from "../../assets/images/varanasi.avif";
import ujjainImg from "../../assets/images/ujjain.avif";
const FALLBACK_DESTINATIONS = [
  {
    _id: "1",
    name: "Kedarnath",
    country: "India",
    region: "Uttarakhand",
    popularity: 4.98,
    imageUrl: kedarnathImg,
    description: "Sacred shrine located high in the snow-capped Himalayan peaks."
  },
  {
    _id: "2",
    name: "Dwarka",
    country: "India",
    region: "Gujarat",
    popularity: 4.92,
    imageUrl: dwarkaImg,
    description: "Ancient kingdom city of Lord Krishna along the Arabian Sea."
  },
  {
    _id: "3",
    name: "Varanasi",
    country: "India",
    region: "Uttar Pradesh",
    popularity: 4.95,
    imageUrl: varanasiImg,
    description: "The spiritual heart of India along the sacred Ganges river."
  },
  {
    _id: "4",
    name: "Ujjain",
    country: "India",
    region: "Madhya Pradesh",
    popularity: 4.9,
    imageUrl: ujjainImg,
    description: "Holy city of Mahakaleshwar Jyotirlinga and sacred Shipra river."
  }
];

export const Destinations: React.FC = () => {
  const { data: fetchedCities } = useGetCitiesQuery({ limit: 6 });
  const displayCities = (fetchedCities && fetchedCities.length > 0) ? fetchedCities : FALLBACK_DESTINATIONS;

  return (
    <section id="explore" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Where Will You Go Next?
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Explore curated sacred Indian temples and cultural destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCities.map((city: any) => (
            <div
              key={city._id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden group flex flex-col justify-between hover:border-[#02639B] transition-colors shadow-xs"
            >
              <div className="h-56 relative bg-slate-100 overflow-hidden">
                <img
                  src={city.imageUrl || kedarnathImg}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = kedarnathImg;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 rounded-xl text-amber-600 font-extrabold text-xs flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{city.popularity}</span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-black">{city.name}</h3>
                  <p className="text-xs text-slate-200 font-semibold">{city.country} • {city.region}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 font-medium">{city.description}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end text-xs">
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 bg-[#02639B] hover:bg-[#024E7B] text-white font-extrabold text-xs rounded-full transition-colors"
                  >
                    Add to Trip
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
