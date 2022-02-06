import {
  Backdrop,
  Button,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  Modal,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/system";

function RecipesList(props) {
  const {
    rows,
    classes,
    search,
    setSearchShow,
    handleAddRecipe,
    setModalConfirmation,
    setAuxRecipe,
    recipesID,
  } = props;

  const [modalViewDetails, setModalViewDetails] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState({});

  const handleConfirmDelete = (id) => {
    console.log(id)
    setModalConfirmation(true);
    setAuxRecipe(id);
  };

  const handleViewDetails = (details) => {
    console.log(details);
    setRecipeDetails(details);
    setModalViewDetails(true);
  };

  return (
    <>
      <List className={classes.listclass}>
        {console.log(rows)}
        {rows.length > 0 &&
          rows.map((row, index) => {
            if (!search || !recipesID.includes(row.id)) {
              return (
                <div key={index}>
                  <ListItem
                    style={{
                      backgroundColor: row.vegan ? "#c8e6c9" : "#b3e5fc",
                      minHeight:"230px"
                    }}
                  >
                    <Grid
                      spacing={3}
                      container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Grid item xs={12} md={4} style={{ marginLeft: "30px" }}>
                        <Grid
                          spacing={2}
                          container
                          direction="column"
                          justifyContent="space-around"
                        >
                          <Grid item xs={12}>
                            <Typography variant="body" />
                            <b>Nombre:</b> {search ? row.title : row.name}
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body">
                              <b>Caracteristicas:</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid
                              container
                              spacing={3}
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Grid item xs={6}>
                                <Grid
                                  container
                                  spacing={1}
                                  direction="column"
                                  justifyContent="space-between"
                                  alignItems="flex-start"
                                >
                                  <Grid item xs={12}>
                                    <Typography variant="body">
                                      Vegano: {row.vegan ? "Si" : "No"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body">
                                      Libre de Gluten:{" "}
                                      {row.glutenFree ? "Si" : "No"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body">
                                      Libre de Lacteos:{" "}
                                      {row.dairyFree ? "Si" : "No"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={6}>
                                <Grid
                                  container
                                  spacing={2}
                                  direction="column"
                                  justifyContent="flex-start"
                                  alignItems="flex-start"
                                >
                                  <Grid item xs={12}>
                                    <Typography variant="body">
                                      Vegatariano:{" "}
                                      {row.vegetarian ? "Si" : "No"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body">
                                      Muy Saludable:{" "}
                                      {row.veryHealthy ? "Si" : "No"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          width: "100%",
                          marginLeft:"25px"
                        }}
                      >
                        <img src={row.image} />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={10}
                        md={3}
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          justifyContent: "space-around",
                          height: "150px",
                        }}
                      >
                        <Button
                          variant="contained"
                          // value={search ? [
                          //   row.data.price,
                          //   row.data.time,
                          //   row.data.healthScore,
                          // ] : [
                          //   row.pricePerServing,
                          //   row.readyInMinutes,
                          //   row.healthScore,
                          // ]}
                          onClick={() => {
                            handleViewDetails(
                              search
                                ? {
                                    price: row.pricePerServing,
                                    time: row.readyInMinutes,
                                    healthScore: row.healthScore,
                                  }
                                : {
                                    price: row.data.price,
                                    time: row.data.time,
                                    healthScore: row.data.healthScore,
                                  }
                            );
                          }}
                          className={classes.buttondelete}
                          startIcon={<InfoIcon />}
                        >
                          Detalles
                        </Button>
                        <Button
                          id={row.id}
                          variant="contained"
                          onClick={() =>
                            search ? handleAddRecipe(row.id) : handleConfirmDelete(row.id)
                          }
                          //la variable es para abrir el modal
                          className={classes.buttondelete}
                          startIcon={search ? <AddIcon /> : <DeleteIcon />}
                          color={search ? "success" : "error"}
                        >
                          {search ? "Agregar" : "Eliminar"}
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              );
            }
          })}
        {search && rows.length === 0 && (
          <div>
            <ListItem>
              <Grid
                spacing={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} md={4}>
                  <Grid
                    spacing={2}
                    container
                    direction="column"
                    justifyContent="space-around"
                  >
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body">
                        <Skeleton />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Skeleton
                    sx={{ height: 220 }}
                    animation="wave"
                    variant="rectangular"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={10}
                  md={3}
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    height: "150px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        sx={{ height: 40 }}
                        animation="wave"
                        variant="rectangular"
                      />
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        sx={{ height: 40 }}
                        animation="wave"
                        variant="rectangular"
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid
                spacing={3}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xs={12} md={4} >
                  <Grid
                    spacing={2}
                    container
                    direction="column"
                    justifyContent="space-around"
                  >
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body">
                        <Skeleton />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Skeleton
                    sx={{ height: 220 }}
                    animation="wave"
                    variant="rectangular"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={10}
                  md={3}
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    height: "150px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        sx={{ height: 40 }}
                        animation="wave"
                        variant="rectangular"
                      />
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        sx={{ height: 40 }}
                        animation="wave"
                        variant="rectangular"
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          </div>
        )}
        {!search && rows.length < 4 && (
          <div>
          <ListItem>
            <Grid
              spacing={3}
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item xs={12} md={4} sx={{ display: { xs: 'none', sm:'none', md: 'block' } }} >
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{ marginLeft: "30px" }}
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                  <Grid
                    spacing={2}
                    container
                    direction="column"
                    justifyContent="space-around"
                  >
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body">
                        <Skeleton />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body">
                        <Skeleton />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: { xs: 'none', sm:'none', md: 'block' } }}

              >
                <Skeleton
                  sx={{ height: 250 }}
                  animation="wave"
                  variant="rectangular"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={10}
                md={3}
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-around",
                  height: "150px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    height: "150px",
                    marginTop: "20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign:"center",
                      marginTop:"50px"
                    }}
                    >
                      Agrega un nuevo Plato
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      pl: 1,
                      pb: 1,
                      marginTop: "10px",
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      size="large"
                      style={{ fontSize: 100 }}
                    >
                      <AddCircleIcon
                        fontSize="inherit"
                        onClick={() => {
                          setSearchShow(true);
                        }}
                      />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          </div>
        )}
      </List>

      <Grid item xs={12}>
        <Modal
          open={modalViewDetails}
          onClose={() => setModalViewDetails(false)}
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
                  component={InfoIcon}
                  style={{ fontSize: 100 }}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom align="center" variant="h4">
                  Detalles del plato:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom align="center" variant="body1">
                  Precio: {recipeDetails.price}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom align="center" variant="body1">
                  Tiempo de preparación: {recipeDetails.time}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom align="center" variant="body1">
                  HealthScore: {recipeDetails.healthScore}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth={true}
                  size="medium"
                  variant="contained"
                  color="success"
                  onClick={() => setModalViewDetails(false)}
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      </Grid>
    </>
  );
}

export default RecipesList;
