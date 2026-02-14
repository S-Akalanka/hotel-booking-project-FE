import HotelsPageContent from "@/components/HotelsPageContent";
import { useEffect } from "react";

export default function HotelsPage() {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  return (
    <div>
      <HotelsPageContent />
    </div>
  );
}