import { ReactNode } from 'react';

type ImageRenderProps = {
  image: string | ReactNode;
  className?: string;
};

const ImageRender = ({ image, className }: ImageRenderProps) => {
  if (typeof image === 'string') {
    return <img className={className} src={image} />;
  }

  return image;
};

export default ImageRender;
