export default function getGreeting() {
  let greetings = [
    "Hang ten, hombre!",
    "Shred the gnar!",
    "Vokda soda. Close it",
    "Be the wave, my dude.",
    "Surf's up, bruh!",
    "Which way to the beach, kemosabe?",
    "Boogie board? Chyea right.",
    "Dude... can you spot me a twenty?",
    "I'd rather be carving swells!",
    "Let's hit the beach before the tourists show!",
    "Dude... let me get some wax.",
    "Bro I swear I punched a shark last summer.",
    "Be easy, Broku!"
  ];

  let random = greetings[Math.floor(Math.random() * greetings.length)];
  return random;
}