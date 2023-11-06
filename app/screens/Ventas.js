import React, { useEffect, useState } from "react";
import { openDatabase } from '../data/db';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const Ventas = ({ navigation, route }) => {
    const db = openDatabase();
    const vendedor = route.params?.vendedor || "000";
    const [ventas, setVentas] = useState([]);
    const tableHead = ['ID', 'Cliente', 'Fecha', 'Total', 'Forma de Pago', 'Vendedor'];
    const tableData = [];

    function formatFecha(fecha) {
        const date = new Date(fecha);
        return date.toLocaleDateString();
    }

    function traerVentas() {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM ventas WHERE vendedor = ?',
                [vendedor],
                (_, { rows }) => {
                    const ventas = rows._array;
                    setVentas(ventas);
                },
                (_, error) => {
                    console.error("Error al querer leer", error.message);
                }
            );
        });
    }

    useEffect(() => {
        traerVentas();
    }, []);

    ventas.forEach((venta) => {
        const formattedTotal = `$${venta.total}`;
        tableData.push([
            venta.id.toString(),
            venta.cliente,
            formatFecha(venta.fecha),
            formattedTotal,
            venta.form_pago,
            venta.vendedor,
        ]);
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                    <Row data={tableHead} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                    <Rows data={tableData} textStyle={styles.tableText} />
                </Table>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 10, width:'100%', height:"auto" },
    tableHeader: { height: 40, backgroundColor: '#0e485e' },
    tableHeaderText: { textAlign: 'center', color: '#FDB335', fontSize: 8, fontFamily: 'OpenSans-SemiBold' },
    tableText: { textAlign: 'center', fontSize: 7, borderBottomWidth: 2, borderRightWidth: 1, borderColor: '#FDB335', height: 30, paddingTop: 10, color: '#0e485e', fontFamily: 'OpenSans-Regular' },
});

export default Ventas;
