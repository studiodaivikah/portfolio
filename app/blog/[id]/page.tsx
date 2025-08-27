/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Project = {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt: string;
};

type BlogContent = {
  id: string;
  projectId: string;
  paragraphs: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
};

const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [blog, setBlog] = useState<BlogContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectAndBlog = async () => {
      if (!params.id) return;

      try {
        setLoading(true);

        // Fetch project details
        const projectRes = await fetch(`/api/blog/${params.id}`);
        if (!projectRes.ok) {
          throw new Error("Project not found");
        }
        const projectData = await projectRes.json();
        setProject(projectData);

        // Fetch blog content
        try {
          const blogRes = await fetch(`/api/blog/${params.id}/blog`);
          if (blogRes.ok) {
            const blogData = await blogRes.json();
            setBlog(blogData);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (blogError) {
          // Blog might not exist, which is fine
          console.log("No blog content found for this project");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Get first paragraph as subtitle and remaining paragraphs
  const subtitle = blog?.paragraphs?.[0] || "";
  const remainingParagraphs = blog?.paragraphs?.slice(1) || [];
  const firstImage = blog?.images?.[0] || "";
  const remainingImages = blog?.images?.slice(1) || [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full max-w-[1140px] flex-col justify-between flex bg-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="pt-20">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-0 py-6">
            <button
              onClick={() => router.back()}
              className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </button>
          </div>

          {/* Project Header with Left Column Layout */}
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 xl:px-0 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Title, Subtitle, and First Image */}
              <div className="space-y-6">
                {/* Project Title */}
                <h1 className="text-[30px] md:text-[40px] lg:text-[50px] font-bold break-words leading-tight">
                  {project.title && project.title.toUpperCase()}
                </h1>

                {/* Subtitle (First Paragraph) */}
                {subtitle && (
                  <div className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                    {subtitle.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                {/* First Image */}
                {firstImage && (
                  <div className="max-w-[400px] w-full">
                    <img
                      src={firstImage}
                      alt="Project hero image"
                      className="w-full h-auto rounded-lg shadow-lg object-cover max-h-96"
                    />
                  </div>
                )}
              </div>

              {/* Right Column - Spacer or additional content can go here */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>

        {/* Blog Content - Remaining Paragraphs */}
        {remainingParagraphs.length > 0 && (
          <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 xl:px-0 py-12">
            <div className="prose prose-lg max-w-none">
              {remainingParagraphs.map((paragraph, index) => (
                <div key={index + 1} className="mb-8 w-full">
                  <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-6 break-words">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Remaining Images Gallery */}
        {remainingImages.length > 0 && (
          <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 xl:px-0 mt-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {remainingImages.map((image, index) => (
                <div key={index + 1} className="group cursor-pointer w-full">
                  <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                    <img
                      src={image}
                      alt={`Gallery image ${index + 2}`}
                      className="w-full max-w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetailPage;

// Related Projects Component
// const RelatedProjects = ({
//   currentProjectId,
//   projectType,
// }: {
//   currentProjectId: string;
//   projectType: string;
// }) => {
//   const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchRelatedProjects = async () => {
//       try {
//         const response = await fetch("/api/blog");
//         if (response.ok) {
//           const data = await response.json();
//           const filtered = data.projects
//             .filter(
//               (p: Project) =>
//                 p.id !== currentProjectId && p.type === projectType
//             )
//             .slice(0, 3);
//           setRelatedProjects(filtered);
//         }
//       } catch (error) {
//         console.error("Error fetching related projects:", error);
//       }
//     };

//     fetchRelatedProjects();
//   }, [currentProjectId, projectType]);

//   if (relatedProjects.length === 0) return null;

//   return (
//     <div className="bg-gray-50 py-16 w-full">
//       <div className="max-w-7xl mx-auto px-4 md:px-10">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 break-words">
//           Related Projects
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
//           {relatedProjects.map((project) => (
//             <div
//               key={project.id}
//               onClick={() => router.push(`/blog/${project.id}`)}
//               className="group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full"
//             >
//               <div className="relative overflow-hidden w-full">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full max-w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
//               </div>

//               <div className="p-6 w-full">
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
//                     {project.type && project.type.toUpperCase()}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors break-words">
//                   {project.title && project.title.toUpperCase()}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-2">
//                   {new Date(project.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
