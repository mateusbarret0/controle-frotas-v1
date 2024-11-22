import { useState } from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';
import { Box, Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { GET_DEVOLUCAO } from '../Services/cred';
import ModalTitlePDF from './ModalTitlePDF';

const RelatorioCredDev = ({ codcli }) => {
  const [documentGenerated, setDocumentGenerated] = useState(false);
  const [credDev, setCredDev] = useState([]);
  console.log('🚀 - RelatorioCrsedDev - credDev:', credDev);

  // const handlePrint = async () => {
  //   const { url, options } = GET_DEVOLUCAO(codcli);
  //   const response = await fetch(url, options);
  //   if (response.ok) {
  //     const json = await response.json();
  //     if (json) {
  //       setCredDev(json);
  //       setDocumentGenerated(true);
  //     }
  //   }
  // };
  const handlePrint = () => {
    setDocumentGenerated(true);
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Poppins',
      backgroundColor: '#fff',
      color: '#000000',
      fontSize: '8px',
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 25,
    },
    break: {
      maxWidth: 250,
    },
    headerOrca: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
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
      textAlign: 'right',
    },
    divider: {
      borderBottom: '1px #000 solid',
    },
    container: {
      padding: '10px 0px',
    },
    dadosNota: {
      display: 'flex',
      flexDirection: 'row',
    },
    viewer: {
      width: '100%',
      height: '100%',
    },
    table: {
      display: 'table',
      width: 'auto',
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '12.5%',
    },
    tableCell: {
      marginTop: 5,
      fontSize: 8,
    },
    boxImage: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      width: '40%',
    },
  });

  const formatCurrency = (value) => {
    let formated = parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formated;
  };

  const MyDocument = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.headerOrca}>
            <Text style={styles.title}>Relatório de Rotas</Text>
            <View>
              <Text style={styles.smallText}>
                {new Intl.DateTimeFormat('pt-BR', {
                  dateStyle: 'short',
                  timeStyle: 'medium',
                }).format(new Date())}
              </Text>
              <Text
                style={styles.smallText}
                render={({ pageNumber }) => `Pagina ${pageNumber}`}
              />
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.divider} />
          <View
            style={{
              ...styles.container,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCell}>hora partida</Text>
                </View>
                <View style={{ width: '7%' }}>
                  <Text style={styles.tableCell}>hora chegada</Text>
                </View>
                <View style={{ width: '9%', textAlign: 'center' }}>
                  <Text style={styles.tableCell}>total de horas</Text>
                </View>
                <View style={{ width: '12%' }}>
                  <Text style={styles.tableCell}>km inicial</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCell}>km final</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCell}>total km</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCell}>qt pessoas</Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Text style={styles.tableCell}>placa</Text>
                </View>
              </View>
              {credDev.map((data) => (
                <View style={styles.tableRow}>
                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>{data.DTLANC}</Text>
                  </View>
                  <View style={{ width: '7%' }}>
                    <Text style={styles.tableCell}>{data.NUMNOTA}</Text>
                  </View>
                  <View style={{ width: '9%', textAlign: 'center' }}>
                    <Text style={styles.tableCell}>{data.ORIGEM}</Text>
                  </View>
                  <View style={{ width: '12%' }}>
                    <Text style={styles.tableCell}>
                      {data.NUMTRANSVENDADESC}
                    </Text>
                  </View>

                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>{data.DTDESCONTO}</Text>
                  </View>

                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>
                      {data.VALOR && formatCurrency(data.VALOR)}
                    </Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>
                      {data.VLTOTAL && formatCurrency(data.VLTOTAL)}
                    </Text>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Text style={styles.tableCell}>{data.HISTORICO}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  Font.register({
    family: 'Poppins',
    src: 'https://grupocimcal.net.br/img-ecommerce/Poppins-Regular.ttf',
  });

  return (
    <>
      {!documentGenerated ? (
        <Button
          onClick={handlePrint}
          variant="outlined"
          custom="reverse"
          startIcon={<PictureAsPdfIcon sx={{ fontSize: '1.5vw' }} />}
        >
          Gerar Relatório
        </Button>
      ) : (
        <ModalTitlePDF
          open={documentGenerated}
          close={() => setDocumentGenerated(false)}
          title="Relatório de Rotas"
          content={
            <Box sx={{ width: '70vw', height: 670 }}>
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

export default RelatorioCredDev;
