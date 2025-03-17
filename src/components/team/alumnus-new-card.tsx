import { GraduationCap, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Alumnus } from "@/types/team";

interface AlumnusCardProps {
  alumnus: Alumnus;
}

export default function AlumnusCard({ alumnus }: AlumnusCardProps) {
  return (
    <Card className="glass-card h-full flex flex-col card-hover">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0 bg-blue-500/10">
            <GraduationCap className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1">{alumnus.name}</h3>
            <p className="text-sm text-foreground/70 mb-1">
              {alumnus.label} {alumnus.subject}
            </p>
            <div className="flex items-center gap-1 text-xs text-blue-500">
              <Calendar className="h-3 w-3" />
              <span>{alumnus.duration}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
