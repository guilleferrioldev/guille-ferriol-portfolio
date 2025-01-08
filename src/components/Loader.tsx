import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';

const CanvasLoader = ({setIsLoading, color}: {setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>, color: string}) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && setIsLoading) {
      setIsLoading(true);
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
        {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
      </p>
    </Html>
  );
};

export default CanvasLoader;