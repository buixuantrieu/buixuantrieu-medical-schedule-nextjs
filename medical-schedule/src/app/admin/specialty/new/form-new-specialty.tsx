/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { uploadImageFireBase } from "@/utils/firebase";
import toast from "react-hot-toast";
import { CreateSpecialty } from "@/api/specialty/queries";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Loader2 } from "lucide-react";

export default function FormNewSpecialty() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { mutate: createSpecialty } = CreateSpecialty();
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().trim().min(1, "Vui lòng nhập tên chuyên khoa!").max(255, "Không được quá 255 kí tự!"),
    description: z.string().trim().min(1, "Vui lòng nhập mô tả!"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError("");

      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (file) {
      try {
        setLoading(true);
        const urlLogo = await uploadImageFireBase(file);
        await createSpecialty(
          { name: values.name, description: values.description, logo: urlLogo },
          {
            onSuccess: () => {
              router.push(ROUTES.ADMIN.SPECIALTY);
              setLoading(false);
              toast.success("Thêm chuyên khoa thành công!");
            },
            onError: () => {
              setLoading(false);
              toast.error("Thêm chuyên khoa thất bại, Vui lòng thử lại!");
            },
          }
        );
      } catch (e) {
        toast.error("Thêm chuyên khoa thất bại, Vui lòng thử lại!");
      }
    } else {
      setError("Vui lòng chọn logo!");
    }
  };
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-center">Thêm chuyên khoa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px]">Tên chuyên khoa:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the specialty name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px]">Mô tả:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the specialty description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label className="text-[14px] font-bold" htmlFor="picture">
                Logo:
              </Label>
              <Input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                className={`${error && "border-[red]"}`}
              />
              <div className="text-[13px] font-bold text-[red]">{error}</div>
            </div>

            {imagePreview && (
              <Image src={imagePreview} alt="Logo" width={100} height={100} className="aspect-[1/1] object-cover" />
            )}
            <Button disabled={isLoading} type="submit" className="w-full rounded">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  Tạo mới
                </>
              ) : (
                "Tạo mới"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
