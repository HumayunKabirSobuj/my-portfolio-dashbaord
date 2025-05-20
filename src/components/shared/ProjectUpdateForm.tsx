// "use client";

// import { TProject } from "@/types";
// import axios from "axios";
// import { Loader } from "lucide-react";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Textarea } from "../ui/textarea";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { UpdateProject } from "@/Services/Projects";

// interface ProjectFromData {
//   title: string;
//   short_description: string;
//   long_description: string;
//   live_link: string;
//   client_link: string;
//   server_link: string;
// }

// export default function ProjectUpdateFrom(
//   projectData: Record<string, unknown>
// ) {
//   const project = projectData?.projectData as TProject;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ProjectFromData>();
//   const [loading, setLoading] = useState(false);

//   const onSubmit: SubmitHandler<ProjectFromData> = async (data) => {
//     // console.log(data);

//     const {
//       short_description,
//       long_description,
//       title,
//       live_link,
//       client_link,
//       server_link,
//     } = data;

//     try {
//       setLoading(true);

//       const projectData = {
//         projectId: project._id,
//         projectInfo: {
//           title,
//           short_description,
//           long_description,
//           live_link,
//           client_link,
//           server_link,
//         },
//       };

//       // console.log(blogData);

//       const result = await UpdateProject(projectData)
//       //   console.log(res.data);
//       console.log(result);

//       setLoading(false);

//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="flex flex-col lg:flex-row p-4 gap-4 h-screen">
//         {/* Left Side - Profile Card */}

//         {/* Right Side - Content */}
//         <div className="w-full mx-auto space-y-6   rounded-3xl">
//           {/* Add Blog Post Section */}
//           <div className="  h-screen">
//             <h3 className="text-black text-lg font-semibold mb-4 lg:px-8 px-3 pt-4">
//               Update Your Project
//             </h3>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="   lg:px-8 px-3 rounded-3xl"
//             >
//               <div className="space-y-5">
//                 <div>
//                   <Label htmlFor="title">Title</Label>
//                   <Input
//                     className="w-full  text-black rounded-lg px-4 py-2 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                     placeholder="Enter blog title"
//                     defaultValue={project?.title}
//                     {...register("title", { required: true })}
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <Label>Live Link</Label>
//                     <Input
//                       type="url"
//                       className="w-full  text-black mt-2 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                       placeholder="Enter project live link"
//                       defaultValue={project?.live_link}
//                       {...register("live_link", { required: true })}
//                     />
//                   </div>
//                   <div>
//                     <Label>Frontend Code Link</Label>
//                     <Input
//                       type="url"
//                       className="w-full  text-black mt-2 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                       placeholder="Enter project live link"
//                       defaultValue={project?.client_link}
//                       {...register("client_link", { required: true })}
//                     />
//                   </div>
//                   <div>
//                    <Label>
//                       Backend Code Link
//                     </Label>
//                    <Input
//                       type="url"
//                       className="w-full  text-black mt-2 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                       placeholder="Enter project live link"
//                       defaultValue={project?.server_link}
//                       {...register("server_link", { required: true })}
//                     />
//                   </div>
//                 </div>

//                 {/* Short Description */}
//                 <div>
//                  <Label>
//                     Short Description
//                 </Label>
//                   <Textarea
//                     className="w-full  text-black rounded-lg px-4 py-2 h-32 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                     placeholder="Write your blog description..."
//                     defaultValue={project?.short_description}
//                     {...register("short_description", {
//                       required: "Blog description is required",
//                       maxLength: {
//                         value: 720,
//                         message:
//                           "Short Description cannot exceed 720 characters",
//                       },
//                     })}
//                   ></Textarea>
//                   {errors.short_description && (
//                     <p className="text-red-500 text-sm">
//                       {errors.short_description.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Long */}

//                 <div>
//                  <Label>
//                     Long Description
//                  </Label>
//                   {/* Long Description */}
//                   <Textarea
//                     className="w-full  text-black rounded-lg px-4 py-2 mt-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"
//                     placeholder="Write your blog long description..."
//                     defaultValue={project?.long_description}
//                     {...register("long_description", {
//                       required: "Long description is required",
//                       maxLength: {
//                         value: 2200,
//                         message:
//                           "Long description cannot exceed 2200 characters",
//                       },
//                     })}
//                   ></Textarea>
//                   {errors.long_description && (
//                     <p className="text-red-500 text-sm">
//                       {errors.long_description.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="mt-8  mb-2 text-center ">

