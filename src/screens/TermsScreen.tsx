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

const TERMS_SECTIONS = [
  {
    title: "1. Aceptación de los Términos",
    content: `Al acceder y utilizar la aplicación Altalaya, aceptas estar sujeto a estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no debes usar la aplicación.`,
  },
  {
    title: "2. Descripción del Servicio",
    content: `Altalaya es una aplicación móvil que permite a los usuarios descubrir, crear y compartir miradores y puntos de interés. La aplicación incluye funcionalidades como geolocalización, fotografía, valoraciones y redes sociales.`,
  },
  {
    title: "3. Cuenta de Usuario",
    content: `Para utilizar ciertas funcionalidades de la aplicación, debes crear una cuenta. Eres responsable de mantener la confidencialidad de tu información de acceso y de todas las actividades que ocurran bajo tu cuenta.`,
  },
  {
    title: "4. Contenido del Usuario",
    content: `Al subir contenido a la aplicación, otorgas a Altalaya una licencia no exclusiva para usar, reproducir y distribuir dicho contenido. Eres responsable de que el contenido que subas no viole derechos de terceros.`,
  },
  {
    title: "5. Uso Aceptable",
    content: `Te comprometes a no usar la aplicación para fines ilegales o no autorizados. No debes subir contenido ofensivo, difamatorio, o que viole derechos de propiedad intelectual.`,
  },
  {
    title: "6. Privacidad",
    content: `Tu privacidad es importante para nosotros. El uso de la aplicación está sujeto a nuestra Política de Privacidad, que forma parte de estos términos.`,
  },
  {
    title: "7. Propiedad Intelectual",
    content: `La aplicación y su contenido original, características y funcionalidades son propiedad de Altalaya y están protegidos por leyes de propiedad intelectual.`,
  },
  {
    title: "8. Limitación de Responsabilidad",
    content: `Altalaya no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso de la aplicación.`,
  },
  {
    title: "9. Modificaciones",
    content: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la aplicación.`,
  },
  {
    title: "10. Terminación",
    content: `Podemos terminar o suspender tu cuenta en cualquier momento, sin previo aviso, por conducta que viole estos términos.`,
  },
  {
    title: "11. Ley Aplicable",
    content: `Estos términos se rigen por las leyes de España. Cualquier disputa será resuelta en los tribunales competentes de Madrid.`,
  },
  {
    title: "12. Contacto",
    content: `Si tienes preguntas sobre estos términos, puedes contactarnos en legal@altalaya.com`,
  },
];

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Términos y Condiciones</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.intro}>
            <Text style={styles.introText}>
              Última actualización: {new Date().toLocaleDateString("es-ES")}
            </Text>
          </View>

          {TERMS_SECTIONS.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Al continuar usando Altalaya, confirmas que has leído, comprendido
              y aceptado estos términos y condiciones.
            </Text>
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
  intro: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  introText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
    lineHeight: 24,
  },
  sectionContent: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    textAlign: "justify",
  },
  footer: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.background.secondary,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
    fontStyle: "italic",
  },
});
