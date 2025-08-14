"use client";

import React from "react";
import { useState, useEffect } from "react";

type TeamMember = {
  id: string;
  image: string;
  name?: string;
  role?: string;
  createdAt: string;
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      if (!response.ok) throw new Error("Failed to fetch team members");
      const data = await response.json();
      setTeamMembers(data.items || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <main className="max-w-[1240px] my-24 w-full flex-start flex-col gap-y-3">
      <h1 className="text-[70px] md:text-[120px] lg:text-[140px] font-bold text-black">
        TEAM
      </h1>
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative overflow-hidden shadow-lg group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.image}
              alt={member.name || "Team member"}
              className="w-full h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Name and Role Overlay - appears on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-white to-transparent p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
              {member.name && (
                <h3 className="text-black font-semibold text-lg mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {member.name}
                </h3>
              )}
              {member.role && (
                <p className="text-gray-700 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                  {member.role}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Team;
