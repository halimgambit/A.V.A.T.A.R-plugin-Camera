export async function init() {
    await Avatar.lang.addPluginPak('Camera');
}

export async function action(data, callback) {
    try {
        const Locale = await Avatar.lang.getPak('Camera', data.language);

        const tblActions = {
            openCamera: () => openCamera(data.client, data.toClient || data.client, Locale),
            closeCamera: () => closeCamera(data.client, data.toClient || data.client, Locale)
        };

        info("Camera Action:", data.action.command, "To:", data.toClient || data.client);

        if (tblActions[data.action.command]) {
            await tblActions[data.action.command]();
        }
    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        error("Erreur Camera:", err.message || err);
    }
    callback();
}

const openCamera = (client, toClient, Locale) => {

    Avatar.speak(Locale.get("speech.openCam"), client, () => {
        Avatar.runApp('cmd.exe', toClient, '/c start microsoft.windows.camera:', (err) => {
            if (err) {error("Erreur ouverture caméra:", err);}
                Avatar.Speech.end(client);
            }
        );
    });
};

const closeCamera = (client, toClient, Locale) => {

    const command = "powershell -command \"Stop-Process -Name WindowsCamera -Force\"";

    Avatar.speak(Locale.get("speech.closeCam"), client, () => {
        Avatar.runApp(command, toClient, (err) => {
            if (err) {error("Erreur lors de la fermeture :", err);}
            Avatar.Speech.end(client);
        });
    });
}
