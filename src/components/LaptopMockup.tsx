interface LaptopMockupProps {
  imageSrc: string;
  alt: string;
}

export const LaptopMockup = ({ imageSrc, alt }: LaptopMockupProps) => {
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: "480px" }}>
      {/* Laptop Screen */}
      <div className="relative bg-[#1a1a1a] rounded-t-xl p-2 pb-0 shadow-xl">
        {/* Camera dot */}
        <div className="flex justify-center mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
        </div>
        {/* Screen bezel inner */}
        <div className="relative bg-[#0a0a0a] rounded-t-sm overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
      {/* Laptop hinge / keyboard base */}
      <div className="relative">
        {/* Hinge */}
        <div className="h-2 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] mx-8" />
        {/* Keyboard base */}
        <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-b-xl h-5 mx-2 relative">
          {/* Trackpad hint */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-[#2a2a2a]/50 rounded-sm" />
        </div>
        {/* Base shadow */}
        <div className="h-2 bg-gradient-to-b from-[#111] to-transparent rounded-b-2xl mx-4 opacity-60" />
      </div>
    </div>
  );
};
