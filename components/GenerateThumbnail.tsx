import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useAction, useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import type { Id } from "@/convex/_generated/dataModel";

type UploadResult = {
  response?: {
    storageId?: string;
  };
};

const extractStorageId = (uploads: unknown[]): Id<"_storage"> => {
  if (!Array.isArray(uploads) || uploads.length === 0) {
    throw new Error("Upload response missing records");
  }

  const [first] = uploads;

  if (
    typeof first === "object" &&
    first !== null &&
    "response" in first &&
    typeof (first as UploadResult).response?.storageId === "string"
  ) {
    return (first as UploadResult).response!.storageId as Id<"_storage">;
  }

  throw new Error("Upload response missing storageId");
};

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
  
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.podcasts.getUrl);
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction)

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploadResults = (await startUpload([file])) as unknown[];
      const storageId = extractStorageId(uploadResults);

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      if (imageUrl) {
        setImage(imageUrl);
      }
      toast({
        title: "Thumbnail generated successfully",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Unable to process thumbnail",
        variant: "destructive",
      })
    } finally {
      setIsImageLoading(false);
    }
  }
  // AI Generated Image
  const generateImage = async () => {
    setIsImageLoading(true);
    try {
      const response = await handleGenerateThumbnail({ prompt: imagePrompt });
      const blob = new Blob([response], { type: 'image/png' });
      await handleImage(blob, `thumbnail-${uuidv4()}`);
    } catch (error) {
      console.log(error)
      toast({
        title: "Unable to generate thumbnail",
        variant: "destructive",
      })
      setIsImageLoading(false);
    }
  }
  // Upload Image
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer()
        .then((ab) => new Blob([ab]));

      await handleImage(blob, file.name);
    } catch (error) {
      console.log(error)
      toast({
        title: "Image upload failed",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn('', {
            'bg-black-6': isAiThumbnail
          })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn('', {
            'bg-black-6': !isAiThumbnail
          })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder='Provide text to generate thumbnail'
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              type="button"
              className="text-16 bg-orange-1 py-4 font-bold text-white-1"
              onClick={generateImage}
              disabled={isImageLoading || !imagePrompt.trim()}
            >
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef?.current?.click()}>
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <Image src="/icons/upload-image.svg" width={40} height={40} alt="upload" />
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">
              Click to upload
            </h2>
            <p className="text-12 font-normal text-gray-1">SVG, PNG, JPG, or GIF (max. 1080x1080px)</p>
          </div>
        </div>
      )}
      <div className="flex-center relative w-full min-h-[220px]">
        {isImageLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black-1/70 backdrop-blur-sm">
            <Loader size={28} className="animate-spin text-orange-1" />
          </div>
        )}
        {image && (
          <Image
            src={image}
            width={200}
            height={200}
            className="mt-5"
            alt="thumbnail"
          />
        )}
      </div>
    </>
  )
}

export default GenerateThumbnail
