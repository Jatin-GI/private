import { useState } from "react";
import BirthdaySunflower from "./pages/BirthdayFlower";
import BirthdayQuiz from "./pages/BirthdayQuiz";

export default function App() {
  const [showFlower, setShowFlower] = useState(false);

  return showFlower ? (
    <BirthdaySunflower />
  ) : (
    <BirthdayQuiz onComplete={() => setShowFlower(true)} />
  );
}
