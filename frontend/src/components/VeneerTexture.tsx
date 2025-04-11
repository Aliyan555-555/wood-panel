// import { store } from "../store";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { MeshStandardMaterial, RepeatWrapping } from "three";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const VeneerTexture = ({ isBack }: { isBack: boolean }) => {
  const { faceSpecies, faceCut, faceGrade, faceMatch, faceGrain, backCut, backGrade, backMatch } = useSelector((root: RootState) => root.base);
  const source = useSelector((root: RootState) => root.veneer.veneers.find((veneer) => {
    console.log(veneer.value,`${faceSpecies.value.split(" ").join("-").toLowerCase()}_${backCut.value.split(" ").join("-").toLowerCase()}_${backMatch.value.split(" ").join("-").toLowerCase()}_${backGrade.value.toLowerCase()}`)
    if (isBack) {
      return veneer.value === `${faceSpecies.value.split(" ").join("-").toLowerCase()}_${backCut.value.split(" ").join("-").toLowerCase()}_${backMatch.value.split(" ").join("-").toLowerCase()}_${backGrade.value.toLowerCase()}`;
    } else {
      return veneer.value === `${faceSpecies.value.split(" ").join("-").toLowerCase()}_${faceCut.value.split(" ").join("-").toLowerCase()}_${faceMatch.value.split(" ").join("-").toLowerCase()}_${faceGrade.value.split(" ").join("-").toLowerCase()}`;
    }
  }));


  const ref = useRef<MeshStandardMaterial>(null);

  useEffect(() => {
    if (ref.current!) {
      const texture = ref.current.map!;

      texture.wrapS = texture.wrapT = RepeatWrapping;

      texture.rotation = faceGrain.value === "length" ? 0 : Math.PI * 0.5;

      texture.needsUpdate = true;
    }
  }, [faceCut, faceGrade, faceSpecies, faceMatch, faceGrain, ref]);

  console.log(source)

  if (source) {

    return (
      <meshStandardMaterial
        ref={ref}
        map={useTexture(source.source)}

      />
    );
  } else {
    return (
      <meshStandardMaterial
        ref={ref}
        map={useTexture("/vaneer/empty.jpg")}
      />
    );
  }


};

export default VeneerTexture;
