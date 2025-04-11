// import { useSnapshot } from "valtio";
import { RootState} from "../redux/store";
import { Download, LeftArrow, Repeat, RightArrow } from "./Svgs";
import ConditionalOptions from "./ConditionalOptions";
// import generatePDF, { Margin } from "react-to-pdf";
import { useRef } from "react";
import PDFGenerator from "./pdf/PDFGenerator";
import { useDispatch, useSelector } from "react-redux";
import { setActiveOptions } from "../redux/schema/baseSlice";

const Configuration = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { activeOptions } = useSelector((root:RootState) => root.base);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (activeOptions < 4) {
      dispatch(setActiveOptions(activeOptions + 1))
    }
  };
  const handleBack = () => {
    if (activeOptions >= 0) {
      dispatch(setActiveOptions(activeOptions - 1))
    }
  };
  const handleStartOver = () => {
    dispatch(setActiveOptions(0))
  };


  return (
    <div id="react-config">
      <ConditionalOptions targetRef={targetRef} />
      <div className="react-button-group">
        {activeOptions !== 0 && (
          <button
            onClick={handleBack}
            data-grey
            className="react-button-group_button"
          >
            <LeftArrow />
            <span>Back</span>
          </button>
        )}
        {activeOptions < 4 && (
          <>
            <button onClick={handleNext} className="react-button-group_button">
              <span>Next</span>
              <RightArrow />
            </button>
            <p className="note">
              Inner ply will vary by thickness for illustration purposes only
            </p>
          </>
        )}

        {activeOptions > 3 && (
          <button
            data-grey
            onClick={handleStartOver}
            className="react-button-group_button"
          >
            <span>Start Over</span>
            <Repeat />
          </button>
        )}
        {activeOptions > 3 && (
          <a href="/CSISpec.pdf" download="CSISpec">
            <button className="react-button-group_button">
              <span>Download CSI Spec</span>
              <Download />
            </button>
          </a>
        )}

       {activeOptions > 3 && <PDFGenerator/>}
      </div>
    </div>
  );
};

export default Configuration;
