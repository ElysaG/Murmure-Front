import { View, Text, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../components/Button";
import Label from "../../components/Label";

const quizzQuestion = "Quand tu marches dehors, tu…";
const quizzAnswers = [
  "Regarde ton téléphone et pense à ta to-do list",
  "Observe un peu autour de toi, mais ton esprit vagabonde",
  "Sens le vent, entends les sons et profites de chaque pas",
];

const chapters = [
  {
    question: "Quand tu marches dehors, tu…",
    quizzAnswers: [
      "Regarde ton téléphone et pense à ta to-do list",
      "Observe un peu autour de toi, mais ton esprit vagabonde",
      "Sens le vent, entends les sons et profites de chaque pas",
    ],
  },
  {
    question: "Pendant les repas, tu…",
    quizzAnswers: [
      "Manges en vitesse sans vraiment prêter attention",
      "Manges tout en réfléchissant à ce que tu dois faire après",
      "Savoures chaque bouchée et remarques les goûts et textures",
    ],
  },
  {
    question: "Quand une émotion forte arrive, tu…",
    quizzAnswers: [
      "La repousses ou la fuis",
      "La remarques vaguement mais passes vite à autre chose",
      "Tu l’accueilles, tu respires et observes ce que tu ressens",
    ],
  },
];

export default function QuizzScreen({ navigation }) {
  const insets = useSafeAreaInsets(); //utilisé pour recuperer les dimension de la safeArea de l'ecran

  const quizzButtons = quizzAnswers.map((e, i) => {
    return <Button key={i} onPress={() => console.log({ i })} type="question" label={e} />;
  });

  return (
    <View style={styles.mainContainer}>
      {/* Top + marginTop dynamic en fonction de l'inset.top */}
      <Image style={[styles.coco, { top: Math.max(insets.top, 20) }]} source={require("../../assets/coco.png")} />
      <View style={[styles.contentContainer, { marginTop: Math.max(insets.top + 120, 20) }]}>
        <View style={styles.title}>
          <Text style={styles.titleQuestion}>{quizzQuestion}</Text>
          <Text style={styles.titleLogo}></Text>
        </View>
        <View style={styles.questionContainer}>{quizzButtons}</View>
      </View>

      {/* marginBottom dynamic en fonction de l'inset.bottom */}
      <View style={[styles.buttonContainer, { marginBottom: 20 + insets.bottom }]}>
        <Button onPress={() => navigation.goBack()} type="primary" label="Retour" />
        <Button onPress={() => navigation.navigate("Flashcard")} type="primary" label="Suivant" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#95BE96",
    position: "relative", //needed for "coco position:absolute" to work
  },
  coco: {
    position: "absolute", //needed to put coco where we want in the main container. Defaut position behavior top: 0
    right: "10%", //place it 10% to the right of the screen
    width: 130,
    height: 130,
    transform: [{ scaleX: -1 }], //flip image horizontaly
    zIndex: 2, // This define the priority of the image (2 > 1 so image is in front of contentContainer)
  },
  contentContainer: {
    flex: 1, // Donne tout la hauteur restante au contenu (apres le margin top pour coco et le )
    marginTop: 140,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 20,
    padding: 20,
    zIndex: 1,
  },
  title: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleQuestion: {
    fontSize: 18,
    fontWeight: "600",
  },
  questionContainer: {
    fontSize: 14,
    lineHeight: 28,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
