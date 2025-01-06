import { RenderTexture } from "@react-three/drei";
import { ScenePaths, SceneType } from "../utils/scenes";
import { Scene } from "../components";

interface Props {
  scene: SceneType;
  viewport: any;
}

const AboutMePage = ({ scene, viewport }: Props) => {
    return (
         <>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <meshBasicMaterial toneMapped={false}>
                <RenderTexture attach="map">
                    <Scene {...scene}  path={ScenePaths.ABOUT_ME}/>
                </RenderTexture>
            </meshBasicMaterial>
        </>
    );
};

export default AboutMePage;