import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Linking, Animated, Easing } from 'react-native';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch('https://remolacha.net/wp-json/wp/v2/posts?search=minerd');
                const data = await response.json();
                setNoticias(data);
            } catch (error) {
                console.error(error);
                alert('Error al cargar las noticias');
            }
        };

        fetchNoticias();
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handlePress = (url) => {
        Linking.openURL(url);
    };

    const renderItem = ({ item }) => (
        <Animated.View
            style={[
                styles.item,
                { opacity: fadeAnim }
            ]}
        >
            {item.featured_media && item.featured_media.source_url ? (
                <Image source={{ uri: item.featured_media.source_url }} style={styles.image} />
            ) : null}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title.rendered}</Text>
                <Text style={styles.excerpt}>{item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            </View>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Noticias</Text>
            <FlatList
                data={noticias}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#d3d3d3', // Fondo gris claro
    },
    header: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
        color: '#b22222', // Rojo oscuro
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 16,
    },
    item: {
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#ffffff', // Fondo blanco para las noticias
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#b22222', // Rojo oscuro para el título
        marginBottom: 10,
    },
    excerpt: {
        fontSize: 14,
        color: '#333333', // Color de texto más oscuro para el resumen
        lineHeight: 20,
    },
});

export default Noticias;

