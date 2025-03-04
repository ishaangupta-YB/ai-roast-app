"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { constants } from "@/lib/constants";
import axios from "axios";

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
import getPromptHelper from "@/lib/github-roast/promptHelper";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LinkPreview } from "../ui/link-preview";
import { readStreamableValue } from "ai/rsc";
import { generate } from "@/lib/google-ai/actions";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

const loadingStates = [
  {
    text: "Fetching GitHub data...",
  },
  {
    text: "Generating roast...",
  },
  {
    text: "Crafting witty insults...",
  },
  {
    text: "Almost ready to roast...",
  },
  {
    text: "Almost done...",
  },
  {
    text: "Brace yourself...",
  },
];

export default function GithubRoast() {
  const [username, setUsername] = useState("");
  const [roastTone, setRoastTone] = useState(constants.Tones.SoftHearted);
  const [roleType, setRoleType] = useState(constants.Roles.Memer);
  const [languageType, setLanguageType] = useState(constants.Languages.English);
  const [roastResponse, setRoastResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (roastResponse) {
      setLoading(() => {return false});
    }
  }, [roastResponse]);

  const handleRoast = async () => {
    setLoading(true);
    setRoastResponse("");
    setProfileUrl("");
    setAvatarUrl("");
    try {
      const githubData = await fetchGithubData(username);
      const prompt = getPromptHelper(
        roastTone,
        roleType,
        githubData,
        languageType
      );
      setProfileUrl(githubData?.html_url);
      setAvatarUrl(githubData?.avatar_url);
      await fetchOpenAIResponse(prompt);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid user",
        description: "Please check the username and try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchGithubData = async (username: string) => {
    try {
      const response = await axios.get(`/api/github-data?username=${username}`);
      if (!response) throw new Error("Some error occurred");
      if (response.status == 404) {
        throw new Error("Invalid user");
      } else if (response.status !== 200) {
        throw new Error("Some error occurred");
      }
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error("An error occurred while fetching the data");
      }
    }
  };

  const fetchOpenAIResponse = async (prompt: string) => {
    try {
      const { output } = await generate(prompt);
      for await (const delta of readStreamableValue(output)) {
        setRoastResponse((currentGeneration) => `${currentGeneration}${delta}`);
      }
    } catch (error) {
      console.error("Error generating roast:", error);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "AI Generation Error",
        description: error instanceof Error ? error.message : "Failed to generate roast. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="p-4">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading && !roastResponse}
        duration={2000}
      />
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Roast Your GitHub Profile</h2>
        <p className="text-muted-foreground mt-2">
          Enter a GitHub username and select the roast options below.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="col-span-1">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
        </div>
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
      </div>
      {/* <Button onClick={handleRoast} disabled={loading}>
        {loading ? "Loading..." : "Roast"}
      </Button> */}
      <HoverBorderGradient
        onClick={handleRoast}
        aria-disabled={loading}
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black text-lg bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>{loading ? "Loading..." : "Roast Now"}</span>
      </HoverBorderGradient>
      {avatarUrl && (
        <div className="mt-6 flex flex-col items-center">
          <Avatar className="w-28 h-28">
            <AvatarImage src={avatarUrl} alt="User Avatar" />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <LinkPreview url={profileUrl} className="mt-2 text-lg font-semibold">
            {username}
          </LinkPreview>
        </div>
      )}
      {roastResponse && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Roast Result</h3>
          <Textarea readOnly value={roastResponse} className="mt-2" rows={10} />
        </div>
      )}
    </div>
  );
}
