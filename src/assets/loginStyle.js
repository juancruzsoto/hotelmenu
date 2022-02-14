import globalStyle from "./globalStyle";
import background from "./img/bg1.jpg";

const homeStyle = {
  ...globalStyle,
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundAttachment: "fixed",
    position: "relative",
    backgroundImage: `url(${background})`,
  },
  card: {
    minHeight: 200,
    width: "100%",
    background: "#cfd8dc",
    opacity: 0.98,
    marginTop: "30vh",
    maxWidth: "600px",
    marginRight: "auto",
    marginLeft: "auto",
    flexGrow: 1,
    width: "100%",
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
   textAlign: "center"
  },
  text: {
    fontFamily: "Century Gothic",
    textShadow: "1px 0.5px 2px black",
    fontWeight: 550,
  },
  listclass: {
    width: "100%",
    //maxHeight: "320px",
    maxHeight: "420px",
    //height: `${ window.screen.height * 0.4 }px`,
    position: "relative",
    overflow: "auto",
  },
  item: {
    paddingTop: "18px",
  },
};

export default homeStyle;
