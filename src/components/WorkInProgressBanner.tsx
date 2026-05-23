import { Construction } from "lucide-react";

const WorkInProgressBanner = () => {
  return (
    <div className="fixed top-0 left-1 right-1 z-[60] h-10 flex items-center justify-center gap-2 bg-[#D10000] text-white text-xs font-medium border-b border-white/10">
      <Construction className="h-3.5 w-3.5" />
      <span>This site is a work in progress — updates coming soon</span>
    </div>
  );
};

export default WorkInProgressBanner;
