import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CanvasLoader = ({setIsLoading, color}: {setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>, color: string}) => {
  const { t } = useTranslation();
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && setIsLoading) {
      setIsLoading(false);
    }
  }, [progress, setIsLoading])

  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <p
        style={{
          fontSize: 18,
          color: color,
          fontWeight: 800,
          marginTop: 40,
        }}>
        {progress !== 0 ? `${progress.toFixed(2)}%` : `${t("loading")}...`}
      </p>
    </Html>
  );
};

export default CanvasLoader;