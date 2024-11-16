/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import { AppContainer, AppNavbar } from "~/components/app";
import { env } from "~/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useFindFirstUser, useFindManyBusiness } from "~/lib/hooks";
import { type Business } from "@prisma/client";
import { getUserLocation, sortByNearest } from "~/features/gmap/lib/geocoding";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import Image from "next/image";
import { GoogleMapEmbed } from "~/features/gmap/components/map-embed";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export default function Component() {
  const { data: user } = useFindFirstUser();
  const [location, setLocation] = useState<any>();
  const [nearest, setNearest] = useState<Business[]>();
  const { data: business, status } = useFindManyBusiness({
    include: { services: true },
    take: 5,
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI vet assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isNew, setNew] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setNearest(
      sortByNearest(
        location ?? { lat: "6.9076158", lng: "122.0681293" },
        business as Business[],
      ),
    );
  }, [status]);

  useEffect(() => {
    // Example usage
    getUserLocation()
      .then((location) => {
        console.log("User Location:", location); // { lat, long }
        setLocation(location as { lat: number; lng: number });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors (e.g., permission denied, unavailable)
      });
  }, []);

  const handleSend = async () => {
    setNew(false);
    setLoading(true);
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input.trim(),
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      const genAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent([
        `
        You are Whiskers AI, a chatbot created by PetMate to provide general information about pet care and wellness.
        Answer questions with friendly, empathetic responses about common topics such as diet, grooming, and routine care. 
        However, do not diagnose, prescribe treatments, or provide medical advice. 
        If a question indicates a critical or specific health issue, respond with, “I’m here to provide general information, but for this concern, please consult a veterinarian as soon as possible.” 
        Maintain a warm, supportive tone, and keep responses brief and clear.  

        If the user asks for the nearest vets, just say true and nothing else.

        User question: ${input}
      `,
      ]);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: result.response.text(),
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
      setLoading(false);
    }
  };

  return (
    <AppContainer className="bg-background">
      <AppNavbar title="Whiskers AI" href="/user/home" />

      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        {messages.map((message) =>
          message.text.toLowerCase().includes("true") ? (
            <div key={message.id} className="mb-4">
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`flex items-end space-x-2 ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : "flex-row"
                  }`}
                >
                  <Avatar
                    className={
                      message.sender === "user" ? "bg-zinc-600" : "bg-zinc-200"
                    }
                  >
                    <AvatarFallback>
                      {message.sender === "user" ? "U" : "AI"}
                    </AvatarFallback>
                    <AvatarImage
                      src={`${message.sender == "user" ? user?.image : "/whiskers.webp"}`}
                      alt="AI Assistant"
                    />
                  </Avatar>
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-zinc-700 text-white"
                        : "border border-zinc-200 bg-white text-zinc-800"
                    }`}
                  >
                    <p className="text-sm">{`Here's the nearest vet in your area:`}</p>
                  </div>
                </div>
              </div>
              <Link
                href={`/user/business/${nearest?.[0]?.id}`}
                key={nearest?.[0]?.id}
              >
                <Card className="w-full">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <Image
                        height={64}
                        width={64}
                        src={nearest?.[0]?.logo ?? "/placeholder-logo.png"}
                        alt={`${nearest?.[0]?.businessName} logo`}
                        className="mr-4 h-16 w-16 rounded-full object-cover"
                      />
                      <div className="text-wrap">
                        <h2 className="font-semibold">
                          {nearest?.[0]?.businessName}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {nearest?.[0]?.address ?? "Address not available"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardContent>
                    <GoogleMapEmbed
                      address={nearest?.[0]?.address ?? "Zamboanga City"}
                    />
                  </CardContent>
                </Card>
              </Link>
            </div>
          ) : (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`flex items-end space-x-2 ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                <Avatar
                  className={
                    message.sender === "user" ? "bg-zinc-600" : "bg-zinc-200"
                  }
                >
                  <AvatarFallback>
                    {message.sender === "user" ? "U" : "AI"}
                  </AvatarFallback>
                  <AvatarImage
                    src={`${message.sender == "user" ? user?.image : "/whiskers.webp"}`}
                    alt="AI Assistant"
                  />
                </Avatar>
                <div
                  className={`max-w-xs rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-zinc-700 text-white"
                      : "border border-zinc-200 bg-white text-zinc-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ),
        )}

        {isNew && (
          <>
            <div className="fixed inset-x-0 bottom-44 mx-auto mt-44 grid max-w-sm gap-2">
              <div
                onClick={() => {
                  setInput("How often should I groom my pet?");
                }}
                className="rounded-xl border px-5 py-2.5 text-center hover:bg-muted"
              >
                How often should I groom my pet properly?
              </div>
              <div
                onClick={() => {
                  setInput("Where is the nearest vet in my area?");
                }}
                className="rounded-xl border px-5 py-2.5 text-center hover:bg-muted"
              >
                Where is the nearest vet in my area?
              </div>
              <p className="mt-2 text-center text-xs">
                Disclaimer: Whiskers AI is only here to provide general
                information. If your situation is critical, please consult a
                veterinarian as soon as possible.
              </p>
            </div>
          </>
        )}
      </ScrollArea>

      <div className="fixed bottom-0 left-0 w-full border-t border-zinc-200 bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend().catch((error) => {
              console.error(error);
            });
          }}
          className="flex items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button
            type="submit"
            size="icon"
            className="px-4"
            disabled={!input.trim()}
          >
            {!loading ? (
              <AiOutlineSend className="h-4 w-4" />
            ) : (
              <AiOutlineLoading className="h-4 w-4 animate-spin duration-500" />
            )}
          </Button>
        </form>
      </div>
    </AppContainer>
  );
}
