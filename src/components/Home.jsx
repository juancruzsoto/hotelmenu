import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import homeStyle from "../assets/homeStyle";
import {
  Backdrop,
  Button,
  Grid,
  Icon,
  Modal,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WarningIcon from "@mui/icons-material/Warning";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { TOKEN_API, URL } from "../config";
import RecipesList from "./RecipesList";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles(homeStyle);

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fw = useMediaQuery(theme.breakpoints.up("sm"));

  const [auxRecipe, setAuxRecipe] = useState("");
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalVegan, setModalVegan] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [recipesID, setRecipesID] = useState([]);
  const [infoCards, setInfoCards] = useState([]);
  const [rows, setRows] = useState([]);
  const [menuStats, setMenuStats] = useState({
    price: 0.0,
    time: 0.0,
    healthScore: 0.0,
  });

  useEffect(() => {
    let idR = JSON.parse(localStorage.getItem("Recipes"));
    if (idR) {
      setRecipesID(idR);
      idR.map((ID) => {
        axios
          .get(URL + ID + "/information/?apiKey=" + TOKEN_API)
          .then((result) => {
            console.log(result);
            setInfoCards((infocurrent) =>
              infocurrent.concat({
                id: result.data.id,
                image: result.data.image,
                name: result.data.title,
                vegan: result.data.vegan,
                vegetarian: result.data.vegetarian,
                glutenFree: result.data.glutenFree,
                dairyFree: result.data.dairyFree,
                veryHealthy: result.data.veryHealthy,
                data: {
                  price: result.data.pricePerServing,
                  time: result.data.readyInMinutes,
                  healthScore: result.data.healthScore,
                },
              })
            );
          })
          .catch((e) => {
            console.log("ERROR", e.message);
          });
      });
    }
  }, []);

  useEffect(() => {
    let dataMenu = {
      price: 0.0,
      time: 0.0,
      healthScore: 0.0,
    };
    infoCards.map((Recipe) => {
      console.log(Recipe);
      Object.keys(Recipe.data).map((value) => {
        dataMenu[value] = dataMenu[value] + parseFloat(Recipe.data[value]);
      });
    });
    dataMenu.time = dataMenu.time / recipesID.length;
    dataMenu.healthScore = dataMenu.healthScore / recipesID.length;
    setMenuStats(dataMenu);
  }, [infoCards, recipesID]);

  const handleChange = () => {
    setRows([]);
    console.log(document.getElementById("outlined-search-input").value);
    axios
      .get(
        URL +
          "complexSearch?apiKey=" +
          TOKEN_API +
          "&addRecipeInformation=true&query=" +
          document.getElementById("outlined-search-input").value +
          "&number=100"
      )
      .then((result) => {
        console.log(result);
        setRows(result.data.results);
      })
      .catch((e) => {
        console.log("ERROR", e.message);
      });
  };

  const handleAddRecipe = (id) => {
    let recipesVegan = JSON.parse(localStorage.getItem("RecipesVegan"));
    if (id !== "") {
      axios
        .get(URL + id + "/information/?apiKey=" + TOKEN_API)
        .then((result) => {
          console.log(
            result.data.vegan,
            recipesVegan + 1,
            recipesID.length - recipesVegan + 1
          );
          if (
            (result.data.vegan && recipesVegan + 1 < 3) ||
            (!result.data.vegan && recipesID.length - recipesVegan + 1 < 3)
          ) {
            setRecipesID((currentRecipe) => currentRecipe.concat(id));
            localStorage.setItem(
              "Recipes",
              JSON.stringify(recipesID.concat(id))
            );
            setInfoCards((infocurrent) =>
              infocurrent.concat({
                id: result.data.id,
                image: result.data.image,
                name: result.data.title,
                vegan: result.data.vegan,
                vegetarian: result.data.vegetarian,
                glutenFree: result.data.glutenFree,
                dairyFree: result.data.dairyFree,
                veryHealthy: result.data.veryHealthy,
                data: {
                  price: result.data.pricePerServing,
                  time: result.data.readyInMinutes,
                  healthScore: result.data.healthScore,
                },
              })
            );
            if (result.data.vegan) {
              localStorage.setItem(
                "RecipesVegan",
                JSON.stringify(recipesVegan + 1)
              );
            }
            setSearchShow(false);
          } else {
            setModalVegan(true);
          }
        });
    }
  };

  const handleDelete = () => {
    let recipesnow = recipesID;
    let recipesVegan = JSON.parse(localStorage.getItem("RecipesVegan"));
    console.log(auxRecipe);
    recipesnow.splice(recipesnow.indexOf(auxRecipe), 1);
    setRecipesID(recipesnow);
    localStorage.setItem("Recipes", JSON.stringify(recipesnow));

    recipesnow = infoCards;
    console.log(recipesnow)
    infoCards.map((Recipe) => {
      if (Recipe.id === auxRecipe) {
        console.log(Recipe.vegan, "VEGANN");
        if (Recipe.vegan)
          localStorage.setItem(
            "RecipesVegan",
            JSON.stringify(recipesVegan - 1)
          );
      }
      recipesnow.splice(recipesnow.indexOf(Recipe), 1);
    });
    setInfoCards(recipesnow);
    setAuxRecipe("");
    setModalConfirmation(false);
  };

  return (
    <div className={classes.root}>
      <Box sx={{ flexGrow: 1 }}>
        {/* {loading && <LoadScreen />} */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h4"
              style={{ textAlign: "center" }}
              className={classes.title}
            >
              Conforma tu menu
            </Typography>
          </Grid>
          {recipesID.length > 0 && !searchShow && (
            <Grid container justifyContent="center" alignItems="flex-start">
              <Grid item xs={12} md={4}>
                <Typography
                  gutterBottom
                  variant="h6"
                  // style={{ textAlign: "center" }}
                  className={classes.titleC}
                >
                  Precio: {menuStats["price"].toFixed(2)}$
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  gutterBottom
                  variant="h6"
                  // style={{ textAlign: "center" }}
                  className={classes.titleC}
                >
                  Tiempo promedio: {menuStats["time"].toFixed(2)} mins
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  gutterBottom
                  variant="h6"
                  // style={{ textAlign: "center" }}
                  className={classes.titleC}
                >
                  HealthScore promedio: {menuStats["healthScore"].toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          )}

          {!searchShow ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  "& > :not(style)": {
                    m: 1,
                    width: "100%",
                    maxHeight: "420px",
                  },
                }}
              >
                <Paper
                  variant="outlined"
                  style={{ width: "95%", overflow: "hidden", opacity: "0.95" }}
                >
                  <Grid
                    container
                    spacing={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.item}
                  >
                    <RecipesList
                      rows={infoCards}
                      classes={classes}
                      search={false}
                      setSearchShow={setSearchShow}
                      setModalConfirmation={setModalConfirmation}
                      setAuxRecipe={setAuxRecipe}
                    />
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "& > :not(style)": {
                    m: 1,
                    width: "100%",
                    maxHeight: "550px",
                  },
                }}
              >
                <Paper
                  variant="outlined"
                  style={{ width: "95%", backgroundColor: "#e0e0e0",opacity: "0.97", }}
                >
                  <Box
                    sx={{
                      pl: 1,
                      pb: 1,
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Toolbar>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              fullWidth={!fw}
                              color="error"
                              onClick={() => setSearchShow(false)}
                              startIcon={<ArrowBackIosIcon />}
                              sx={{
                                flexGrow: 1,
                                marginRight: "auto",
                                marginTop: "5px",
                              }}
                            >
                              Cancelar
                            </Button>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={8.6}
                            md={5.6}
                            lg={4}
                            style={{ marginTop: "10px" }}
                          >
                            <TextField
                              fullWidth={!fw}
                              id="outlined-search-input"
                              label="Search"
                              autoComplete="off"
                              style={{
                                marginRight: "10px",
                              }}
                            />
                            <Button
                              variant="contained"
                              fullWidth={!fw}
                              onClick={handleChange}
                              style={{ marginRight: "10px", marginTop: "10px" }}
                              startIcon={<SearchIcon />}
                            >
                              Search
                            </Button>
                          </Grid>
                        </Grid>
                      </Toolbar>
                    </Box>
                  </Box>
                  <Paper
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      minHeight: "466px",
                      opacity: "0.95",
                    }}
                  >
                    <Grid
                      container
                      spacing={3}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      className={classes.item}
                    >
                      <RecipesList
                        rows={rows}
                        classes={classes}
                        search={true}
                        handleAddRecipe={handleAddRecipe}
                        recipesID={recipesID}
                      />
                    </Grid>
                  </Paper>
                </Paper>
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Modal
              open={modalConfirmation}
              onClose={() => setModalConfirmation(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Paper
                variant="outlined"
                style={{
                  position: "absolute",
                  maxWidth: 400,
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Icon
                      component={WarningIcon}
                      style={{ fontSize: 100 }}
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom align="center" variant="h4">
                      Confirmar eliminar plato.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom align="center" variant="body1">
                      ¿Estas seguro de querer eliminar este plato del menú?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth={true}
                      size="medium"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setModalConfirmation(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth={true}
                      size="medium"
                      variant="contained"
                      color="success"
                      onClick={handleDelete}
                    >
                      Confirmar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Modal>
          </Grid>

          <Grid item xs={12}>
            <Modal
              open={modalVegan}
              onClose={() => setModalVegan(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Paper
                variant="outlined"
                style={{
                  position: "absolute",
                  maxWidth: 400,
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Icon
                      component={WarningIcon}
                      style={{ fontSize: 100 }}
                      color="warning"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom align="center" variant="h4">
                      No se puede agregar este plato
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom align="center" variant="body1">
                      Tu menú debe estar conformado por dos platos veganos y dos
                      platos no veganos.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth={true}
                      size="medium"
                      variant="contained"
                      color="success"
                      onClick={() => setModalVegan(false)}
                    >
                      Aceptar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
