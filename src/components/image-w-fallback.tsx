"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt ?? ""}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
