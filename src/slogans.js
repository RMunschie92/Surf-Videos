export default function getGreeting() {
  let greetings = [
    "Hang ten, hombre!",
    "Shred the gnar!",
    "Vokda soda. Close it.",
    "Be the wave, my dude.",
    "Surf's up, bruh!",
    "Which way to the beach, kemosabe?",
    "Boogie board? Chyea right.",
    "Dude... can you spot me a twenty?",
    "I'd rather be carving swells!",
    "Let's hit the beach before the tourists show!",
    "Dude... let me get some wax.",
    "Bro I swear I punched a shark last summer.",
    "Be easy, Broku!",
    "You mean... like a FULL-time job, Dad?",
    "311 is in town next month, you down?!",
    "Johnny Tsunami totally changed my life, bro.",
    "My 'stache is ironic... so is my puka shell necklace.",
    "My guy, can I just crash here for one more week?",
    "I spent a semester in Nepal and it really changed my perspective.",
    "I'm telling you, ska is gonna make a comeback!"
  ];

  let random = greetings[Math.floor(Math.random() * greetings.length)];
  return random;
}