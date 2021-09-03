import { loadApplication, saveApplication } from '../src/main'

async function mainLoop() : Promise<void>{
    let app = loadApplication()
    // showHello("greeting", "TypeScript");
    let lastSavedTime = new Date(app.lastInteractionTime)
    console.log("Application instantiated - Last access: " + lastSavedTime.toString())

    //main loop
    while (true) {
        app.progressTurn()
        console.log()
        await new Promise(f => setTimeout(f, 5000))
        saveApplication(app)
    }
}

mainLoop()