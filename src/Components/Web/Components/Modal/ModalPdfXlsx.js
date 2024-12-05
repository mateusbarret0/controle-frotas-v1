import { Box, Button, FormControl } from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";
import ModalStyle from "./ModalStyle";
import RotasLayoutPDF from "../Relatorios/PDF/RotasLayoutPDF";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { GET_RELATORIO_ROTAS } from "../../../../api";
import { toast } from "react-toastify";

const ModalPdfXlsx = ({ open, close, cod_veiculo, color = "detail4" }) => {
  const handleGenerateExcel = async () => {
    try {
      const { url, options } = GET_RELATORIO_ROTAS(cod_veiculo);
      const response = await fetch(url, options);

      if (!response.ok) {
        toast.error("Erro ao buscar os dados do relatório. Tente novamente.");
        return;
      }

      const data = await response.json();
      console.log("🚀 ~ handleGenerateExcel ~ data:", data);

      if (data.length === 0) {
        toast.error("Nenhum dado retornado para o relatório.");
        return;
      }

      const formattedData = data.map((item) => ({
        "Código da Rota": item.cod_rota,
        "Data e Hora de Início": item.data_hora_partida,
        "Data e Hora de Chegada": item.data_hora_chegada,
        "Tempo gasto": dayjs(item.data_hora_chegada).diff(
          dayjs(item.data_hora_partida),
          "hour"
        ),
        "Km Inicial": "100 Km",
        "Km Final": "150 Km",
        "Total Km": "50 Km",
        "Qtd. Pessoas": "60",
        "Modelo do Veículo": item.modelo,
        "Placa do Veículo": item.placa,
        Empresa: item.empresa,
        "Nome do Motorista": item.motorista,
        "CPF do Motorista": item.cpf,
        "E-mail do Motorista": item.email,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório de Rotas");

      const today = dayjs().format("YYYY-MM-DD");
      const fileName = `relatorio_rotas_${today}.xls`;
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      toast.error("Erro ao gerar o relatório:", error);
    }
  };

  return (
    <ModalStyle
      open={open}
      close={close}
      title="Gerar relatório de rotas"
      color={color}
      content={
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <RotasLayoutPDF cod_veiculo={cod_veiculo} />
            <Button
              onClick={handleGenerateExcel}
              variant="outlined"
              startIcon={<TableViewIcon sx={{ fontSize: "1.5vw" }} />}
              sx={{
                mt: 2,
                fontSize: 15,
                textTransform: "none",
                color: "#2d7930",
                height: 40,
                borderColor: "#2d7930",
                "&:hover": {
                  color: "#FFFFFF",
                  border: "2px solid #FFFFFF",
                },
              }}
            >
              Gerar Relatório EXCEL
            </Button>
          </FormControl>
        </Box>
      }
      action={<></>}
    />
  );
};

export default ModalPdfXlsx;
