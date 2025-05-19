"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2, PencilIcon } from 'lucide-react'
import { getAllProject } from "@/Services/Projects"
import { TBlog } from "@/types"
import DeleteProjectButton from "@/components/shared/delete-project-button"
import { useUser } from "@/components/context/UserContext"

const ManageProjectPage = () => {
  const [projects, setProjects] = useState<{ data: TBlog[] }>({ data: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {user}=useUser()
  console.log(user);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const projectsData = await getAllProject()
        setProjects(projectsData)
      } catch (err) {
        setError("Failed to load projects")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])



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
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Manage Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-6 text-destructive">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.data && projects.data.length > 0 ? (
                    projects.data.map((project: TBlog) => (
                      <TableRow key={project?._id}>
                        <TableCell>
                          <div className="w-24 h-24 rounded-md overflow-hidden">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title || "Project image"}
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{project?.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/dashboard/update-project/${project?._id}`}>
                                <PencilIcon className="h-4 w-4 mr-1" />
                                Update
                              </Link>
                            </Button>
                            <DeleteProjectButton id={project?._id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6">
                        No projects found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageProjectPage
