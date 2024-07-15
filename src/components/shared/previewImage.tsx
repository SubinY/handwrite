"use client";

import Modal from "@/components/shared/modal";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

type PreviewImageProps = {
  showPreviewImage: boolean;
  setPreviewImage: Dispatch<SetStateAction<boolean>>;
};

type ImageProps = React.ComponentProps<typeof Image>; // 使用 React.ComponentProps 推断类型

export const PreviewImage = ({
  alt = "preview image",
  src,
  ...props
}: ImageProps) => {
  const [showPreviewImage, setPreviewImage] = useState(false);

  return (
    <>
      <Modal showModal={showPreviewImage} setShowModal={setPreviewImage}>
        <div className="w-full h-full flex overflow-hidden shadow-xl md:max-w-[50vw] md:rounded-2xl md:border md:border-gray-200">
          <div className="w-full mr-0 flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <Image
              {...props}
              src={src}
              alt={alt}
              width={(props.width as number) * 10}
              height={(props.height as number) * 10}
              style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
            />
          </div>
        </div>
        <button></button>
      </Modal>
      <Image
        {...props}
        src={src}
        alt={alt}
        style={{ cursor: "zoom-in" }}
        onClick={() => setPreviewImage(true)}
      />
    </>
  );
};

export function usePreviewImage() {
  const [showPreviewImage, setPreviewImage] = useState(false);

  const ShowPreviewImageCallback = useCallback(
    (imgProps: ImageProps) => {
      return (
        <PreviewImage
          // @ts-ignore
          showPreviewImage={showPreviewImage}
          setPreviewImage={setPreviewImage}
          {...imgProps}
        />
      );
    },
    [showPreviewImage, setPreviewImage]
  );

  return useMemo(
    () => ({ setPreviewImage, PreviewImage: ShowPreviewImageCallback }),
    [setPreviewImage, ShowPreviewImageCallback]
  );
}
