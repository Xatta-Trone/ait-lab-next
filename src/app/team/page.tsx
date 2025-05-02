/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Users, GraduationCap, UserCheck } from "lucide-react";
import TeamMemberCard from "@/components/team/team-member-new-card";
import AlumnusCard from "@/components/team/alumnus-new-card";
import SectionHeading from "@/components/ui/section-heading";
import { useTeamData } from "@/hooks/useTeamData";
import { useFellowData } from "@/hooks/useFellowData";
import { useAlumniData } from "@/hooks/useAlumniData";
import TeamMemberModal from "@/components/team/team-member-modal";
import { Spinner } from "@/components/ui/spinner";

export default function TeamPage() {
  const { teamMembers, isLoading: isTeamMemberLoading } = useTeamData();

  const { fellows, isLoading: isFellowLoading } = useFellowData();

  const { alumni, isLoading: isAlumniLoading } = useAlumniData();

  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (member: any) => {
    if (member.name.includes("Subasish Das")) {
      window.location.href = "/about";
      return;
    }
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 md:py-24">
        <SectionHeading
          title={<span className="gradient-text">Our Team</span>}
          subtitle="Meet the researchers, students, and staff behind our work"
        />

        {/* Faculty and Staff */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start h-min">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0 bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Current Team</h2>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-1 gap-6">
            {isTeamMemberLoading ? (
              <div className="flex items-center justify-center h-96">
                <Spinner />
              </div>
            ) : (
              teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  member={member}
                  onOpenModal={handleOpenModal}
                />
              ))
            )}
          </div>
        </div>

        {/* Graduate Students */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start h-min">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0 bg-purple-500/10">
                <GraduationCap className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold gradient-text">Fellows</h2>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-1 gap-6">
            {isFellowLoading ? (
              <div className="flex items-center justify-center h-96">
                <Spinner />
              </div>
            ) : (
              fellows.map((fellow, index) => (
                <TeamMemberCard
                  key={index}
                  member={fellow}
                  onOpenModal={handleOpenModal}
                />
              ))
            )}
          </div>
        </div>

        {/* Alumni */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center glass-card shrink-0 bg-green-500/10">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold gradient-text">Alumni</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-green-500/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isAlumniLoading ? (
              <div className="flex items-center justify-center h-96">
                <Spinner />
              </div>
            ) : (
              alumni.map((alumnus, index) => (
                <AlumnusCard key={index} alumnus={alumnus} />
              ))
            )}
          </div>
        </div>

        {/* Modal for detailed member information */}
        <TeamMemberModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
