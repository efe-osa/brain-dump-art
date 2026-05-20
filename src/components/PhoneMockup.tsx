interface PhoneMockupProps {
  imageSrc: string;
  alt: string;
}

export const PhoneMockup = ({ imageSrc, alt }: PhoneMockupProps) => {
  return (
    <div className="relative mx-auto" style={{ width: "200px" }}>
      {/* Phone Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[2rem] p-2 shadow-xl">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1a1a1a] rounded-b-xl z-10" />
        {/* Screen */}
        <div
          className="relative bg-[#0a0a0a] rounded-[1.5rem] overflow-hidden"
          style={{ aspectRatio: "9/19.5" }}
        >
          <img src={imageSrc} alt={alt} className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
};
