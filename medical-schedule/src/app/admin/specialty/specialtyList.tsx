"use client";
import { DeleteSpecialty, UpdateSpecialty, useSpecialties } from "@/api/specialty/queries";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { QueryKeys } from "@/api/specialty/queries";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ISpecialty } from "@/type/interface";
import { deleteImageFireBase, uploadImageFireBase } from "@/utils/firebase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function SpecialtyList() {
  const { data: specialtyList } = useSpecialties();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [oldImage, setOldImage] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const { mutate: updateSpecialty } = UpdateSpecialty();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deleteSpecialty } = DeleteSpecialty();

  const formSchema = z.object({
    name: z.string().trim().min(1, "Vui lòng nhập tên chuyên khoa!").max(255, "Không được quá 255 kí tự!"),
    description: z.string().trim().min(1, "Vui lòng nhập mô tả!"),
    id: z.number(),
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
  const handleShowModal = (data: ISpecialty) => {
    setOpen(true);
    setImagePreview(data.logo);
    setOldImage(data.logo);
    form.setValue("name", data.name);
    form.setValue("description", data.description);
    form.setValue("id", data.id);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (file) {
        const urlLogo = await uploadImageFireBase(file);
        updateSpecialty(
          { name: values.name, description: values.description, logo: urlLogo, id: values.id },
          {
            onSuccess: async () => {
              await deleteImageFireBase(oldImage);
              await queryClient.invalidateQueries({
                queryKey: [QueryKeys.GET_SPECIALTY],
              });
              form.reset();
              setOpen(false);
              toast.success("Cập nhật chuyên khoa thành công!");
              setLoading(false);
            },
          }
        );
      } else {
        updateSpecialty(
          { name: values.name, description: values.description, logo: oldImage, id: values.id },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({
                queryKey: [QueryKeys.GET_SPECIALTY],
              });
              form.reset();
              setOpen(false);
              toast.success("Cập nhật chuyên khoa thành công!");
              setLoading(false);
            },
          }
        );
      }
    } catch (error) {
      toast.error("Cập nhật chuyên khoa thất bại, vui lòng thử lại!");
      setLoading(false);
    }
  };
  const handleDelete = (id: number) => {
    deleteSpecialty(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_SPECIALTY],
        });
        toast.success("Xóa chuyên khoa thành công!");
      },
    });
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên chuyên khoa</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specialtyList?.data.map((item: ISpecialty) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="w-[400px] ">
                <div className="line-clamp-2 overflow-hidden text-ellipsis">{item.description}</div>
              </TableCell>
              <TableCell>
                <Image src={item.logo} width={50} height={50} alt="logo" />
              </TableCell>
              <TableCell className="flex gap-4 justify-end">
                <Button onClick={() => handleShowModal(item)}>Chỉnh sửa</Button>
                <Button onClick={() => handleDelete(item.id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="secondary">Trang trước</Button>
        <Button variant="secondary">Trang sau</Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Chỉnh sửa chuyên khoa</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="hidden" placeholder="Enter the specialty name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    Cập nhật
                  </>
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
