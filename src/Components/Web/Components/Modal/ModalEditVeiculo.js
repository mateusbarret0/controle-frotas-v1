import React, { useState, useEffect } from "react";
import ModalStyle from "../Modal/ModalStyle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { EDIT_VEICULOS } from "../../../../api";
import { toast } from "react-toastify";
import InputDate from "../Input/InputDate";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ModalEditVeiculo = ({ open, close, color, getVeiculos, data }) => {
  const [loading, setLoading] = useState(false);
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [dataProxManutencao, setDataProxManutencao] = useState("");
  const [dataUltManutencao, setDataUltManutencao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [motorista, setMotorista] = useState("");
  const [tipoVeiculo, setTipoVeiculo] = useState("");

  useEffect(() => {
    if (data) {
      setModelo(data.modelo);
      setPlaca(data.placa);
      setAno(data.ano);
      setCapacidade(data.capacidade);
      setDataProxManutencao(data.dt_prox_manu);
      setDataUltManutencao(data.dt_ultim_manu);
      setEmpresa(data.empresa);
      setMotorista(data.motorista);
      setTipoVeiculo(data.tipo_veiculo);
    }
  }, [data]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#121212",
        paper: "#192038",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#B0B0B0",
      },
    },
  });

  const editVeiculo = async () => {
    const { url, options } = EDIT_VEICULOS({
      modelo,
      placa,
      ano,
      capacidade,
      dataProxManutencao,
      dataUltManutencao,
      empresa,
      motorista,
      tipoVeiculo,
    });

    setLoading(true);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        toast.success("Veículo atualizado com sucesso!");
        getVeiculos();
        close();
      } else {
        toast.error("Erro ao atualizar o veículo");
        console.log("Erro ao atualizar o veículo:", json);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <ModalStyle
        loading={loading}
        open={open}
        close={close}
        title={
          <>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: "700",
                  color: "white",
                  mr: 42,
                }}
              >
                Editar veículo - {modelo}
              </Typography>

              <FormControl sx={{ width: 200 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "#FFFFFF" }}
                >
                  Tipo de Veículo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipoVeiculo}
                  onChange={(e) => setTipoVeiculo(e.target.value)}
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor: "#192038",
                    borderRadius: 3,
                  }}
                >
                  <MenuItem value="Van">Van</MenuItem>
                  <MenuItem value="Ônibus">Ônibus</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        }
        color={color}
        content={
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <Box sx={{ width: "100%", display: "flex", gap: 2, mb: 2 }}>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "50%",
                      fontSize: "1rem",
                    }}
                    id="modelo"
                    label="Modelo do veículo"
                    variant="outlined"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "25%",
                      fontSize: "1rem",
                    }}
                    id="placa"
                    label="Placa"
                    variant="outlined"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "25%",
                      fontSize: "1rem",
                    }}
                    id="ano"
                    label="Ano"
                    variant="outlined"
                    type="number"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  />
                </ThemeProvider>
              </Box>

              {/* Campos de capacidade e datas */}
              <Box sx={{ width: "100%", display: "flex", gap: 2, mb: 2 }}>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "33%",
                      fontSize: "1rem",
                    }}
                    id="capacidade"
                    label="Capacidade"
                    variant="outlined"
                    type="number"
                    value={capacidade}
                    onChange={(e) => setCapacidade(e.target.value)}
                  />
                  <InputDate
                    value={dataUltManutencao}
                    setValue={setDataUltManutencao}
                    label="Data da última manutenção"
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "33%",
                      fontSize: "1rem",
                    }}
                  />
                  <InputDate
                    value={dataProxManutencao}
                    setValue={setDataProxManutencao}
                    label="Data da próxima manutenção"
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "33%",
                      fontSize: "1rem",
                    }}
                  />
                </ThemeProvider>
              </Box>

              {/* Campos de empresa e motorista */}
              <Box sx={{ width: "100%", display: "flex", gap: 2, mb: 2 }}>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "50%",
                      fontSize: "1rem",
                    }}
                    id="empresa"
                    label="Empresa responsável"
                    variant="outlined"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "50%",
                      fontSize: "1rem",
                    }}
                    id="motorista"
                    label="Motorista responsável"
                    variant="outlined"
                    value={motorista}
                    onChange={(e) => setMotorista(e.target.value)}
                  />
                </ThemeProvider>
              </Box>
            </Box>
          </LocalizationProvider>
        }
        action={
          <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
            <Button
              sx={{
                textTransform: "none",
                color: "red",
                borderColor: "red",
                width: "50%",
                height: 40,
                "&:hover": {
                  color: "#e00000",
                  border: "2px solid #e00000",
                },
              }}
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={close}
            >
              CANCELAR
            </Button>

            <Button
              sx={{
                textTransform: "none",
                color: "green",
                borderColor: "green",
                width: "50%",
                height: 40,
                "&:hover": {
                  color: "#00c500",
                  border: "2px solid #00c500",
                },
              }}
              variant="outlined"
              startIcon={<CheckIcon />}
              onClick={editVeiculo}
            >
              EDITAR
            </Button>
          </Box>
        }
      />
    </Box>
  );
};

export default ModalEditVeiculo;
