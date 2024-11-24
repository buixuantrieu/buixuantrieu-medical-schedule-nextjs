"use client";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { runGemini } from "@/lib/gemini";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [textContent, setTextContent] = useState("");
  const {
    mutate: search,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (text: string) => runGemini(text),
    retry: 3,
    retryDelay: 2000,
    onError: (err) => {
      console.error("Error:", err);
    },
    onSuccess: (result) => {
      console.log(result);
    },
  });

  return (
    <div>
      <Input onChange={(e) => setTextContent(e.target.value)} />
      <Button onClick={() => search(textContent)} disabled={isPending}>
        {isPending ? "Đang xử lý..." : "OK"}
      </Button>
      {isError && <p>Lỗi: {isError}</p>}
    </div>
  );
}