//                 <Button type="submit">Update Project</Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateProject } from "@/Services/Projects";
import type { TProject } from "@/types";
import { useUser } from "../context/UserContext";

interface ProjectFormData {
  title: string;
  short_description: string;
  long_description: string;
  live_link: string;
  client_link: string;
  server_link: string;
}

interface ProjectUpdateFormProps {
  projectData: TProject;
}

export default function ProjectUpdateForm({
  projectData,
}: ProjectUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: projectData?.title,
      short_description: projectData?.short_description,
      long_description: projectData?.long_description,
      live_link: projectData?.live_link,
      client_link: projectData?.client_link,
      server_link: projectData?.server_link,
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);

      const projectUpdateData = {
        projectId: projectData._id,
        projectInfo: {
          title: data.title,
          short_description: data.short_description,
          long_description: data.long_description,
          live_link: data.live_link,
          client_link: data.client_link,
          server_link: data.server_link,
        },
      };

      const result = await UpdateProject(projectUpdateData);

      if (result?.success) {
        toast.success("Project updated successfully", { duration: 2000 });
        router.refresh();
        router.push("/dashboard/manage-projects");
      } else {
        toast.error(result?.message || "Failed to update project", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating the project", {
        duration: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



    if (!user) {
    return <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl text-red-400 border border-red-400 px-2 py-4">You are not authorized..</h1>
    </div>;
  }
  if (user?.email !== process.env.NEXT_PUBLIC_USER_EMAIL) {
    return <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl text-red-400 border border-red-400 px-2 py-4">You are not authorized..</h1>
    </div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="w-full shadow-md">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle>Update Your Project</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">
                Updating project...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  className="focus-visible:ring-primary"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="live_link" className="text-base font-medium">
                    Live Link
                  </Label>
                  <Input
                    id="live_link"
                    type="url"
                    placeholder="Enter project live link"
                    className="focus-visible:ring-primary"
                    {...register("live_link", {
                      required: "Live link is required",
                    })}
                  />
                  {errors.live_link && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.live_link.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="client_link"
                    className="text-base font-medium"
                  >
                    Frontend Code Link
                  </Label>
                  <Input
                    id="client_link"
                    type="url"
                    placeholder="Enter frontend repository link"
                    className="focus-visible:ring-primary"
                    {...register("client_link", {
                      required: "Frontend code link is required",
                    })}
                  />
                  {errors.client_link && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.client_link.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="server_link"
                    className="text-base font-medium"
                  >
                    Backend Code Link
                  </Label>
                  <Input
                    id="server_link"
                    type="url"
                    placeholder="Enter backend repository link"
                    className="focus-visible:ring-primary"
                    {...register("server_link", {
                      required: "Backend code link is required",
                    })}
                  />
                  {errors.server_link && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.server_link.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="short_description"
                  className="text-base font-medium"
                >
                  Short Description
                </Label>
                <Textarea
                  id="short_description"
                  placeholder="Write your project short description..."
                  className="min-h-[120px] resize-y focus-visible:ring-primary"
                  {...register("short_description", {
                    required: "Short description is required",
                    maxLength: {
                      value: 720,
                      message: "Short description cannot exceed 720 characters",
                    },
                  })}
                />
                {errors.short_description && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.short_description.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Maximum 720 characters. Current:{" "}
                  {projectData?.short_description?.length || 0}
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="long_description"
                  className="text-base font-medium"
                >
                  Long Description
                </Label>
                <Textarea
                  id="long_description"
                  placeholder="Write your project long description..."
                  className="min-h-[200px] resize-y focus-visible:ring-primary"
                  {...register("long_description", {
                    required: "Long description is required",
                    maxLength: {
                      value: 2200,
                      message: "Long description cannot exceed 2200 characters",
                    },
                  })}
                />
                {errors.long_description && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.long_description.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Maximum 2200 characters. Current:{" "}
                  {projectData?.long_description?.length || 0}
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/manage-projects")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Project"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
