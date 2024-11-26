"use client";

import { Editor } from "@tinymce/tinymce-react";
import { b64EncodeUnicode } from "@/utils/file";
import { Button } from "@/components/ui/button";
import { runGemini } from "@/lib/gemini";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useCallback, useRef } from "react";
import { Loader2, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostForm() {
  const [contentProduct, setContentProduct] = useState("");
  const [text, setText] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any | null>(null);
  const [contentPost, setContentPost] = useState("");

  const { mutate: getGemini } = useMutation({
    mutationFn: (text: string) => {
      setIsLoading(true);
      return runGemini(text);
    },
    retry: 3,
    retryDelay: 2000,
    onError: (err) => {
      console.error("Error:", err);
      setIsLoading(false);
    },
    onSuccess: (result) => {
      setContentProduct(result);
      setContentPost(result);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleEditorChange = (content: string) => {
    const enCode = b64EncodeUnicode(content);
    setContentPost(content);
  };
  const startListening = useCallback(() => {
    recognitionRef.current?.start();
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "vi-VN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setText(currentTranscript);
      getGemini(currentTranscript + " Trả về đoạn code HTML");
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
    recognitionRef.current = recognition;
    return () => {
      recognition.abort();
    };
  }, []);
  if (!isClient) {
    return <div>Loading...</div>;
  }
  const handleSearch = () => {
    const textGemini = text + " Trả về đoạn code HTML";
    getGemini(textGemini);
  };

  return (
    <div>
      <div className="flex justify-end gap-4 mb-8 items-center">
        <Input
          className="w-[400px]"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Đưa ra gợi ý tôi sẽ giúp bạn viết bài... "
        />
        <Mic onClick={startListening} className={`${isListening && "text-red-600"} `} />
        <Button onClick={handleSearch} disabled={isListening || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 text-white dark:text-black" />
              Gợi ý
            </>
          ) : (
            "Gợi ý"
          )}
        </Button>
      </div>
      <div className="relative">
        <Editor
          apiKey="wx24lnxfdf57f0ws653fif0kkt3bggp0rz6snp9d9uzv3zib"
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            setup: (editor) => {
              editor.on("GetContent", (e) => {
                if (e.format === "html") {
                  e.content = e.content.replace(/<img([^>]*)>/g, "<img$1 />");
                }
              });
            },
          }}
          initialValue={contentProduct}
          onEditorChange={handleEditorChange}
        />

        {isLoading && (
          <div className=" absolute w-full h-full flex justify-center items-center bg-[#80808087] top-0 left-0 rounded-[8px]">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
