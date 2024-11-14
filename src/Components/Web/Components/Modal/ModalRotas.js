import { React, useEffect, useState } from "react";
import ModalStyle from "../Modal/ModalStyle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
} from "@mui/material";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import teste from "../../../../Assets/imgteste.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

const ModalRotas = ({ open, close, color, data }) => {
  // console.log("🚀 ~ ModalRotas ~ data:", data);
  const [novidades, setNovidades] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <ModalStyle
        loading={loading}
        open={open}
        close={close}
        title={
          <>
            <Typography
              sx={{
                fontSize: 25,
                pt: 0,
                pb: 0,
                fontWeight: "700",
                color: "#FFFFFF",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Rota {data?.ID} - {data?.veiculo?.modelo} / {data?.veiculo?.placa}
            </Typography>
          </>
        }
        color={color}
        content={
          <>
            <Box
              sx={{
                width: "55vw",
                height: "55vh",
                backgroundColor: "#222b45",
                color: "#FFFFFF",
                borderRadius: 2,
                padding: 2,
                "& li": {
                  listStyle: "inside !important",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginX: 8,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    m: 0,
                  }}
                >
                  <Accordion
                    defaultExpanded
                    sx={{
                      backgroundColor: "#1a2035",
                      color: "#FFFFFF",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
                    >
                      <Typography variant="h5">
                        Informações de Partida
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box sx={{ width: "50%", textAlign: "left" }}>
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
                      </Box>
                      <Box sx={{ width: "50%", textAlign: "left" }}>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Cidade: {data?.CIDADE_PARTIDA}
                        </Typography>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Estado: {data?.ESTADO_PARTIDA}
                        </Typography>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Data e Hora:{" "}
                          {dayjs(data?.DATA_HORA_PARTIDA).format(
                            "DD/MM/YYYY - HH:mm"
                          )}
                        </Typography>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Complemento: {data?.COMPLEMENTO_PARTIDA}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Descrição: {data?.DESCRICAO_PARTIDA}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    defaultExpanded
                    sx={{
                      backgroundColor: "#1a2035",
                      color: "#FFFFFF",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
                    >
                      <Typography variant="h5">
                        Informações de Chegada
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box sx={{ width: "50%", textAlign: "left" }}>
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
                      </Box>
                      <Box sx={{ width: "50%", textAlign: "left" }}>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Cidade: {data?.CIDADE_CHEGADA}
                        </Typography>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Estado: {data?.ESTADO_CHEGADA}
                        </Typography>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Data e Hora:{" "}
                          {dayjs(data?.DATA_HORA_CHEGADA).format(
                            "DD/MM/YYYY - HH:mm"
                          )}
                        </Typography>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Complemento: {data?.COMPLEMENTO_CHEGADA}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Typography sx={{ fontSize: 18, color: "#FFFFFF" }}>
                          Descrição: {data?.DESCRICAO_CHEGADA}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            </Box>
          </>
        }
        action={<></>}
      />
    </Box>
  );
};

export default ModalRotas;
