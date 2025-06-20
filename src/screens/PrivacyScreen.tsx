import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/theme";

const PRIVACY_SECTIONS = [
  {
    title: "Recopilación de Datos",
    content: [
      "Recopilamos información que usted nos proporciona directamente, como cuando crea una cuenta, completa su perfil o interactúa con otros usuarios.",
      "Información de ubicación para mostrar miradores cercanos y calcular distancias.",
      "Datos de uso de la aplicación para mejorar nuestros servicios.",
      "Información del dispositivo para garantizar la compatibilidad y seguridad.",
    ],
  },
  {
    title: "Uso de la Información",
    content: [
      "Proporcionar y mantener nuestros servicios de miradores.",
      "Personalizar su experiencia y mostrar contenido relevante.",
      "Comunicarnos con usted sobre actualizaciones y mejoras.",
      "Garantizar la seguridad y prevenir el uso fraudulento.",
      "Cumplir con obligaciones legales y regulatorias.",
    ],
  },
  {
    title: "Compartir Información",
    content: [
      "No vendemos, alquilamos ni compartimos su información personal con terceros con fines comerciales.",
      "Podemos compartir información con proveedores de servicios que nos ayudan a operar la aplicación.",
      "La información puede ser compartida si es requerida por ley o para proteger nuestros derechos.",
      "Los miradores que usted crea pueden ser visibles para otros usuarios según sus configuraciones de privacidad.",
    ],
  },
  {
    title: "Sus Derechos",
    content: [
      "Acceder, corregir o eliminar su información personal.",
      "Exportar sus datos en un formato legible.",
      "Oponerse al procesamiento de sus datos personales.",
      "Retirar su consentimiento en cualquier momento.",
      "Presentar una queja ante las autoridades de protección de datos.",
    ],
  },
  {
    title: "Seguridad",
    content: [
      "Implementamos medidas de seguridad técnicas y organizativas apropiadas.",
      "Sus datos se almacenan de forma segura y se transmiten de manera encriptada.",
      "Realizamos auditorías regulares de seguridad.",
      "Notificamos inmediatamente cualquier violación de datos que pueda afectarle.",
    ],
  },
  {
    title: "Retención de Datos",
    content: [
      "Conservamos su información personal solo durante el tiempo necesario para los fines descritos.",
      "Los datos se eliminan automáticamente cuando ya no son necesarios.",
      "Puede solicitar la eliminación de su cuenta y datos asociados en cualquier momento.",
      "Algunos datos pueden conservarse por períodos más largos si es legalmente requerido.",
    ],
  },
];

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Política de Privacidad</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </Text>

          <Text style={styles.intro}>
            Su privacidad es importante para nosotros. Esta política describe
            cómo recopilamos, usamos y protegemos su información personal cuando
            utiliza nuestra aplicación de miradores.
          </Text>

          {PRIVACY_SECTIONS.map((section, index) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.content.map((paragraph, paragraphIndex) => (
                <Text key={paragraphIndex} style={styles.paragraph}>
                  {paragraph}
                </Text>
              ))}
            </View>
          ))}

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Contacto</Text>
            <Text style={styles.contactText}>
              Si tiene preguntas sobre esta política de privacidad, puede
              contactarnos en:
            </Text>
            <Text style={styles.contactEmail}>privacidad@altalaya.com</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
    fontStyle: "italic",
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.primary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.primary,
    marginBottom: 12,
  },
  contactSection: {
    marginTop: 32,
    padding: 20,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.primary,
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.detail,
  },
});
