import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { RootState} from "../../redux/store";
// import { useSnapshot } from "valtio";
import { Grades, Data, getData } from "../constants";
import { useSelector } from "react-redux";


const styles = StyleSheet.create({

  button: {
    border: 'none',
    backgroundColor: '#ed1c25',
    padding: '12px 24px',
    width: "100%",
    color: "#fff",
  },
  page: {
    flexDirection: "column",
  },
  box: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    objectFit: 'fill',
    objectPosition: 'center',
  },
  leftbox: {
    width: '56%',
    marginTop: 280,
    paddingLeft: 50,
    paddingRight: 50,
    // backgroundColor:'red',
    height: 100,
  },
  rightbox: {
    width: '44%',
    height: '100%',
    paddingTop: 85,
  },
  rightTitle: {
    textTransform:"uppercase",
    fontSize: 10,
    fontWeight: '500',
    color: '#848580',
    textAlign: 'left',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 5,
    paddingRight: 40,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // overflow: 'hidden',
    // backgroundColor:'red',
    height: 14,
  },
  tableCell: {
    // flex: 1,
    width: '45%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#848580',
    borderBottomStyle: 'solid',
    borderRightWidth: 0.5,
    borderRightColor: '#848580',
    borderRightStyle: 'solid',
    paddingLeft: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 14,
  },
  tableValueCell: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#848580',
    borderBottomStyle: 'solid',
    borderRightWidth: 0.5,
    borderRightColor: '#848580',
    borderRightStyle: 'solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 14,
    // padding: 5,
  },
  tableCellTitle: {
    fontWeight: '500',
    fontSize: 6,
    letterSpacing: 0.5,
  },
  tableCellContent: {
    fontSize: 6,
    letterSpacing: 0.5,
    paddingLeft: 5,
  },
  tableCellLast: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#848580',
    borderBottomStyle: 'solid',

    height: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  leftRow: {
    width: '100%',
    // height: 50,
    // backgroundColor:'blue',
    paddingTop: 13,
    paddingBottom: 6,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#848580',
    borderBottomStyle: 'solid',
  },
  leftRowTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    textTransform: "uppercase",
  },
  leftRowValues: {
    fontSize: 11,
    textTransform: "uppercase",
    fontWeight: '500',
    color: '#848580',
    whiteSpace: 'nowrap',
    textAlign: 'right',
    paddingTop: 5,
    paddingBottom: 5,

  },
  leftRowValueBox: {
    // width:'60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  }

});


