import { createAuction } from "@/actions/sellerActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-datepicker/dist/react-datepicker.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Upload } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const auctionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  startingBid: z.number().min(1, "Starting bid must be at least 1"),
  itemPic: z.string().url("Valid image URL is required"),
});

const CreateAuction = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.auctionReducer);
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
      const data = {
        ...formData,
        admin: user?.id,
      };
      dispatch(createAuction(data));
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="teal">
          Create
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="grid gap-4">
          <div>
            <h4 className="text-center text-sm font-medium text-teal-900">
              Create Auction
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="text-white space-y-4">
            <div>
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
            <div>
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
                  className={`w-full ${formData.itemPic ? "bg-gray-800" : ""}`}
                  onClick={() => document.getElementById("itemPic").click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    "Uploading..."
                  ) : formData.itemPic ? (
                    "Image Uploaded ✓"
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
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
            <div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  $
                </span>
                <Input
                  id="startingBid"
                  type="number"
                  min="0"
                  placeholder="Starting Bid"
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
            <div>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, endDate: date }))
                }
                minDate={new Date()}
                placeholderText="Auction End Date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                wrapperClassName="w-full"
              />
            </div>
            <div className="flex">
              <Button
                type="submit"
                // variant="secondary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreateAuction;
