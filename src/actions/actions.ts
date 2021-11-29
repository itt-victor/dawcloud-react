export {}
/* 

//Animación de tiempo de carga
export const loading = () => {
    const text = document.querySelector('.a_title') as HTMLElement;
    const ventana = document.querySelector('.loading') as HTMLElement;
    const signup = document.querySelector('#signup_now') as HTMLElement;
    text.style.color = 'white';
    document.body.style.background = 'black';
    ventana.classList.toggle('visible');
    if (signup) signup.style.color = 'white';
    setTimeout(() => {
        if (signup) signup.style.color = 'black';
        ventana.classList.toggle('visible');
        document.body.style.background = '#b9edf1';
        text.style.color = 'black';
        document.body.style.transition = 'background 0.7s'
        if (signup) signup.style.transition = 'color 0.7s';
        ventana.style.transition = 'display 0.7s, visibility 0.7s'
        text.style.transition = 'color 0.7s'
    }, 3500);
};

//SIGN UP REMINDER
(() => {
    const signup = document.querySelector('#signup_now') as HTMLElement;
    const signupReminder = document.querySelector('#signup_reminder') as HTMLElement;
    const xButton = document.querySelector('.x-button') as HTMLElement;
    if (signup)  signup.addEventListener('click', () => signupReminder.style.display = 'flex');
    if (xButton) xButton.addEventListener('click', () => signupReminder.style.display = 'none');
})();

//SELECT TRACK
(() => {
    const tracks = document.getElementsByClassName("track") as HTMLCollection;
    const trackNames = document.getElementsByClassName("track_name") as HTMLCollection;
    for (const track of tracks) {
        track.addEventListener('mousedown', e => {
            for (const unTrack of tracks)
                unTrack.removeAttribute('data-selected');
            (e.currentTarget as HTMLElement).setAttribute('data-selected', '');
        });
    }
    for (const name of trackNames) {
        name.addEventListener('click', e => {
            const index = parseInt((e.currentTarget as HTMLElement).id.charAt(11));
            for (const track of tracks) track.removeAttribute('data-selected');
            tracks[index].setAttribute('data-selected', '');
        });
    }

})();

//CHANGE TRACK NAME
(() => {
    const names = document.querySelectorAll('.select');
    for (const name of names) {
        name.addEventListener('dblclick', e => {
            let name = e.target as HTMLElement;
            name.style.display = 'none';
            const input = (name.parentNode as HTMLElement).querySelector('input') as HTMLInputElement;
            input.style.display = 'block';
            input.focus();
            const trackId = parseInt((name.parentNode as HTMLElement).id.charAt(11));
            window.addEventListener('keypress', i => {
                if (i.key === 'Enter') {
                    name.innerHTML = input.value;
                    name.style.display = 'block';
                    input.style.display = 'none';
                    grid.tracks[trackId].name = input.value;
                }
            })
            window.addEventListener('click', a => {
                if (a.target != input) {
                    name.style.display = 'block';
                    input.style.display = 'none';
                }
            });
        });
    }
})();

//IMPORT AUDIO
(() => {
    const button = document.getElementById('load_sound_hidden');
    if (button) {
        button.onchange = (a: Event) => {
            loading(); eStop();
            const reader = new FileReader();
            reader.onload = e => {
                const trcknr = parseInt((document.querySelector('[data-selected]') as HTMLElement).id.charAt(6));
                audioCtx.decodeAudioData((e.target as FileReader).result as ArrayBuffer).then(audioBuffer => {
                    const args: RecordArgs = {
                        recordingId: generateRecordingId(),
                        timeToStart: timeSpace.time(),
                        audioBuffer,
                        offset: 0,
                        duration: audioBuffer.duration,
                        copy: false
                    };
                    grid.tracks[trcknr].addRecord(args);
                });
            }
            if (((a.target as HTMLInputElement & EventTarget).files as FileList).length > 0)
                reader.readAsArrayBuffer(((
                    (a.target as HTMLInputElement & EventTarget).files as FileList)
                [((a.target as HTMLInputElement & EventTarget).files as FileList).length - 1])
                );
        }
    }
})();

//ZOOM
(() => {
    const zoomIn = document.getElementById("zoomin") as HTMLElement;
    const zoomOut = document.getElementById("zoomout") as HTMLElement;
    const inputs = document.querySelectorAll('input') as NodeList;
    let oldZoom: number;

    const zDraw = () => {
        grid.recordings.forEach(recording => {
            const offset = recording.offset * timeSpace.zoom,
                  duration = recording.duration * timeSpace.zoom,
                  offCanvas = recording.selected
                        ? recording.offSelectedCanvas[timeSpace.zoom]
                        : recording.offCanvas[timeSpace.zoom],
                  width = Math.ceil(duration - offset) + 1;
            const args = {width, recording, offCanvas, offset, duration};
            ui_draw.printRecording(args);
        });
        drawGrid(); drawLayout();
        cursor.moveAtZoom(oldZoom);
        gridSelector.drawGridSelector(timeSpace.getStartMark, timeSpace.getEndMark);
        gridSelector.drawMarksatZoom(oldZoom);
    };

    const zIn = () => {
        oldZoom = timeSpace.zoom;
        timeSpace.zoom = Math.round(timeSpace.zoom * 1.25);
        if (timeSpace.zoom >= 889) timeSpace.zoom = 889;
        zDraw();
    };

    const zOut = () => {
        oldZoom = timeSpace.zoom;
        timeSpace.zoom = Math.round(timeSpace.zoom / 1.25);
        if (timeSpace.zoom <= 5) timeSpace.zoom = 5;
        zDraw();
    };

    zoomIn.addEventListener('click', zIn);
    zoomOut.addEventListener('click', zOut);
    document.addEventListener('keypress', e => {
        if (e.key === 'h' || e.key === 'H') {
            for (const input of inputs) if (e.target == input) return;
            zIn();
        }
        if (e.key === 'g' || e.key === 'G') {
            for (const input of inputs) if (e.target == input) return;
            zOut();
        }
    });
})();

//SET BPM
(() => {
    const bpmButton = document.getElementById('bpm_button') as HTMLButtonElement;
    let input: HTMLInputElement;
    bpmButton.innerHTML = `${Math.round(120 / timeSpace.bpm)}  bpm`;
    bpmButton.addEventListener('click', e => {
        e.stopPropagation();
        if (!document.getElementById('bpm_value')) {
            bpmButton.innerHTML = '';
            input = document.createElement('input');
            input.id = 'bpm_value';
            input.style.width = '80px';
            input.setAttribute('placeholder', 'set tempo');
            bpmButton.appendChild(input);
            input.focus();
        }
        window.addEventListener('click', function br(a) {
            if (!(a.target as HTMLElement).contains(e.currentTarget as HTMLElement)) {
                input.remove();
                bpmButton.innerHTML = `${Math.round(120 / timeSpace.bpm)}  bpm`;
                this.removeEventListener('click', br);
            }
        });
        input.addEventListener('keypress', function (o) {
            if (o.key === 'Enter') {
                o.preventDefault();
                timeSpace.bpm = 120 / parseInt(this.value);
                bpmButton.innerHTML = `${Math.round(120 / timeSpace.bpm)}  bpm`;
                input.remove();
                drawGrid(); drawLayout();
            }
        });
    });
})();

//TIME SIGNATURE (4/4 3/4)
(() => {
    const metricButton = document.getElementById('metric_button') as HTMLElement;
    metricButton.innerHTML = '4/4';
    metricButton.addEventListener('click', () => {
        if (metricButton.textContent == '4/4') {
            metricButton.innerHTML = '3/4';
            timeSpace.compas = 1.5;
        } else {
            metricButton.innerHTML = '4/4';
            timeSpace.compas = 2;
        }
        drawGrid(); drawLayout();
    });
})();

//elimina la grabación
export const removeRecording = (recording: Recording) => {
    recording.canvas.addEventListener('mousedown', e => {
        e.stopPropagation;
        if (!recording.selected) {
            grid.recordings.forEach(recording => {
                recording.selected = false;
                const offset = recording.offset * timeSpace.zoom,
                    duration = recording.duration * timeSpace.zoom,
                    width = Math.ceil(duration - offset) + 1;
                const offCanvas = recording.offCanvas[timeSpace.zoom];
                const args = {width, recording, offCanvas, offset, duration};
                ui_draw.printRecording(args);
                recording.canvas.style.zIndex = (5).toString();
            });

            recording.selected = true;
            const offset = recording.offset * timeSpace.zoom,
                duration = recording.duration * timeSpace.zoom,
                width = Math.ceil(duration - offset) + 1;
            const offCanvas = recording.offSelectedCanvas[timeSpace.zoom];
            const args = {width, recording, offCanvas, offset, duration};
            ui_draw.printRecording(args);
            recording.canvas.style.zIndex = (6).toString();
        }
    });
    window.addEventListener('keyup', a => {
        if (recording.canvas) {
            if (a.key === 'Delete' && recording.selected) {
                a.preventDefault();
                if (is.playing) soundcontroller.stopSingleSound(recording);
                recording.deleteRecording();
                grid.recordings.splice(grid.recordings.indexOf(recording), 1);
            }
        }
    });
};
 */