const DynamicTable = ({ data }: { data: Array<{ title: string; values: string[]; rowspan: number, colOne: boolean, isLastRow?: boolean }> }) => (
  <View style={styles.table}>
    {data.map((row, index) => (
      <View style={{ ...styles.tableRow, height: row.rowspan * 14 }} key={index}>
        <View style={{ ...styles.tableCell, height: row.rowspan * 14, width: row.colOne ? '100%' : '45%', borderRightWidth: row.colOne ? 0 : 0.5, borderBottomWidth: row.isLastRow ? 0 : 0.5 }}>
          <Text style={{ ...styles.tableCellTitle, lineHeight: row.rowspan > 1 ? 1.5 : 0 }}>{row.title}</Text>
        </View>
        {row.values.map((value, idx) => (
          <View style={idx === row.values.length - 1 ? { ...styles.tableCellLast, height: row.rowspan * 14, } : { ...styles.tableValueCell, height: row.rowspan * 16 }} key={idx}>
            <Text style={styles.tableCellContent}>{value}</Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);
const PDFDocument: React.FC<{ leftRows: any; tableData: any,fieldData:any}> = ({ leftRows, tableData,fieldData }) => {
  const {faceSpecies} = fieldData


  return (
    <Document>
      <Page size={[612, 800]} style={styles.page}>
        <Image style={styles.backgroundImage} src={"/pdf/images/bg.png"} />
        <View style={styles.box}>
          <View style={styles.leftbox}>
            {
              leftRows.map((row: any, index: any) => (
                <View style={{ ...styles.leftRow }} key={index}>
                  <Text style={styles.leftRowTitle}>{row.title}</Text>
                  <View style={styles.leftRowValueBox}>
                    {
                      row.values.map((value: any, index: any) => (
                        <Text style={styles.leftRowValues} key={index}>{value}</Text>
                      ))
                    }
                  </View>
                </View>
              ))
            }
          </View>
          <View style={styles.rightbox}>
            <Text style={styles.rightTitle}>GRADING RULES FOR {faceSpecies.text}</Text>
            <DynamicTable data={tableData} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function PDFGenerator() {
  const data = useSelector((root:RootState)=>root.base)
  const { backCut, backGrade, backMatch, faceCut, faceGrade, faceGrain, faceMatch, faceSpecies, material, size, thickness } = data;
  const leftRows = [
    {
      title: 'CORE',
      values: [
        material.text
      ]
    },
    {
      title: 'PANEL SIZE',
      values: [
        size.text
      ]
    },
    {
      title: 'THICKNESS',
      values: [
        thickness.text
      ]
    },
    {
      title: 'FACE VENEER',
      values: [
        `CUT:${faceCut.text}`,
        `SPECIES:${faceSpecies?.text ?? ""}`,
        `MATCH:${faceMatch.text}`,
        `GRADE:${faceGrade.text}`,
        `GRAIN DIRECTION:${faceGrain.text}`,

      ]
    },
    {
      title: 'BACK VENEER',
      values: [
        `CUT:${backCut.text}`,
        `SPECIES:${faceSpecies?.text ?? ""}`,
        `MATCH:${backMatch.text}`,
        `GRADE:${backGrade.text}`,
      ]

    }
  ]
  const populatedData = getData(faceSpecies?.text.toLowerCase() as keyof Data, faceGrade.text.toUpperCase() as keyof Grades);
  const tableData = [
    { title: "Grade Description", values: [faceGrade.text], rowspan: 1, colOne: false },
    { title: "Color and Matching", values: ["Sap", "Heart", "Nat"], rowspan: 1, colOne: false },
    { title: "Sapwood", values: populatedData?.sapwood, rowspan: 1, colOne: false },
    { title: "Heartwood", values: populatedData?.heartwood, rowspan: 1, colOne: false },
    { title: "Color Streaks or Spots", values: populatedData?.colorStreaksOrSpots, rowspan: 1 },
    { title: "Color Variation", values: populatedData?.colorVariation, rowspan: 1, colOne: false },
    { title: "Sharp Color Contrasts at Joints", values: populatedData?.sharpColorContrastsAtJoints, rowspan: 1, colOne: false },
    { title: "Type of Matching", values: [""], rowspan: 1, colOne: false },
    { title: "Book Matched", values: populatedData?.bookMatched, rowspan: 1, colOne: false },
    { title: "Slip Matched", values: populatedData?.slipMatched, rowspan: 1, colOne: false },
    { title: "Pleasing Matched", values: populatedData?.pleasingMatched, rowspan: 1, colOne: false },
    { title: "Nominal Minimum Width of Face Components (a)", values: [], rowspan: 1, colOne: true },
    { title: "Plain-S.", values: populatedData?.plainS, rowspan: 1, colOne: false },
    { title: "Quarter", values: populatedData?.quarRift, rowspan: 1, colOne: false },
    { title: "Rotary", values: populatedData?.rotary, rowspan: 1, colOne: false },
    {
      title: `Natural Characteristics (Except as limited below, natural characteristics are not restricted.)`, values: [], rowspan: 2, colOne: true
    },
    {
      title: "Small Conspicuous Burls & Pin Knots - Combined Avg.", values: populatedData?.smallConspicuousBurlsAndPinKnotsCombinedAvgNumber, rowspan: 2, colOne: false
    },
    { title: "Conspicuous Burls - Max. Size", values: populatedData?.conspicuousBurlsMaxSize, rowspan: 1, colOne: false },
    { title: "Conspicuous Pin Knots Avg. Number", values: populatedData?.avgNumber, rowspan: 2, colOne: false },
    {
      title: "Scattered Sound and Repaired Knots- Combined Avg. Number",
      values: [], colOne: true, rowspan: 1
    },
    { title: "Max. Size - Sound", values: populatedData?.maxSizeSounds, rowspan: 1, colOne: false },
    { title: "Max. Size - Repaired", values: populatedData?.maxSizeRepaired, rowspan: 1, colOne: false },
    { title: "Avg. No. - Repaired", values: populatedData?.avgNoRepaired, rowspan: 1, colOne: false },
    { title: "Mineral Streaks", values: populatedData?.mineralStreaks, rowspan: 1, colOne: false },
    { title: "Bark Pockets", values: populatedData?.barkPockets, rowspan: 1, colOne: false },
    { title: "Worm Tracks", values: populatedData?.wormTracks, rowspan: 1, colOne: false },
    { title: "Vine Marks", values: populatedData?.vineMarks, rowspan: 1, colOne: false },
    { title: "Cross Bars", values: populatedData?.crossBars, rowspan: 1, colOne: false },
    {
      title: "Manufacturing Characteristics",
      values: [],
      colOne: true,
      rowspan: 1
    },
    { title: "Rough Cut / Ruptured Gain", values: populatedData?.roughCutRupturedGrain, rowspan: 1, colOne: false },
    { title: "Blended Repaired Tapering Hairline Splits", values: populatedData?.blendedRepairedTaperingHairlineSplits, rowspan: 2, colOne: false },
    { title: "Repairs", values: populatedData?.repairs, rowspan: 1, colOne: false },
    {
      title: "Special Characteristics (Except as limited below, special natural characteristics are not restricted.)",
      values: [],
      colOne: true,
      rowspan: 2
    },

    { title: "Quartered", values: ["1 inch in 12 inches maximum grain slope, 2 1/2 inches in 12 inches maximum grain sweep"], rowspan: 2, colOne: false },
    { title: "Unfilled wormholes, open splits, open joints, open bark pockets, or doze not allowed in above grades.", values: [], rowspan: 2, colOne: true },
    { title: "a) Outside components will be a different size to allow for edge trim loss and certain types of matching.", values: [], rowspan: 2, colOne: true },
    { title: "b) American or European", values: [], rowspan: 1, colOne: true, isLastRow: true },

  ];

  return (
    <PDFDownloadLink
      className="PDF-button"
      document={<PDFDocument fieldData={data} leftRows={leftRows} tableData={tableData} />}
      fileName="Panel Builder PDF.pdf"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  );
}


