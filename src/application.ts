import { Type } from 'class-transformer'
import 'reflect-metadata'
import { Unit } from "./unit"



export enum Status {
    Generation,
    Attack
}

export const msPerTurn = 1000 //1 turn each second

export class Application {
    status: Status

    @Type(() => Unit)
    playerUnits: Array<Unit>

    @Type(() => Unit)
    enemyUnits: Array<Unit>
    xp: number
    gold: number
    lastInteractionTime: number

    constructor(playerUnits = Array<Unit>(), enemyUnits = Array<Unit>(), xp = 0, gold = 0, lastInteractionTime = Date.now()) {
        this.status = Status.Generation
        this.playerUnits = playerUnits
        this.enemyUnits = enemyUnits
        this.xp = xp
        this.gold = gold
        this.lastInteractionTime = lastInteractionTime
    }

    getLevel() {
        return 10
    }

    progressGenerationTurns() {
        let timeElapsed = Date.now() - this.lastInteractionTime
        let turnsPassed = Math.round(timeElapsed / msPerTurn)

        this.playerUnits.forEach((currentUnit) => {
            currentUnit.generateTickPassed(turnsPassed)
        })

        this.lastInteractionTime = Date.now()
    }

    progressAttackTurn() {
        let xpEarned: number
        xpEarned = this.attackTurnLoop(this.playerUnits, this.enemyUnits)
        this.attackTurnLoop(this.enemyUnits, this.playerUnits)
        this.xp += xpEarned
        this.lastInteractionTime = Date.now()
    }

    attackTurnLoop(attackers: Array<Unit>, defenders: Array<Unit>): number {
        //let defenderUnit: Unit
        //let defendersTurnOrder = Array(attackers.length)
        let xpAccumulated: number = 0

        //defendersTurnOrder.fill().map(() => Math.round(Math.random() * (defenders.length-1)))
        let defendersTurnOrder = Array.from({length: attackers.length}, () => Math.round(Math.random() * (defenders.length-1)))

        attackers.forEach((attackerUnit) => {
            let defenderUnitIndex = defendersTurnOrder.pop()
            xpAccumulated += attackerUnit.attackEnemy(defenders[defenderUnitIndex])
        })

        return xpAccumulated
    }

    progressTurn() {
        if(this.status==Status.Generation){
            this.progressGenerationTurns()
        } else {
            this.progressAttackTurn()
        }
    }



}