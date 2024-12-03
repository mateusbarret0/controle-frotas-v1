import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import dayjs from "dayjs";
import ModalMultCard from "./ModalMultCard";
import ModalAprovarRota from "./ModalAprovarRota";
import ModalReprovarRota from "./ModalReprovarRota";
import ModalObsRota from "./ModalObsRota";
import BoxStyleCard from "../Box/BoxStyleCard";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { GET_OBS_ROTAS } from "../../../../api";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const ModalRotas = ({ open, close, data, getRotas }) => {
  console.log("🚀 ~ ModalRotas ~ data:", data);
  const [openAprovar, setOpenAprovar] = useState(false);
  const [openReprovar, setOpenReprovar] = useState(false);
  const [openObs, setOpenObs] = useState(false);
  const [obs, setObs] = useState(false);
  const [directions, setDirections] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  console.log("🚀 - ModalRotas - startLocation:", startLocation);
  const [endLocation, setEndLocation] = useState(null);
  console.log("🚀 - ModalRotas - endLocation:", endLocation);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDBwpZs8ef-S4luuIvphLWNSSs5XCga_kc",
    libraries: ["geometry", "drawing"],
  });
  const openAprovarRota = () => setOpenAprovar(true);

  const closeAprovar = () => setOpenAprovar(false);

  const openReprovarRota = () => setOpenReprovar(true);

  const closeReprovar = () => setOpenReprovar(false);

  const openObsRota = () => setOpenObs(true);

  const closeObs = () => setOpenObs(false);

  const getObsRotas = async () => {
    const { url, options } = GET_OBS_ROTAS(data?.veiculo.placa, data?.COD_ROTA);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setObs(json);
      } else {
        console.log("Erro ao buscar veículos");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  const location = {
    lat: -23.55052,
    lng: -46.633308,
  };

  const getCoordinatesFromCEP = async (cep) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].geometry.location;
    }
    return null;
  };

  const fetchRoute = async () => {
    const start = await getCoordinatesFromCEP(data?.CEP_PARTIDA);
    const end = await getCoordinatesFromCEP(data?.CEP_CHEGADA);

    const waypoints = await Promise.all(
      data.paradas?.map(async (parada) => {
        const coords = await getCoordinatesFromCEP(parada.CEP);
        return coords ? { location: coords, stopover: true } : null;
      })
    ).then((res) => res.filter((wp) => wp !== null));

    if (start && end) {
      setStartLocation(start);
      setEndLocation(end);

      const directionsService = new window.google.maps.DirectionsService();
      const request = {
        origin: start,
        destination: end,
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Erro ao traçar a rota:", status);
        }
      });
    }
  };

  const calculateDistanceAndTime = async () => {
    const start = await getCoordinatesFromCEP(data?.CEP_PARTIDA);
    const end = await getCoordinatesFromCEP(data?.CEP_CHEGADA);

    if (start && end) {
      const distanceService = new window.google.maps.DistanceMatrixService();
      const request = {
        origins: [start],
        destinations: [end],
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      distanceService.getDistanceMatrix(request, (response, status) => {
        if (status === window.google.maps.DistanceMatrixStatus.OK) {
          const distance = response.rows[0].elements[0].distance.text;
          let duration = response.rows[0].elements[0].duration.text;

          duration = duration
            .replace("min", "minuto")
            .replace("hour", "hora")
            .replace("hours", "horas");

          console.log("Distância:", distance);
          console.log("Tempo estimado:", duration);

          setDistance(distance);
          setDuration(duration);
        } else {
          console.error("Erro ao calcular a distância e o tempo:", status);
        }
      });
    }
  };

  useEffect(() => {
    if (open) {
      setDirections(null);
      fetchRoute();
      calculateDistanceAndTime();
    }
  }, [open]);

  return (
    <>
      {open && (
        <ModalMultCard
          open={open}
          close={close}
          sx={{
            flexDirection: "column",
            width: "100vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <BoxStyleCard sx={{ flex: 1, minWidth: "30%" }}>
              <Typography variant="h4" sx={{ mb: 2, color: "#FFFFFF" }}>
                Informações de Partida
              </Typography>
              <Divider sx={{ mb: 1, backgroundColor: "#FFFFFF", height: 2 }} />
              <Box sx={{ textAlign: "left" }}>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  CEP: {data?.CEP_PARTIDA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Número: {data?.NUMERO_PARTIDA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Rua: {data?.RUA_PARTIDA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Bairro: {data?.BAIRRO_PARTIDA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Cidade: {data?.CIDADE_PARTIDA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Estado: {data?.ESTADO_PARTIDA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Data e Hora:{" "}
                  {dayjs(data?.DATA_HORA_INICIO).format("DD/MM/YYYY - HH:mm")}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Complemento: {data?.COMPLEMENTO_PARTIDA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Descrição: {data?.DESCRICAO_PARTIDA}
                </Typography>
              </Box>
            </BoxStyleCard>

            <BoxStyleCard sx={{ flex: 1, minWidth: "30%" }}>
              <Typography variant="h4" sx={{ mb: 2, color: "#FFFFFF" }}>
                Informações de Chegada
              </Typography>
              <Divider sx={{ mb: 1, backgroundColor: "#FFFFFF", height: 2 }} />
              <Box sx={{ textAlign: "left" }}>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  CEP: {data?.CEP_CHEGADA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Número: {data?.NUMERO_CHEGADA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Rua: {data?.RUA_CHEGADA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Bairro: {data?.BAIRRO_CHEGADA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Cidade: {data?.CIDADE_CHEGADA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Estado: {data?.ESTADO_CHEGADA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Data e Hora:{" "}
                  {dayjs(data?.DATA_HORA_CHEGADA).format("DD/MM/YYYY - HH:mm")}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Complemento: {data?.COMPLEMENTO_CHEGADA}
                </Typography>
                <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                  Descrição: {data?.DESCRICAO_CHEGADA}
                </Typography>
              </Box>
            </BoxStyleCard>

            <BoxStyleCard sx={{ flex: 1, minWidth: "30%" }}>
              <Typography variant="h4" sx={{ mb: 2, color: "#FFFFFF" }}>
                Paradas:
              </Typography>
              <Divider sx={{ mb: 1, backgroundColor: "#FFFFFF", height: 2 }} />
              {data.paradas?.map((item, index) => (
                <Box sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                    Parada: {item.COD_PARADA}
                  </Typography>
                  <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                    CEP Parada {item.COD_PARADA}: {item.CEP}
                  </Typography>
                  <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                    Número: {item.COD_PARADA}
                  </Typography>
                  <Divider sx={{ mb: 1, mt: 1, backgroundColor: "#FFFFFF" }} />
                </Box>
              ))}
            </BoxStyleCard>
          </Box>

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={startLocation || location}
              zoom={10}
            >
              {startLocation && <Marker position={startLocation} />}
              {endLocation && <Marker position={endLocation} />}
              {data.paradas?.map((parada, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(parada.latitude),
                    lng: parseFloat(parada.longitude),
                  }}
                />
              ))}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          )}
          <Box>
            <BoxStyleCard
              sx={{
                flex: 1,
                minWidth: "30%",
                display: "flex",
                flexDirection: "column",
                px: 4,
                py: 2.5,
                gap: 2,
                height: "100%",
              }}
            >
              <Divider sx={{ backgroundColor: "#FFFFFF", height: 2 }} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "rows",
                  gap: 2,
                }}
              >
                <Button
                  sx={{
                    textTransform: "none",
                    color: "red",
                    borderColor: "red",
                    width: "100%",
                    height: 40,
                    "&:hover": {
                      color: "#e00000",
                      border: "2px solid #e00000",
                    },
                  }}
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={openReprovarRota}
                >
                  REPROVAR ROTA
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "green",
                    borderColor: "green",
                    width: "100%",
                    height: 40,
                    "&:hover": {
                      color: "#00c500",
                      border: "2px solid #00c500",
                    },
                  }}
                  variant="outlined"
                  startIcon={<CheckIcon />}
                  onClick={openAprovarRota}
                >
                  APROVAR ROTA
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#3366FF",
                    borderColor: "#3366FF",
                    width: "100%",
                    height: 40,
                    "&:hover": {
                      color: "#00ABFF",
                      border: "2px solid #00ABFF",
                    },
                  }}
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={openObsRota}
                >
                  ADICIONAR OBSERVAÇÕES
                </Button>
              </Box>
              <Divider sx={{ backgroundColor: "#FFFFFF", height: 2 }} />
            </BoxStyleCard>
          </Box>
        </ModalMultCard>
      )}

      <ModalAprovarRota
        open={openAprovar}
        close={closeAprovar}
        data={data}
        getRotas={getRotas}
      />
      <ModalReprovarRota
        open={openReprovar}
        close={closeReprovar}
        data={data}
        getRotas={getRotas}
      />
      <ModalObsRota
        open={openObs}
        close={closeObs}
        data={data}
        getObsRotas={getObsRotas}
        obs={obs}
      />
    </>
  );
};

export default ModalRotas;
