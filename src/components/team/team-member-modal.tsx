"use client";

import { useState, useEffect } from "react";
import { X, Globe, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamMember, Fellow } from "@/types/team";
import Link from "next/link";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";
import { FaGoogleScholar } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiResearchgate } from "react-icons/si";
import ImageWithFallback from "../image-w-fallback";
import { LiaOrcid } from "react-icons/lia";

interface TeamMemberModalProps {
  member: TeamMember | Fellow | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamMemberModal({
  member,
  isOpen,
  onClose,
}: TeamMemberModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    // Add Escape key listener when modal is open
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{member.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
 
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-[1.5/2] rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={"/images/team/" + member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                  fallbackSrc="/images/placeholder.png"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-lg">{member.label}</h3>
                <p className="text-sm text-blue-500">{member.group}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {member.email !== "" && (
                  <Link
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
                  >
                    <MdOutlineMailOutline className="h-4 w-4 text-blue-500" />
                    <span>Email</span>
                  </Link>
                )}
                {member.linkedin !== "" && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
                  >
                    <FiLinkedin className="h-4 w-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </Link>
                )}
                {member.orcid && (
                  <Link
                    href={member.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
                  >
                    <LiaOrcid className="h-4 w-4 text-blue-500" />
                    <span>ORCID</span>
                  </Link>
                )}
                {member.googleScholar && (
                  <Link
                    href={member.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-3 py-2 rounded-full glass-card hover:bg-blue-500/10 transition-colors"
                  >
                    <FaGoogleScholar className="h-4 w-4 text-blue-500" />
                    <span>Google Scholar</span>
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
                    <span>GitHub</span>
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
                    <span>Twitter</span>
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
                    <span>ResearchGate</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-foreground/70">{member.description}</p>
              </div>

              {member.websites && member.websites.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Websites</h3>
                  <ul className="space-y-2">
                    {member.websites.map((website, index) => (
                      <li key={index}>
                        <Link
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-500 hover:underline"
                        >
                          <Globe className="h-4 w-4" />
                          <span>{website.replace(/^https?:\/\//, "")}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.awards &&
                member.awards.length > 0 &&
                member.awards[0].length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Awards & Honors
                    </h3>
                    <ul className="space-y-2">
                      {member.awards.map((award, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
