"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TeamMember, Fellow } from "@/types/team";
import Link from "next/link";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";
import { FaGoogleScholar } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiResearchgate } from "react-icons/si";

interface TeamMemberCardProps {
  member: TeamMember | Fellow;
  onOpenModal: (member: TeamMember | Fellow) => void;
}

export default function TeamMemberCard({
  member,
  onOpenModal,
}: TeamMemberCardProps) {
  return (
    <Card className="glass-card h-full flex flex-col md:flex-row items-start card-hover overflow-hidden p-4">
      <div className="relative h-full overflow-hidden rounded-md aspect-[300/450] mx-auto md:mx-0 w-full sm:w-[60%] md:w-[30%] lg:w-[20%]">
        <Image
          src={"/images/team/" + member.image || "/images/placeholder.png"}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="md:w-[70%]">
        <CardContent className="p-4">
          <h3 className="font-bold text-xl mb-1">{member.name}</h3>
          <p className="text-sm font-bold text-foreground/70 mb-2">
            {member.label}
          </p>
          {/* <p className="text-xs text-blue-500 mb-4">{member.group}</p> */}
          <p className="line-clamp-5 break-words text-sm">
            {member.description}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 p-4 pt-0 flex-wrap">
          <Button
            variant="outline"
            className="glass-button text-foreground rounded-full px-4"
            onClick={() => onOpenModal(member)}
          >
            View Profile
          </Button>
          <Link
            href={`mailto:${member.email}`}
            className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:bg-blue-500/10 transition-colors"
            aria-label={`Email ${member.name}`}
          >
            <MdOutlineMailOutline className="h-4 w-4 text-blue-500" />
          </Link>
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:bg-blue-500/10 transition-colors"
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <FiLinkedin className="h-4 w-4 text-blue-500" />
          </Link>
          {member.googleScholar && (
            <Link
              href={member.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
            >
              <FaGoogleScholar className="h-4 w-4 text-blue-500" />
            </Link>
          )}
          {member.github && (
            <Link
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
            >
              <FiGithub className="h-4 w-4 text-blue-500" />
            </Link>
          )}
          {member.twitter && (
            <Link
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
            >
              <FaXTwitter className="h-4 w-4 text-blue-500" />
            </Link>
          )}
          {member.researchGate && (
            <Link
              href={member.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
            >
              <SiResearchgate className="h-4 w-4 text-blue-500" />
            </Link>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
