import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
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

  const handleConfirmDelete = (e) => {
    console.log(e.target.id);
    setModalConfirmation(true);
    setAuxRecipe(e.target.id);
  };

  return (
    <List className={classes.listclass}>
      {rows.length > 0 &&
        rows.map((row, index) => {
          // console.log(!recipesID.includes(row.id.toString()),row, "ASDAS")
          if (!search || !recipesID.includes(row.id.toString())) {
            return (
              <div key={index}>
                <ListItem
                  style={{ backgroundColor: row.vegan ? "#c8e6c9" : "#b3e5fc" }}
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
                                    Vegatariano: {row.vegetarian ? "Si" : "No"}
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
                        justifyContent: "space-around",
                        width: "100%",
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
                        value={[
                          row.data.price,
                          row.data.time,
                          row.data.healthScore,
                        ]}
                        // onClick={}
                        className={classes.buttondelete}
                        startIcon={<InfoIcon />}
                      >
                        Detalles
                      </Button>
                      <Button
                        id={row.id}
                        variant="contained"
                        onClick={search ? handleAddRecipe : handleConfirmDelete}
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
              <Grid item xs={12} md={4} style={{ marginLeft: "30px" }}>
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
      {!search && rows.length < 6 && (
        <ListItem>
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
      )}
    </List>
  );
}

export default RecipesList;
