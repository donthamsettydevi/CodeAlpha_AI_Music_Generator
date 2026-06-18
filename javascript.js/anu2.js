const notes = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    C5: 523.25
};

const noteNames = Object.keys(notes);

document.getElementById("generateBtn").addEventListener("click", () => {

    let generatedSequence = [];

    for(let i=0; i<8; i++){
        let randomNote =
            noteNames[Math.floor(Math.random() * noteNames.length)];

        generatedSequence.push(randomNote);
    }

    document.getElementById("notesOutput").textContent =
        generatedSequence.join(" - ");

    playSequence(generatedSequence);
});

function playSequence(sequence){

    const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();

    sequence.forEach((note, index) => {

        const oscillator =
            audioContext.createOscillator();

        const gainNode =
            audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = notes[note];
        oscillator.type = "sine";

        const startTime =
            audioContext.currentTime + index * 0.5;

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.4);
    });
}