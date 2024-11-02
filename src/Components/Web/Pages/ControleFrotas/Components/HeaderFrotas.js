import { Box, Button, Divider, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import ModalCadastroVeiculo from "../../../Components/Modal/ModalCadastroVeiculo";

const HeaderFrotas = ({ getVeiculos }) => {
  const [openCadastro, setOpenCadastro] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    setOpenCadastro(true);
  };

  const handleCloseModal = () => {
    setOpenCadastro(false);
  };

  useEffect(() => {
    getVeiculos(searchTerm);
  }, [searchTerm, getVeiculos]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#FFFFFF",
                fontSize: "15px",
              }}
            >
              <SearchIcon sx={{ marginRight: 1 }} />
              Insira o modelo, a placa ou o motorista do veículo.
            </Box>
          }
          variant="filled"
          sx={{
            backgroundColor: "#192038",
            borderRadius: 3,
            color: "#FFFFFF",
            width: "40%",
          }}
          InputProps={{
            style: {
              color: "#FFFFFF",
              fontSize: "15px",
            },
          }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          sx={{
            textTransform: "none",
            color: "#3366FF",
            borderColor: "#3366FF",
            width: "30%",
            height: 40,
            "&:hover": {
              color: "#FFFFFF",
              border: "2px solid #FFFFFF",
            },
          }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          CADASTRAR VEÍCULO
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <ModalCadastroVeiculo
        open={openCadastro}
        close={handleCloseModal}
        getVeiculos={getVeiculos}
      />
    </>
  );
};

export default HeaderFrotas;
