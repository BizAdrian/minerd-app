import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

async function obtenerCentro(codCentro) {
    try {
        const response = await fetch(`https://adamix.net/minerd/minerd/centros.php?regional=*`);
        
        if (!response.ok) {
            throw new Error('Error en la red: ' + response.statusText);
        }

        const data = await response.json();

        if (data && data.datos) {
            const centros = data.datos;
            const centroEncontrado = centros.find(c => c.codigo === codCentro);
            return centroEncontrado || null;
        } else {
            throw new Error('Datos no encontrados en la respuesta');
        }
    } catch (error) {
        console.error('Error al obtener el centro:', error);
        return null;
    }
}

export default function BuscarCentroScreen() {
    const [codigoCentro, setCodigoCentro] = useState('');
    const [centro, setCentro] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBuscarCentro = async () => {
        if (!codigoCentro) {
            Alert.alert('Aviso', 'Por favor, ingresa un código de centro.');
            return;
        } else if (codigoCentro.length < 5) {
            Alert.alert('Aviso', 'El código de centro debe ser de 5 caracteres.');
            return;
        }

        setLoading(true);
        const centroEncontrado = await obtenerCentro(codigoCentro);
        setLoading(false);

        if (centroEncontrado) {
            setCentro(centroEncontrado);
        } else {
            Alert.alert('Centro no encontrado', 'No se encontró un centro con el código proporcionado.');
            setCentro(null);
        }
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.formulario}>
                <Text style={styles.texto}>Ingrese un codigo de centro</Text>
                <TextInput
                    style={styles.entrada}
                    placeholder="Código del Centro"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={codigoCentro}
                    keyboardType='numeric'
                    maxLength={5}
                    onChangeText={setCodigoCentro}
                />
                <TouchableOpacity style={styles.boton} onPress={handleBuscarCentro} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.botonTexto}>Buscar</Text>
                    )}
                </TouchableOpacity>
                
                {centro && (
                    <View style={styles.resultadoContenedor}>
                        <Text style={styles.resultadoTexto}>
                            <Text style={styles.title}>Distrito: </Text> {centro.distrito}
                        </Text>
                        <Text style={styles.resultadoTexto}>
                            <Text style={styles.title}>Municipio: </Text> {centro.d_dmunicipal}
                        </Text>
                        <Text style={styles.resultadoTexto}>
                            <Text style={styles.title}>Centro: </Text>{centro.codigo} {centro.nombre}
                        </Text>
                        <Text style={styles.resultadoTexto}>
                            <Text style={styles.title}>Coordenadas: </Text>{centro.coordenadas}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#333',
    },
    formulario: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    texto: {
        color: '#fff',
        marginBottom: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    entrada: {
        height: 40,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 5,
    },
    boton: {
        backgroundColor: '#E53935',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    botonTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultadoContenedor: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#444',
        borderRadius: 12,
        borderColor: '#FFF',
        borderWidth: 1,
    },
    resultadoTexto: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 8,
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
});
