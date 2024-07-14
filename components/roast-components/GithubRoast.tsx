"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import getPromptHelper from "@/lib/promptHelper";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LinkPreview } from "../ui/link-preview";
import { generate } from "@/lib/actions";
import { readStreamableValue } from "ai/rsc";

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

  const handleRoast = async () => {
    setRoastResponse(() => "")
    setLoading(true);
    try {
      const githubData = await fetchGithubData(username);
      const prompt = getPromptHelper(
        roastTone,
        roleType,
        githubData,
        languageType
      );
      await fetchOpenAIResponse(prompt);
      setProfileUrl(githubData?.html_url);
      setAvatarUrl(githubData?.avatar_url);
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
    const { output } = await generate(prompt);
    for await (const delta of readStreamableValue(output)) {
      setRoastResponse((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  return (
    <div className="p-4">
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
      <Button onClick={handleRoast} disabled={loading}>
        {loading ? "Loading..." : "Roast"}
      </Button>
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
