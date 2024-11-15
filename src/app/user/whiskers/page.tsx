"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { AiOutlineSend } from "react-icons/ai";
import { AppContainer, AppNavbar } from "~/components/app";
import { env } from "~/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useFindFirstUser, useFindManyBusiness } from "~/lib/hooks";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export default function Component() {
  const { data: user } = useFindFirstUser();
  const { data: business } = useFindManyBusiness({
    select: {
      businessName: true,
      phoneNumber: true,
      address: true,
      services: {
        include: {
          variants: true,
        },
      },
    },
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

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    setNew(false);
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input.trim(),
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      const genAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GOOGLE_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        `
        You are Whiskers AI, a chatbot created by PetMate to provide general information about pet care and wellness.
        Answer questions with friendly, empathetic responses about common topics such as diet, grooming, and routine care. 
        However, do not diagnose, prescribe treatments, or provide medical advice. 
        If a question indicates a critical or specific health issue, respond with, “I’m here to provide general information, but for this concern, please consult a veterinarian as soon as possible.” 
        Maintain a warm, supportive tone, and keep responses brief and clear.  

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
    }
  };

  return (
    <AppContainer className="bg-background">
      <AppNavbar title="Whiskers AI" href="/user/home" />

      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        {messages.map((message) => (
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
        ))}
        {isNew && (
          <>
            <div className="mx-auto grid gap-2">
              <div
                onClick={() => {
                  setInput("How often should I groom my pet?");
                  handleSend().catch((error) => {
                    console.error(error);
                  });
                }}
                className="rounded-xl border px-5 py-2.5 text-center hover:bg-muted"
              >
                How often should I groom my pet?
              </div>
              <div
                onClick={() => {
                  setInput("How do I know if my pet has allergies?");
                  handleSend().catch((error) => {
                    console.error(error);
                  });
                }}
                className="rounded-xl border px-5 py-2.5 text-center hover:bg-muted"
              >
                How do I know if my pet has allergies?
              </div>
              <div
                onClick={() => {
                  setInput("How can I calm my anxious pet?");
                  handleSend().catch((error) => {
                    console.error(error);
                  });
                }}
                className="rounded-xl border px-5 py-2.5 text-center hover:bg-muted"
              >
                How can I calm my anxious pet?
              </div>
            </div>
            <p className="mt-2 text-center text-xs">
              Disclaimer: Whiskers AI is only here to provide general
              information. If your situation is critical, please consult a
              veterinarian as soon as possible.
            </p>
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
            <AiOutlineSend className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppContainer>
  );
}
