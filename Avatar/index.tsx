import { useCallback, useMemo, useState } from 'react';

export interface AvatarProps {
  src?: string | undefined | null;
  children?: string;
}

function getLetters(name: string): string {
  let letters = '';

  const words = name.split(' ');

  for (const word of words) {
    letters += word.charAt(0);
    if (letters.length >= 2) break;
  }

  return letters;
}

const Avatar = ({ src, children }: AvatarProps) => {
  const [errorLoading, setErrorLoading] = useState(false);

  const letters = useMemo(() => getLetters(children ?? ''), [children]);

  const onErrorLoadingImage = useCallback(() => setErrorLoading(true), []);

  return (
    <div className='uizz:flex uizz:h-7 uizz:w-7 uizz:items-center uizz:justify-center uizz:overflow-hidden uizz:rounded-[50%] uizz:bg-(--eduzz-theme-primary) uizz:text-xs uizz:text-white uizz:dark:text-black'>
      {src && !errorLoading ? (
        <img src={src} onError={onErrorLoadingImage} className='uizz:max-h-full uizz:max-w-full' />
      ) : (
        letters
      )}
    </div>
  );
};

export default Avatar;
