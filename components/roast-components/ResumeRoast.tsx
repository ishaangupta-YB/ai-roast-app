"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { constants } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import getResumePromptHelper from "@/lib/resume-roast/promptHelper";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { readStreamableValue } from "ai/rsc";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import FileUpload from "../FileUploader";
import { generate } from "@/lib/google-ai/actions";

const loadingStates = [
  { text: "Fetching Resume data..." },
  { text: "Generating roast..." },
  { text: "Crafting witty insults..." },
  { text: "Almost ready to roast..." },
  { text: "Almost done..." },
  { text: "Brace yourself..." },
];

export default function ResumeRoast() {
  const [roastTone, setRoastTone] = useState(constants.Tones.SoftHearted);
  const [roleType, setRoleType] = useState(constants.Roles.Memer);
  const [languageType, setLanguageType] = useState(constants.Languages.English);
  const [roastResponse, setRoastResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  //   const [generateImage, setGenerateImage] = useState(false);
  const { toast } = useToast();

  const [parsedText, setParsedText] = useState("");
  const [open, setOpen] = useState(false);

  const handleRoast = async () => {
    setLoading(true);
    setRoastResponse("");
    if (!parsedText) {
      toast({
        variant: "destructive",
        title: "No file uploaded",
        description: "Please upload a resume file to proceed.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setLoading(false);
      return;
    }
    try {
      if (!parsedText) throw new Error("Reading File Error");
      const prompt = getResumePromptHelper(
        roastTone,
        roleType,
        languageType,
        parsedText
      );
      console.log({ prompt });
      await fetchOpenAIResponse(prompt);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check file and try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOpenAIResponse = async (prompt: string) => {
    const { output } = await generate(prompt);
    for await (const delta of readStreamableValue(output!)) {
      setRoastResponse((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(() => {
      return file;
    });

    setOpen(() => {
      return false;
    });
    toast({
      variant: "default",
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  return (
    <div className="p-4">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading && !roastResponse}
        duration={2000}
      />
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Roast Your Resume</h2>
        <p className="text-muted-foreground mt-2">
          Upload your resume, and select the roast options below.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="col-span-1">
          <Select onValueChange={(x) => setRoastTone(x as constants.Tones)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Roast Tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roast Tone</SelectLabel>
                {Object.values(constants.Tones).map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Select onValueChange={(x) => setRoleType(x as constants.Roles)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Role Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role Type</SelectLabel>
                {Object.values(constants.Roles).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Select
            onValueChange={(x) => setLanguageType(x as constants.Languages)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Object.values(constants.Languages).map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="col-span-1 flex items-center space-x-4">
          <Label htmlFor="generateImage">Generate Meme Image</Label>
          <Switch
            id="generateImage"
            checked={generateImage}
            onCheckedChange={setGenerateImage}
          />
        </div> */}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <HoverBorderGradient
            containerClassName="rounded-full shadow"
            as="button"
            className="dark:bg-black text-lg  bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>File upload</span>
          </HoverBorderGradient>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Upload your resume in PDF format
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FileUpload
              onFileUpload={handleFileUpload}
              setParsedText={setParsedText}
            />
            {/* <FileUpload setParsedText={setParsedText}/> */}
          </div>
        </DialogContent>
      </Dialog>
      <HoverBorderGradient
        onClick={handleRoast}
        aria-disabled={loading}
        containerClassName="rounded-full mt-6"
        as="button"
        className="dark:bg-black text-lg bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>{loading ? "Loading..." : "Roast Now"}</span>
      </HoverBorderGradient>
      {roastResponse && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Roast Result</h3>
          <Textarea readOnly value={roastResponse} className="mt-2" rows={10} />
        </div>
      )}
    </div>
  );
}
