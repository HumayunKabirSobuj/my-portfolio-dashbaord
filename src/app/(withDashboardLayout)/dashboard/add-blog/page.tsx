"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addBlog } from "@/Services/Blogs";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
interface BlogFromData {
  title: string;
  short_description: string;
  long_description: string;
  image: FileList;
}

export default function AddBlog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFromData>();
  const [loading, setLoading] = useState(false);

  // console.log("data=>",data);
  // console.log(user);

  const onSubmit: SubmitHandler<BlogFromData> = async (data) => {
    // console.log(data);

    const { short_description, long_description, title } = data;

    try {
      setLoading(true);
      const image = data.image[0]; // Ensure this is correct
      const newFormData = new FormData();
      newFormData.append("file", image); // Add the image file
      newFormData.append("upload_preset", "humayunkabir"); // Your upload preset
      newFormData.append("cloud_name", "dn7oeugls"); // Not necessary for the request

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dn7oeugls/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Image uploade =>",response);
      const imageUrl = response.data.secure_url;

      // console.log(imageUrl);

      const blogData = {
        title,
        short_description,
        long_description,
        image: imageUrl,
      };

      // console.log(blogData);
      const res = await addBlog(blogData);
      // console.log(res);
      if (res?.success) {
        toast.success(res.message, {
          // id: toastId,
          duration: 2000,
        });
      }

      reset();

      setLoading(false);
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
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row p-4 gap-4 h-screen">
        {/* Left Side - Profile Card */}

        {/* Right Side - Content */}
        <div className="w-full mx-auto space-y-6 h-screen rounded-3xl">
          {/* Add Blog Post Section */}
          <div className=" h-screen ">
            <h3 className=" text-lg font-semibold mb-4 lg:px-8 px-3 pt-4">
              Add New Blog Post
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="min-h-screen   lg:px-8 px-3 rounded-3xl"
            >
              <div className="space-y-5">
                <div>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    className="w-full   rounded-lg px-4 py-2 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter blog title"
                    {...register("title", { required: true })}
                  />
                </div>

                {/* Short Description */}
                <div>
                  <Label>Short Description</Label>

                  <Textarea
                    id="short_description"
                    placeholder="Write your project short description..."
                    className="min-h-[120px] mt-2"
                    {...register("short_description", {
                      required: "Short description is required",
                      maxLength: {
                        value: 720,
                        message:
                          "Short description cannot exceed 720 characters",
                      },
                    })}
                  />
                  {errors.short_description && (
                    <p className="text-red-500 text-sm">
                      {errors.short_description.message}
                    </p>
                  )}
                </div>
                {/* Long Description */}
                <div>
                  <Label>Long Description</Label>
                  {/* Long Description */}
                  <Textarea
                    id="long_description"
                    placeholder="Write your project long description..."
                    className="min-h-[160px] mt-2"
                    {...register("long_description", {
                      required: "Long description is required",
                      maxLength: {
                        value: 2200,
                        message:
                          "Long description cannot exceed 2200 characters",
                      },
                    })}
                  />
                  {errors.long_description && (
                    <p className="text-red-500 text-sm">
                      {errors.long_description.message}
                    </p>
                  )}
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label htmlFor="image">Project Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register("image", {
                      required: "Project image is required",
                    })}
                  />
                  {errors.image && (
                    <p className="text-sm text-destructive">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-8 lg:mb-4 mb-2">
                <Button type="submit">Publish Blog</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
