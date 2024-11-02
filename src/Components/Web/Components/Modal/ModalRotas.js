import { React, useEffect, useState } from "react";
import ModalStyle from "../Modal/ModalStyle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider, IconButton } from "@mui/material";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import teste from "../../../../Assets/imgteste.png";

const ModalUser = ({ open, close, color }) => {
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
              Rota 1 - Chevrolet Astra - ABC1234
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
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: "#FFFFFF",
                      }}
                    >
                      Local Partida: Divinópolis - MG
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: "#FFFFFF",
                      }}
                    >
                      Data Partida: 01/09/2024
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: "#FFFFFF",
                      }}
                    >
                      Horário Partida: 12:30
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: "#FFFFFF",
                      }}
                    >
                      Local Chegada: Belo Horizonte - MG
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: "#FFFFFF",
                      }}
                    >
                      Data Chegada: 01/09/2024
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: "#FFFFFF",
                      }}
                    >
                      Horário Chegada: 14:30
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "40vh",
                  overflow: "hidden",
                }}
              >
                <img
                  src={teste}
                  alt="Descrição da Imagem"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </>
        }
        action={<></>}
      />
    </Box>
  );
};

export default ModalUser;
