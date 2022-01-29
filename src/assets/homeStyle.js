import globalStyle from "./globalStyle";

const homeStyle = {
  ...globalStyle,
  root: {
    flexGrow: 1,
  },
  card: {
    minHeight: 400,
    textAlign: "center",
    width: "100%",
    marginTop: "50px",
    background: "#cfd8dc",
    position: "absoute",
    opacity: 0.99,
  },
  cardC: {
    minHeight: 300,
    textAlign: "center",
    width: "100%",
    marginTop: "50px",
    background: "#cfd8dc",
    position: "absoute",
    opacity: 0.99,
  },
  title: {
    color: "#1976d2",
    fontFamily: "Century Gothic",
    textShadow: "1px 1px 2px black",
    fontWeight: 550,
    marginTop: "80px",
  },
  titleC: {
    fontFamily: "Century Gothic",
    textShadow: "1px 1px 2px black",
    fontWeight: 550,
  },
  text: {
    fontFamily: "Century Gothic",
    textShadow: "1px 0.5px 2px black",
    fontWeight: 550,
  },
  listclass: {
    width: "100%",
    //maxHeight: "320px",
    maxHeight: "550px",
    //height: `${ window.screen.height * 0.4 }px`,
    position: "relative",
    overflow: "auto",
  },
  item: {
    paddingTop: "20px",
  },
};

export default homeStyle;
