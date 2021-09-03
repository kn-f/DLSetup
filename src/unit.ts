export class Unit {
    name: string;
    iconReference: string;
    quantity: number;
    baseHP: number;
    baseAttack: number;
    baseDefense: number;
    spawnPerTick: number;
    selected: boolean;
    baseXP: number

    constructor(name = 'Ant', icon = '', quantity = 0, baseHP = 1, baseAttack = 1, baseDefense = 1, spawnPerTick = 1, baseXP = 1) {
        this.name = name
        this.iconReference = icon
        this.quantity = quantity
        this.baseHP = baseHP
        this.baseAttack = baseAttack
        this.baseDefense = baseDefense
        this.spawnPerTick = spawnPerTick
        this.selected = false
        this.baseXP = baseXP
    }

    setSelectFlag(flag: boolean = true) {
        this.selected = flag
    }

    generateTickPassed(tick: number = 1) {
        let multiplier = 1;
        if (this.selected) {
            multiplier = 10;
        }
        this.quantity = this.quantity + this.spawnPerTick * tick * multiplier;
    }

    getAttack(): number {
        return this.baseAttack * this.quantity
    }

    getDefense(): number {
        return this.baseDefense * this.quantity
    }

    applyDamage(damage: number) {
        let finalHP = this.baseHP * this.quantity - damage
        this.quantity = Math.max(Math.round(finalHP / this.baseHP), 0)
    }

    attackEnemy(enemy: Unit): number {
        let damage = Math.max(this.getAttack() - enemy.getDefense(), 0)
        let previousQuantity = enemy.quantity
        enemy.applyDamage(damage)

        let xpGenerated = (previousQuantity - enemy.quantity) * enemy.baseXP

        return xpGenerated
    }
}