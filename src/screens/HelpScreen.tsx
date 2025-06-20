import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/theme";

const FAQ_SECTIONS = [
  {
    title: "Primeros Pasos",
    items: [
      {
        question: "¿Cómo creo mi primer mirador?",
        answer:
          "Ve a la pestaña 'Crear Mirador' en la barra de navegación. Toma una foto, añade una descripción y selecciona la ubicación. ¡Es así de fácil!",
      },
      {
        question: "¿Cómo encuentro miradores cerca de mí?",
        answer:
          "Usa la pestaña 'Explorar' para ver miradores cercanos. La aplicación usa tu ubicación para mostrar los miradores más próximos.",
      },
      {
        question: "¿Puedo usar la app sin crear una cuenta?",
        answer:
          "Puedes explorar miradores sin cuenta, pero necesitarás registrarte para crear, guardar favoritos y interactuar con otros usuarios.",
      },
    ],
  },
  {
    title: "Funcionalidades",
    items: [
      {
        question: "¿Cómo guardo un mirador como favorito?",
        answer:
          "En la página del mirador, toca el icono de corazón para añadirlo a tus favoritos. Puedes ver todos tus favoritos en tu perfil.",
      },
      {
        question: "¿Puedo editar un mirador que ya creé?",
        answer:
          "Sí, ve a tu perfil, encuentra el mirador en 'Mis Miradores' y toca el icono de editar para hacer cambios.",
      },
      {
        question: "¿Cómo funciona el sistema de valoraciones?",
        answer:
          "Puedes valorar miradores de 1 a 5 estrellas y dejar comentarios. Las valoraciones ayudan a otros usuarios a descubrir los mejores miradores.",
      },
    ],
  },
  {
    title: "Problemas Técnicos",
    items: [
      {
        question: "La app no encuentra mi ubicación",
        answer:
          "Asegúrate de que la ubicación esté habilitada en tu dispositivo. Ve a Configuración > Privacidad > Ubicación y activa el acceso para Altalaya.",
      },
      {
        question: "Las fotos no se cargan correctamente",
        answer:
          "Verifica tu conexión a internet. Si el problema persiste, intenta cerrar y abrir la app nuevamente.",
      },
      {
        question: "La app se cierra inesperadamente",
        answer:
          "Actualiza la app a la última versión. Si el problema continúa, reinstala la aplicación desde la tienda.",
      },
    ],
  },
  {
    title: "Cuenta y Privacidad",
    items: [
      {
        question: "¿Cómo cambio mi contraseña?",
        answer:
          "Ve a Configuración > Información Personal y selecciona 'Cambiar Contraseña'. Te enviaremos un enlace por email.",
      },
      {
        question: "¿Puedo eliminar mi cuenta?",
        answer:
          "Sí, en Configuración > Cuenta encontrarás la opción 'Eliminar Cuenta'. Ten en cuenta que esta acción es irreversible.",
      },
      {
        question: "¿Quién puede ver mis miradores?",
        answer:
          "Por defecto, tus miradores son públicos. Puedes cambiar la privacidad de cada mirador en la configuración de edición.",
      },
    ],
  },
];

const CONTACT_OPTIONS = [
  {
    icon: "mail-outline",
    title: "Email de Soporte",
    description: "soporte@altalaya.com",
    action: "email",
  },
  {
    icon: "chatbubble-outline",
    title: "Chat en Vivo",
    description: "Disponible 24/7",
    action: "chat",
  },
  {
    icon: "call-outline",
    title: "Teléfono",
    description: "+34 900 123 456",
    action: "phone",
  },
  {
    icon: "document-text-outline",
    title: "Base de Conocimientos",
    description: "Artículos y tutoriales",
    action: "knowledge",
  },
];

export default function HelpScreen() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleContactAction = (action: string) => {
    switch (action) {
      case "email":
        // TODO: Implement email action
        console.log("Open email client");
        break;
      case "chat":
        // TODO: Implement chat action
        console.log("Open chat");
        break;
      case "phone":
        // TODO: Implement phone action
        console.log("Open phone");
        break;
      case "knowledge":
        // TODO: Navigate to knowledge base
        console.log("Open knowledge base");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayuda y Soporte</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Ionicons
                name="search-outline"
                size={20}
                color={colors.text.secondary}
              />
              <Text style={styles.searchPlaceholder}>
                Buscar en la ayuda...
              </Text>
            </View>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contacto Directo</Text>
            <View style={styles.contactGrid}>
              {CONTACT_OPTIONS.map((option, index) => (
                <TouchableOpacity
                  key={option.title}
                  style={styles.contactCard}
                  onPress={() => handleContactAction(option.action)}
                >
                  <View style={styles.contactIcon}>
                    <Ionicons
                      name={option.icon as any}
                      size={24}
                      color={colors.text.primary}
                    />
                  </View>
                  <Text style={styles.contactTitle}>{option.title}</Text>
                  <Text style={styles.contactDescription}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
            {FAQ_SECTIONS.map((section, sectionIndex) => (
              <View key={section.title} style={styles.faqCategory}>
                <Text style={styles.categoryTitle}>{section.title}</Text>
                <View style={styles.faqList}>
                  {section.items.map((item, itemIndex) => {
                    const key = `${sectionIndex}-${itemIndex}`;
                    const isExpanded = expandedItems[key];

                    return (
                      <View key={item.question} style={styles.faqItem}>
                        <TouchableOpacity
                          style={styles.faqQuestion}
                          onPress={() => toggleItem(sectionIndex, itemIndex)}
                        >
                          <Text style={styles.questionText}>
                            {item.question}
                          </Text>
                          <Ionicons
                            name={isExpanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color={colors.text.secondary}
                          />
                        </TouchableOpacity>
                        {isExpanded && (
                          <View style={styles.faqAnswer}>
                            <Text style={styles.answerText}>{item.answer}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.troubleshootingSection}>
            <Text style={styles.sectionTitle}>Solución de Problemas</Text>
            <View style={styles.troubleshootingCard}>
              <Ionicons
                name="refresh-outline"
                size={24}
                color={colors.detail}
              />
              <Text style={styles.troubleshootingTitle}>
                ¿La app no funciona correctamente?
              </Text>
              <Text style={styles.troubleshootingText}>
                Intenta estos pasos: 1) Cierra y abre la app, 2) Verifica tu
                conexión a internet, 3) Actualiza la app, 4) Reinstala si es
                necesario.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  content: {
    padding: 20,
  },
  searchSection: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: colors.text.secondary,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.detail,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  contactDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: "center",
  },
  faqSection: {
    marginBottom: 32,
  },
  faqCategory: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.secondary,
    marginBottom: 12,
  },
  faqList: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    overflow: "hidden",
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.detail,
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  troubleshootingSection: {
    marginBottom: 24,
  },
  troubleshootingCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  troubleshootingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  troubleshootingText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
