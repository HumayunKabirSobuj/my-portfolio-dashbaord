"use client";

import { TBlog } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BlogFromData {
  title: string;
  short_description: string;
  long_description: string;
}

export default function BlogUpdateFrom(blogData: Record<string, unknown>) {
  const blog = blogData?.blogData as TBlog;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFromData>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<BlogFromData> = async (data) => {
    // console.log(data);

    const { short_description, long_description, title } = data;

    try {
      setLoading(true);

      const blogData = {
        blogId: blog._id,
        blogInfo: { title, short_description, long_description },
      };

      // console.log(blogData);

      await axios.put(
        "https://blog-and-portfilio-backend.vercel.app/api/blogs/update-blog",
        blogData
      );
      // console.log(res.data);

      setLoading(false);
      toast.success("Blog Updated Successfully ..", { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex flex-col lg:flex-row p-4 gap-4 h-screen">
        {/* Left Side - Profile Card */}

        {/* Right Side - Content */}
        <div className="w-full mx-auto space-y-6  bg-gray-800 rounded-3xl">
          {/* Add Blog Post Section */}
          <div className=" rounded-lg shadow-lg  h-screen">
            <h3 className="text-white text-lg font-semibold mb-4 lg:px-8 px-3 pt-4">
              Update Your Blog
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="  bg-gray-800 lg:px-8 px-3 rounded-3xl"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-300 text-sm mb-2 ">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter blog title"
                    defaultValue={blog?.title}
                    {...register("title", { required: true })}
                  />
                </div>
                {/* Short Description */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Short Description
                  </label>
                  {/* <textarea
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Write your blog description..."
                    defaultValue={blog?.short_description}
                    {...register("short_description", {
                      required: "Blog description is required",
                      maxLength: {
                        value: 720,
                        message:
                          "Short Description cannot exceed 720 characters",
                      },
                    })}
                  ></textarea> */}
                  {errors.short_description && (
                    <p className="text-red-500 text-sm">
                      {errors.short_description.message}
                    </p>
                  )}
                </div>
                {/* Long Description */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Long Description
                  </label>

                  {/* <textarea
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Write your blog long description..."
                    defaultValue={blog?.long_description}
                    {...register("long_description", {
                      required: "Long description is required",
                      maxLength: {
                        value: 2200,
                        message:
                          "Long description cannot exceed 2200 characters",
                      },
                    })}
                  ></textarea> */}
                  {errors.long_description && (
                    <p className="text-red-500 text-sm">
                      {errors.long_description.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-8  mb-2 text-center ">
                <button
                  type="submit"
                  className="lg:w-1/3 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2  rounded-lg transition-colors"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
