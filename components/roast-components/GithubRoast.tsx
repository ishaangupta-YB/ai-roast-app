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

export default function GithubRoast() {
  const [username, setUsername] = useState("");
  const [roastTone, setRoastTone] = useState(constants.Tones.SoftHearted);
  const [roleType, setRoleType] = useState(constants.Roles.Memer);
  const [languageType, setLanguageType] = useState(constants.Languages.English);
  const [roastResponse, setRoastResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    setLoading(true);
    try {
      const githubData = await fetchGithubData(username);
      const prompt = getPromptHelper(
        roastTone,
        roleType,
        githubData,
        languageType
      );
      const roast = await fetchOpenAIResponse(prompt);
      setRoastResponse(roast);
    } catch (error) {
      console.log("invalid User");
      //   toast.error("Invalid user. Please check the username and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGithubData = async (username: string) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    if (response.status !== 200) {
      throw new Error("Invalid user");
    }
    return response.data;
  };

  const fetchOpenAIResponse = async (prompt: string) => {
    const response = await axios.post("/api/openai", { prompt });
    return response.data.roast;
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
          <Select onValueChange={(x) => setLanguageType(x)}>
            <SelectTrigger className="w-[180px]">
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
          <Select onValueChange={(x) => setLanguageType(x)}>
            <SelectTrigger className="w-[180px]">
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
          <Select onValueChange={(x) => setLanguageType(x)}>
            <SelectTrigger className="w-[180px]">
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
      {roastResponse && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Roast Result</h3>
          <Textarea readOnly value={roastResponse} className="mt-2" rows={10} />
        </div>
      )}
    </div>
  );
}