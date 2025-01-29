import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Upload } from "lucide-react";

const auctionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  startingBid: z.number().min(1, "Starting bid must be at least 1"),
  itemPic: z.string().url("Valid image URL is required"),
});

const CreateAuctionItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startingBid: "",
    endDate: null,
    itemPic: "",
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "startingBid" ? parseFloat(value) || "" : value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const uploadToCloudinary = async (e) => {
    try {
      setIsUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "zngtpman");
      data.append("cloud_name", "dxykak5rw");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxykak5rw/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const imageData = await response.json();
      setFormData((prev) => ({ ...prev, itemPic: imageData.url }));
      setErrors((prev) => ({ ...prev, itemPic: "" }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        itemPic: "Upload failed",
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      auctionSchema.parse(formData);
      setIsOpen(false);
      setFormData({
        title: "",
        startingBid: "",
        endDate: null,
        itemPic: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="blue">Create an auction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-medium text-center">
            Create an auction
          </h1>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="itemPic">Picture</Label>
              <div className="relative">
                <Input
                  id="itemPic"
                  type="file"
                  accept="image/*"
                  onChange={uploadToCloudinary}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className={`w-full ${formData.itemPic ? "bg-green-50" : ""}`}
                  onClick={() => document.getElementById("itemPic").click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    "Uploading..."
                  ) : formData.itemPic ? (
                    "Image uploaded ✓"
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload image
                    </>
                  )}
                </Button>
              </div>
              {errors.itemPic && (
                <p className="text-red-500 text-sm">{errors.itemPic}</p>
              )}
              {formData.itemPic && (
                <img
                  src={formData.itemPic}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="startingBid">Starting bid</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  $
                </span>
                <Input
                  id="startingBid"
                  type="number"
                  min="0"
                  placeholder="1"
                  step="0.01"
                  value={formData.startingBid}
                  onChange={handleInputChange}
                  className={`pl-6 ${
                    errors.startingBid ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.startingBid && (
                <p className="text-red-500 text-sm">{errors.startingBid}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Auction end date</Label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, endDate: date }))
                }
                minDate={new Date()}
                placeholderText="Auction end date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" variant="blue">
              Create auction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAuctionItem;
