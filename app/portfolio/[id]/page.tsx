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
        const projectRes = await fetch(`/api/portfolio/${params.id}`);
        if (!projectRes.ok) {
          throw new Error("Project not found");
        }
        const projectData = await projectRes.json();
        setProject(projectData);

        // Fetch blog content
        try {
          const blogRes = await fetch(`/api/portfolio/${params.id}/blog`);
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
            onClick={() => router.push("/portfolio")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-screen flex flex-col justify-between bg-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="pt-20">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
            <button
              onClick={() => router.back()}
              className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </button>
          </div>

          {/* Project Header */}
          <div className="w-full flex justify-center items-center px-4 md:px-10">
            <h1 className="text-[30px] md:text-[50px] lg:text-[60px] font-bold text-center break-words max-w-full">
              {project.title && project.title.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Blog Content */}
        {blog && blog.paragraphs && blog.paragraphs.length > 0 && (
          <div className="w-full max-w-6xl mx-auto px-4 md:px-10 py-12">
            <div className="prose prose-lg max-w-none">
              {blog.paragraphs.map((paragraph, index) => {
                // Insert images at strategic points
                // const shouldShowImage =
                //   blog.images &&
                //   blog.images.length > 0 &&
                //   index > 0 &&
                //   (index + 1) %
                //     Math.ceil(
                //       blog.paragraphs.length / Math.min(blog.images.length, 8)
                //     ) ===
                //     0;

                // const imageIndex = Math.floor(
                //   (index * blog.images.length) / blog.paragraphs.length
                // );

                return (
                  <div key={index} className="mb-8 w-full">
                    <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-6 break-words">
                      {paragraph}
                    </p>

                    {/* {shouldShowImage && blog.images[imageIndex] && (
                      <div className="my-12 w-full">
                        <img
                          src={blog.images[imageIndex]}
                          alt={`Project image ${imageIndex + 1}`}
                          className="w-full max-w-full h-auto rounded-lg shadow-lg object-cover max-h-96"
                        />
                      </div>
                    )} */}
                  </div>
                );
              })}
            </div>

            {/* Remaining Images Gallery */}
            {blog.images && blog.images.length > 0 && (
              <div className="mt-16 w-full">
                {/* <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Project Gallery
              </h2> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {blog.images.map((image, index) => (
                    <div key={index} className="group cursor-pointer w-full">
                      <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full max-w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related Projects Section */}
        {/* <RelatedProjects
          currentProjectId={project.id}
          projectType={project.type}
        /> */}

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
//         const response = await fetch("/api/portfolio");
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
//               onClick={() => router.push(`/portfolio/${project.id}`)}
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
//                     {project.type.toUpperCase()}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors break-words">
//                   {project.title.toUpperCase()}
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
