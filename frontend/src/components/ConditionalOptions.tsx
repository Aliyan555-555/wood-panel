// import { useSnapshot } from "valtio";
import { RootState } from "../redux/store";
import Info from "./Info";
import { useDispatch, useSelector } from "react-redux";
import { setBackCut, setBackGrade, setBackMatch, setFaceCut, setFaceGrade, setFaceGrain, setFaceMatch, setFaceSpecies, setInitialData, setMaterial, setSize, setThickness } from "../redux/schema/baseSlice";
import React, { useEffect } from "react";

const ConditionalOptions = ({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement>;
}) => {
  const cores = useSelector((root: RootState) => root.core.cores)
  const {
    activeOptions,
    material,
    faceCut,
    faceGrade,
    faceMatch,
    faceSpecies,
    backCut,
    backGrade,
    faceGrain,
    backMatch,
  } = useSelector((root: RootState) => root.base);
  const dispatch = useDispatch()

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaterial({ value: e.target.title, text: e.target.title,source:e.target.value }))
  };
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSize({
      value: e.target.value,
      text: e.target.options[e.target.selectedIndex].innerText,
    }))
  }
  const handleThinnessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setThickness({
      value: e.target.value,
      text: e.target.options[e.target.selectedIndex].innerText,
    }))
  }

  useEffect(() => {
    console.log(cores)
    if (cores && cores.length) {
      dispatch(setInitialData({
      activeOptions: 0,
      material: { value: cores[0].name.toLowerCase(), text: cores[0].name, source: cores[0].source },
      size: { value: '4x8', text: '4 foot x 8 foot' },
      thickness: { value: '0.25', text: '1/4 inch' },
      faceCut: { value: 'plain-sliced', text: 'Plain sliced' },
      faceMatch: { value: 'pleasing-match', text: 'Pleasing match' },
      faceGrade: { value: 'B', text: 'B' },
      faceSpecies: { value: 'cherry', text: 'Cherry' },
      faceGrain: { value: 'length', text: 'Length' },
      backCut: { value: 'rotary', text: 'Rotary' },
      backMatch: { value: 'book-match', text: 'Book match' },
      backGrade: { value: '1', text: '1' },
      isPDF: false,
      }));
    }
  }, [cores, dispatch])
  switch (activeOptions) {
    case 0:
      return (
        <div className="react-option">
          <h2>1. Core Material</h2>
          <div className="react-radio">
            {
              cores.map((core) => (
                <div key={core._id}>
                  <input
                    type="radio"
                    id={`react-${core.name.toLowerCase()}`}
                    name="core_material"
                    title={core.name}
                    value={core.source}
                    onChange={handleMaterialChange}
                    checked={material.value === core.name.toLowerCase()}
                  />
                  <label htmlFor={`react-${core.name.toLowerCase()}`}>{core.name.toLocaleUpperCase()}</label>
                </div>
              ))
            }
          </div>
          {/* <div className="react-radio">
            <div>
              <input
                type="radio"
                id="react-armorcore"
                name="core_material"
                title="armorcore"
                value="armorcore"
                onChange={handleMaterialChange}
                checked={material.value === "armorcore"}
              />
              <label htmlFor="react-armorcore">Armorcore</label>
            </div>
            <div>
              <input
                type="radio"
                id="react-appleply"
                name="core_material"
                value="appleply"
                title="appleply"
                className="!bg-blue-400"
                onChange={handleMaterialChange}
                checked={material.value === "appleply"}
              />
              <label htmlFor="react-appleply">ApplePly</label>
            </div>
            <div>
              <input
                type="radio"
                id="react-particle-board"
                name="core_material"
                value="particleboard"
                title="particle board"
                onChange={handleMaterialChange}
                checked={material.value === "particleboard"}
              />
              <label htmlFor="react-particle-board">Particle Board</label>
            </div>
            <div>
              <input
                type="radio"
                id="react-mdf"
                name="core_material"
                value="mdf"
                title="mdf"
                onChange={handleMaterialChange}
                checked={material.value === "mdf"}
              />
              <label htmlFor="react-mdf">MDF</label>
            </div>
            <div>
              <input
                type="radio"
                id="react-naf"
                name="core_material"
                value="naf"
                title="naf"
                onChange={handleMaterialChange}
                checked={material.value === "naf"}
              />
              <label htmlFor="react-naf">NAF</label>
            </div>
            <div>
              <input
                type="radio"
                id="react-hdf"
                name="core_material"
                value="hdf"
                title="hdf"
                onChange={handleMaterialChange}
                checked={material.value === "hdf"}
              />
              <label htmlFor="react-hdf">HDF</label>
            </div>
            <div>
              <input
                type="radio"
                id="react-scb"
                name="core_material"
                value="scb"
                title="scb"
                onChange={handleMaterialChange}
                checked={material.value === "scb"}
              />
              <label htmlFor="react-scb">SCB</label>
            </div>
          </div> */}
        </div>
      );
    case 1:
      return (
        <div className="react-option">
          <h2>2. Panel Size</h2>
          <div className="react-input">
            <label>Size</label>
            <select
              onChange={handleSizeChange}
              name="size"
            >
              <option value="4x8">4 foot x 8 foot</option>
              <option value="4x10">4 foot x 10 foot</option>
            </select>
          </div>
          <div className="react-input">
            <label>Thickness</label>
            <select
              onChange={handleThinnessChange}

              name="thickness"
            >
              <option value="0.25">1/4 inch</option>
              <option value="0.375">3/8 inch</option>
              <option value="0.5">1/2 inch</option>
              <option value="0.625">5/8 inch</option>
              <option value="0.75">3/4 inch</option>
              <option value="1">1 inch</option>
              <option value="1.25">1-1/4 inch</option>
              <option value="1.5">1-1/2 inch</option>
            </select>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="react-option">
          <h2>3. Face Veneer</h2>
          <div className="react-input">
            <label>Species</label>
            <select
              onChange={(e) => dispatch(setFaceSpecies({
                value: e.target.value,
                text: e.target.options[e.target.selectedIndex].innerText,
              }))
              }
              value={faceSpecies.value}
              name="face-species"
            >
              <option value="maple">Maple</option>
              <option value="birch">Birch</option>
              <option value="oak">Oak</option>
              <option value="cherry">Cherry</option>
              <option value="cedat">Cedar</option>
              <option value="pine">Pine</option>
              <option value="redwood">Redwood</option>
              <option value="fir">Fir</option>
              <option value="walnut">Walnut</option>
              <option value="white-oak">White Oak</option>
            </select>
          </div>
          <div className="react-input">
            <label>Cut</label>
            <select
              onChange={(e) => dispatch(setFaceCut({
                value: e.target.value,
                text: e.target.options[e.target.selectedIndex].innerText,
              }))}
              value={faceCut.value}
              name="face-cut"
            >
              <option value="rotary">Rotary</option>
              <option value="plain-sliced">Plain sliced</option>
              <option value="quarter-cut">Quarter cut</option>
              <option value="rift-cut">Rift cut</option>
            </select>
          </div>
          <div className="react-input">
            <label>Match</label>
            <select
              onChange={(e) => dispatch(
                setFaceMatch({
                  value: e.target.value,
                  text: e.target.options[e.target.selectedIndex].innerText,
                })
              )}
              value={faceMatch.value}
              name="face-match"
            >
              <option value="book-match">Book match</option>
              <option value="slip-match">Slip match</option>
              <option value="random-match">Random match</option>
              <option value="pleasing-match">Pleasing match</option>
              <option value="whole-piece">Whole piece</option>
            </select>
          </div>
          <div className="react-input">
            <label>Grade</label>
            <select
              onChange={(e) => dispatch(

                setFaceGrade({
                  value: e.target.value,
                  text: e.target.options[e.target.selectedIndex].innerText,
                }
                ))
              }
              value={faceGrade.value}
              name="face-grade"
            >
              <option value="AA">AA</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="react-input">
            <label>Grain Direction</label>
            <select
              onChange={(e) =>
                dispatch(
                  setFaceGrain({
                    value: e.target.value,
                    text: e.target.options[e.target.selectedIndex].innerText,
                  })
                )
              }
              value={faceGrain.value}
              name="face-grain"
            >
              <option value="length">Length</option>
              <option value="width">Width</option>
            </select>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="react-option">
          <h2>4. Back Veneer</h2>
          <div className="react-input">
            <label>CUT</label>
            <select
              onChange={(e) =>
                dispatch(setBackCut({
                  value: e.target.value,
                  text: e.target.options[e.target.selectedIndex].innerText,
                }))
              }
              value={backCut.value}
              name="back-cut"
            >
              <option value="rotary">Rotary</option>
              <option value="plain-sliced">Plain sliced</option>
              <option value="quarter-cut">Quarter cut</option>
              <option value="rift-cut">Rift cut</option>
            </select>
          </div>
          <div className="react-input">
            <label>Match</label>
            <select
              onChange={(e) =>
                dispatch(setBackMatch({
                  value: e.target.value,
                  text: e.target.options[e.target.selectedIndex].innerText,
                }))
              }
              name="backMatch"
              value={backMatch.value}
            >

<option value="book-match">Book match</option>
              <option value="slip-match">Slip match</option>
              <option value="random-match">Random match</option>
              <option value="pleasing-match">Pleasing match</option>
              <option value="whole-piece">Whole piece</option>
            </select>
          </div>
          <div className="react-input">
            <label>GRADE</label>
            <select
              onChange={(e) =>
                dispatch(setBackGrade({
                  value: e.target.value,
                  text: e.target.options[e.target.selectedIndex].innerText,
                }))
              }
              name="back-grade"
              value={backGrade.text}
            >
              <option value="AA">AA</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
      );
    case 4:
      return <Info targetRef={targetRef} />;
  }
};

export default ConditionalOptions;
