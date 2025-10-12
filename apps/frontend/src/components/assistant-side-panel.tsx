"use client";
import { useRef, useState } from "react";
import { assistantPrompt } from "../services/assistant.service";
import { useSideMenuStore } from "../store/side-menu";
import { MessageBox } from "./chat/message-box";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

export function AssistantSidePanel() {
  const [aiResponse, setAiResponse] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen } = useSideMenuStore();
  const messageBoxRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSendMessage = async () => {
    const prompt = messageBoxRef.current?.value;
    if (prompt) {
      setIsLoading(true);
      const { message } = await assistantPrompt(prompt);
      if (message) {
        setAiResponse(message);
      }
      setIsLoading(false);
    }
  };

  return (
    <Sheet modal={false} open={isOpen}>
      <SheetContent
        closeButton={false}
        className="flex flex-col h-[calc(100dvh-5.75rem)] mt-[4.75rem] right-4 bg-app-foreground rounded-xl sm:w-[30vw] w-[calc(100vw-2rem)] border-gray-700 border overflow-hidden pb-4"
        side="right"
      >
        <SheetHeader hidden>
          <SheetTitle>Fale com o assistente de IA</SheetTitle>
          <SheetDescription>
            Área destinada a conversação com o nosso assistente de IA
          </SheetDescription>
        </SheetHeader>
        <div className="size-full grid grid-cols-1 grid-rows-[85%_1fr]">
          <div className="size-full overflow-y-scroll p-4">
            {!isLoading && !aiResponse && (
              <div className="flex h-full items-center justify-center">
                <h2 className="text-app-text text-2xl font-semibold">
                  Em que podemos ajudar?
                </h2>
              </div>
            )}
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                <h2 className="text-app-text text-2xl font-semibold">
                  Pensando...
                </h2>
              </div>
            )}
            {!isLoading && aiResponse && (
              <p className="text-app-text whitespace-pre-wrap text-left">
                {aiResponse}
              </p>
            )}
          </div>

          <div className="w-full px-4 mt-auto">
            <MessageBox
              ref={messageBoxRef}
              className="w-full"
              action={() => handleSendMessage()}
              placeholder="EX: Quais as noticias mais recentes?"
              disabled={isLoading}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
