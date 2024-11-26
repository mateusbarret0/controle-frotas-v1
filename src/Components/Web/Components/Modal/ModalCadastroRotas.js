import React, { useState } from "react";
import ModalStyle from "../Modal/ModalStyle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Divider, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CREATE_ROTAS, GET_CEP } from "../../../../api";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ModalCadastroVeiculo = ({ open, close, color, getRotas, veiculo }) => {
  const [loading, setLoading] = useState(false);
  const [cepPartida, setCepPartida] = useState("");
  const [cepChegada, setCepChegada] = useState("");
  const [numeroPartida, setNumeroPartida] = useState("");
  const [numeroChegada, setNumeroChegada] = useState("");
  const [descricaoPartida, setDescricaoPartida] = useState("");
  const [descricaoChegada, setDescricaoChegada] = useState("");
  const [complementoPartida, setComplementoPartida] = useState("");
  const [complementoChegada, setComplementoChegada] = useState("");
  const [enderecoPartida, setEnderecoPartida] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [enderecoChegada, setEnderecoChegada] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

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

  const clearFields = () => {
    setCepPartida("");
    setCepChegada("");
    setNumeroPartida("");
    setNumeroChegada("");
    setDescricaoPartida("");
    setDescricaoChegada("");
    setComplementoPartida("");
    setComplementoChegada("");
    setEnderecoPartida({ rua: "", bairro: "", cidade: "", estado: "" });
    setEnderecoChegada({ rua: "", bairro: "", cidade: "", estado: "" });
  };

  const fetchEndereco = async (cep, setEndereco) => {
    const { url, options } = GET_CEP(cep);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setEndereco({
          rua: json.logradouro,
          bairro: json.bairro,
          cidade: json.localidade,
          estado: json.uf,
        });
        console.log("🚀 - fetchEndereco - json:", json);
      } else {
        toast.error("CEP inválido");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const handleCepChange = (cep, setCep, setEndereco) => {
    setCep(cep);
    if (cep.length === 8) {
      fetchEndereco(cep, setEndereco);
    }
  };

  const createRota = async () => {
    if (!cepPartida || !cepChegada || !numeroPartida || !numeroChegada) {
      console.log("Por favor, preencha todos os campos obrigatórios!");
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const { url, options } = CREATE_ROTAS({
      veiculo,
      cepPartida,
      cepChegada,
      numeroPartida,
      numeroChegada,
      descricaoPartida,
      descricaoChegada,
      complementoPartida,
      complementoChegada,
      enderecoPartida,
      enderecoChegada,
    });

    setLoading(true);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        getRotas();
        clearFields();
        close();
      } else {
        toast.error("Erro ao cadastrar o veículo");
        console.log("Erro ao cadastrar o veículo:", json);
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
        sx={{ width: "45%" }}
        title={
          <Typography sx={{ fontSize: 25, fontWeight: "700", color: "white" }}>
            Cadastrar Rota
          </Typography>
        }
        color={color}
        content={
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <ThemeProvider theme={darkTheme}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "white",
                    mb: 2,
                  }}
                >
                  Local de Partida:
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="CEP:"
                    variant="outlined"
                    value={cepPartida}
                    onChange={(e) =>
                      handleCepChange(
                        e.target.value,
                        setCepPartida,
                        setEnderecoPartida
                      )
                    }
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Número:"
                    variant="outlined"
                    value={numeroPartida}
                    onChange={(e) => setNumeroPartida(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="Rua:"
                    variant="outlined"
                    value={enderecoPartida.rua}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Bairro:"
                    variant="outlined"
                    value={enderecoPartida.bairro}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="Cidade:"
                    variant="outlined"
                    value={enderecoPartida.cidade}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Estado:"
                    variant="outlined"
                    value={enderecoPartida.estado}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="Descrição:"
                    variant="outlined"
                    value={descricaoPartida}
                    onChange={(e) => setDescricaoPartida(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Complemento:"
                    variant="outlined"
                    value={complementoPartida}
                    onChange={(e) => setComplementoPartida(e.target.value)}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "white",
                    mb: 2,
                  }}
                >
                  Local de Chegada:
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="CEP:"
                    variant="outlined"
                    value={cepChegada}
                    onChange={(e) =>
                      handleCepChange(
                        e.target.value,
                        setCepChegada,
                        setEnderecoChegada
                      )
                    }
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Número:"
                    variant="outlined"
                    value={numeroChegada}
                    onChange={(e) => setNumeroChegada(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="Rua:"
                    variant="outlined"
                    value={enderecoChegada.rua}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Bairro:"
                    variant="outlined"
                    value={enderecoChegada.bairro}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="Cidade:"
                    variant="outlined"
                    value={enderecoChegada.cidade}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Estado:"
                    variant="outlined"
                    value={enderecoChegada.estado}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "60%",
                    }}
                    label="Descrição:"
                    variant="outlined"
                    value={descricaoChegada}
                    onChange={(e) => setDescricaoChegada(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: "#192038",
                      borderRadius: 3,
                      width: "40%",
                    }}
                    label="Complemento:"
                    variant="outlined"
                    value={complementoChegada}
                    onChange={(e) => setComplementoChegada(e.target.value)}
                  />
                </Box>
              </ThemeProvider>
            </Box>
          </LocalizationProvider>
        }
        action={
          <>
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
                onClick={createRota}
              >
                CADASTRAR
              </Button>
            </Box>
          </>
        }
      />
    </Box>
  );
};

export default ModalCadastroVeiculo;
