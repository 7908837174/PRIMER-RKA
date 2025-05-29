import { Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import Footer from "./Footer.tsx"; // Adjust the import path as necessary

const WorkspaceDashboard = () => {
    const [quest, setQues] = useState("");
    const [ans, setAns] = useState("");

     async function generateAnswer(){
    setAns("loading...");
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAgu9twaVsUo7HuFsuiGaFvDaWjyEkMKrs",
      method:"post",
      data:{
    "contents": [
      {
        "parts": [{text: quest}]},
        ],
      },
    });
    setAns(response['data']['candidates'][0]['content']['parts'][0]["text"]);
  }


  const { onOpen } = useCreateProjectDialog();
  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Workspace Overview
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s an overview for this workspace!
          </p>
        </div>
        <Button onClick={onOpen}>
          <Plus />
          New Project
        </Button>
      </div>
      <WorkspaceAnalytics />
      <div className="mt-4">
        <Tabs defaultValue="projects" className="w-full border rounded-lg p-2">
          <TabsList className="w-full justify-start border-0 bg-gray-50 px-1 h-12">
            <TabsTrigger className="py-2" value="projects">
              Recent Projects
            </TabsTrigger>
            <TabsTrigger className="py-2" value="tasks">
              Recent Tasks
            </TabsTrigger>
            <TabsTrigger className="py-2" value="members">
              Recent Members
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <RecentProjects />
          </TabsContent>
          <TabsContent value="tasks">
            <RecentTasks />
          </TabsContent>
          <TabsContent value="members">
            <RecentMembers />
          </TabsContent>
        </Tabs>
      </div>
        <div className="bg-slate-500 w-full rounded-xl"> 
          <h1 className='font-bold px-4 text-xl font-serif bg-gray-400 py-4 rounded-xl '>ASK AI</h1>
      <textarea className="w-[60vw] h-50 my-4 mx-5 px-2 py-1 bg-white  text-lg font-mono-bold" onChange={(e)=>setQues(e.target.value)} value={quest} placeholder='How can i help you?'></textarea>
      <button className="mx-5 bg-slate-900 text-white px-2 my-2 mb-6 py-2 rounded-[10px] font-serif-bold hover:bg-green-500" onClick={generateAnswer}>Generate Answer</button>
      <p className="px-2 text-white bg-black">{ans}</p></div> <br />
      <Footer/>
    </main>  
  );
};

export default WorkspaceDashboard;