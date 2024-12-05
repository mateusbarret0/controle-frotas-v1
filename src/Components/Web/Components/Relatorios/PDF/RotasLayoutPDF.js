import { useState } from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { StyleSheet, Font, PDFViewer } from "@react-pdf/renderer";
import { Box, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ModalTitlePDF from "./ModalTitlePDF";
import dayjs from "dayjs";
import { GET_RELATORIO_ROTAS } from "../../../../../api";

const RelatorioRotasLayoutPDF = ({ cod_veiculo }) => {
  const [documentGenerated, setDocumentGenerated] = useState(false);
  const [data, setData] = useState([]);

  const handlePrint = async () => {
    const { url, options } = GET_RELATORIO_ROTAS(cod_veiculo);
    const response = await fetch(url, options);
    if (response.ok) {
      const json = await response.json();
      if (json) {
        setData(json);
        setDocumentGenerated(true);
      }
    }
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Poppins",
      backgroundColor: "#fff",
      color: "#000000",
      fontSize: "8px",
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 25,
    },
    break: {
      maxWidth: 250,
    },
    headerOrca: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingBottom: 2,
    },
    title: {
      fontSize: 12,
    },
    text: {
      fontSize: 8,
    },
    smallText: {
      fontSize: 7,
      textAlign: "right",
    },
    divider: {
      borderBottom: "1px #000 solid",
    },
    container: {
      padding: "10px 0px",
    },
    dadosNota: {
      display: "flex",
      flexDirection: "row",
    },
    viewer: {
      width: "100%",
      height: "100%",
    },
    table: {
      display: "table",
      width: "auto",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "12.5%",
    },
    tableCell: {
      marginTop: 5,
      fontSize: 8,
      textAlign: "center",
    },
    boxImage: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    image: {
      width: "40%",
    },
    sectionTitle: {
      fontSize: 10,
      marginTop: 10,
      marginBottom: 5,
    },
    field: {
      fontSize: 8,
      marginBottom: 5,
    },
  });

  const MyDocument = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.headerOrca}>
            <Text style={styles.title}>Relatório de Rotas</Text>
            <View>
              <Text style={styles.smallText}>
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "medium",
                }).format(new Date())}
              </Text>
              <Text
                style={styles.smallText}
                render={({ pageNumber }) => `Página ${pageNumber}`}
              />
            </View>
          </View>
          <View style={styles.divider} />
          {/* <Box> */}
          {/* <View style={styles.tableRow}> */}
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Veículo</Text>
            <Text style={styles.field}>Placa: {data[0]?.placa}</Text>
            <Text style={styles.field}>Modelo: {data[0]?.modelo}</Text>
            <Text style={styles.field}>Empresa: {data[0]?.empresa}</Text>
            {/* <Text style={styles.field}>
              Data: {new Date().toLocaleDateString()}
            </Text> */}
          </View>

          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Motorista</Text>
            <Text style={styles.field}>Nome: {data[0]?.motorista}</Text>
            <Text style={styles.field}>CPF: {data[0]?.cpf}</Text>
            <Text style={styles.field}>E-mail: {data[0]?.email}</Text>
          </View>
          {/* </View> */}
          {/* </Box> */}
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Viagens</Text>
            <View style={styles.tableRow}>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Cód Rota</Text>
              </View>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Hora Partida</Text>
              </View>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Hora Chegada</Text>
              </View>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Tempo gasto</Text>
              </View>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Km Inicial</Text>
              </View>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Km Final</Text>
              </View>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Total Km</Text>
              </View>
              <View style={{ width: "12%" }}>
                <Text style={styles.tableCell}>Qtd. Pessoas</Text>
              </View>
            </View>

            {data.map((viagem, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>{viagem.cod_rota}</Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>
                    {dayjs(viagem.data_hora_partida).format("HH:mm")}
                  </Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>
                    {dayjs(viagem.data_hora_chegada).format("HH:mm")}
                  </Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>
                    {dayjs(viagem.data_hora_chegada).diff(
                      dayjs(viagem.data_hora_partida),
                      "hour"
                    )}{" "}
                    horas
                  </Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>100 km</Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>150 km</Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>50 km</Text>
                </View>
                <View style={{ width: "12%" }}>
                  <Text style={styles.tableCell}>60 pessoas</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Serviço Executado</Text>
            <Text style={styles.field}>
              {data[0]?.servicoExecutado ||
                "Descrição do serviço não disponível."}
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <Text style={styles.field}>
              {data[0]?.observacoes || "Nenhuma observação disponível."}
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Assinaturas</Text>
            <Text style={styles.field}>_______________________________</Text>
            <Text style={styles.field}>Motorista</Text>
            <Text style={styles.field}>_______________________________</Text>
            <Text style={styles.field}>Responsável</Text>
          </View>
        </Page>
      </Document>
    );
  };

  Font.register({
    family: "Poppins",
    src: "https://grupocimcal.net.br/img-ecommerce/Poppins-Regular.ttf",
  });

  return (
    <>
      {!documentGenerated ? (
        <Button
          onClick={handlePrint}
          variant="outlined"
          startIcon={<PictureAsPdfIcon sx={{ fontSize: "1.5vw" }} />}
          sx={{
            fontSize: 15,
            textTransform: "none",
            color: "#e30809",
            height: 40,
            borderColor: "#e30809",
            "&:hover": {
              color: "#FFFFFF",
              border: "2px solid #FFFFFF",
            },
          }}
        >
          Gerar Relatório PDF
        </Button>
      ) : (
        <ModalTitlePDF
          open={documentGenerated}
          close={() => setDocumentGenerated(false)}
          title="Relatório de Rotas"
          content={
            <Box sx={{ width: "70vw", height: 670 }}>
              <PDFViewer style={styles.viewer}>
                <MyDocument />
              </PDFViewer>
            </Box>
          }
        />
      )}
    </>
  );
};

export default RelatorioRotasLayoutPDF;
