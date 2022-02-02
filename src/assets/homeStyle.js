import globalStyle from "./globalStyle";

const homeStyle = {
  ...globalStyle,
  root: {
    flexGrow: 1,
  },
  card: {
    minHeight: 200,
    textAlign: "center",
    width: "100%",
    background: "#cfd8dc",
    opacity: 0.99,
  },
  cardC: {
    minHeight: 300,
    textAlign: "center",
    width: "100%",
    background: "#cfd8dc",
    opacity: 0.99,
  },
  title: {
    color: "#1976d2",
    fontFamily: "Century Gothic",
    textShadow: "1px 1px 2px black",
    fontWeight: 550,
    marginTop: "65px",
  },
  titleC: {
    fontFamily: "Century Gothic",
    textShadow: "1px 1px 2px black",
    fontWeight: 550,
    textAlign: "center",
  },
  text: {
    fontFamily: "Century Gothic",
    textShadow: "1px 0.5px 2px black",
    fontWeight: 550,
  },
  listclass: {
    width: "100%",
    //maxHeight: "320px",
    maxHeight: "470px",
    //height: `${ window.screen.height * 0.4 }px`,
    position: "relative",
    overflow: "auto",
  },
  item: {
    paddingTop: "18px",
  },
};

export default homeStyle;
