"use client";

import { Mail, Linkedin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TeamMember, Fellow } from "@/types/team";
import Link from "next/link";
import ImageWithFallback from "../image-w-fallback";

interface TeamMemberCardProps {
  member: TeamMember | Fellow;
  onOpenModal: (member: TeamMember | Fellow) => void;
}

export default function TeamMemberCard({
  member,
  onOpenModal,
}: TeamMemberCardProps) {
  return (
    <Card className="glass-card h-full flex flex-col card-hover overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <ImageWithFallback
          src={"/images/team/" + member.image || "/images/placeholder.png"}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          fallbackSrc="/images/placeholder.png"
        />
      </div>
      <CardContent className="flex-grow p-4 text-center">
        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
        <p className="text-sm text-foreground/70 mb-2">{member.label}</p>
        <p className="text-xs text-blue-500 mb-4">{member.group}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Link
          href={`mailto:${member.email}`}
          className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:bg-blue-500/10 transition-colors"
          aria-label={`Email ${member.name}`}
        >
          <Mail className="h-4 w-4 text-blue-500" />
        </Link>
        <Button
          variant="outline"
          className="glass-button text-foreground rounded-full px-4"
          onClick={() => onOpenModal(member)}
        >
          View Profile
        </Button>
        <Link
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:bg-blue-500/10 transition-colors"
          aria-label={`${member.name}'s LinkedIn profile`}
        >
          <Linkedin className="h-4 w-4 text-blue-500" />
        </Link>
      </CardFooter>
    </Card>
  );
}
