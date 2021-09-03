import { deserialize, serialize } from 'class-transformer'
import 'reflect-metadata'
import { Application } from "../src/application"
import { Unit } from "./unit"


// function showHello(divName: string, name: string) {
//   const elt = document.getElementById(divName)
//   elt.innerText = sayHello(name)
// }

export function loadApplication():Application {
  //let localStorage = window.localStorage
  let savedApplication = localStorage.getItem('application')
  if(savedApplication===null) {
    console.log("No saved data found, creating a new instance")
    let application = new Application()
    application.playerUnits.push(new Unit())
    return application
  } else {
    console.log("Saved data found: "+savedApplication)
    return deserialize(Application, savedApplication)
  }
}

export function saveApplication(app:Application){
  localStorage.setItem('application', serialize(app))
}
