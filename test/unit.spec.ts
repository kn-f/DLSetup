import { expect } from 'chai';
import { Unit } from "../src/unit";

var testUnit = new Unit();

beforeEach(function () {
    testUnit = new Unit();
})

describe('Unit class tests', () => { // the tcd te   ests container
    it('checking constructor', () => { // the single test
        expect(testUnit.name).to.equal("Ant");
        expect(testUnit.iconReference).to.equal("");
        expect(testUnit.baseHP).to.equal(1);
        expect(testUnit.selected).to.be.false;
    });

    it('Selector test', () => { // the single test
        expect(testUnit.selected).to.be.false;
        testUnit.setSelectFlag(true);
        expect(testUnit.selected).to.be.true;
        testUnit.setSelectFlag(true);
        expect(testUnit.selected).to.be.true;
    });

    it('Tick advance test - basic', () => { // the single test
        expect(testUnit.quantity).to.equal(0);
        expect(testUnit.spawnPerTick).to.equal(1);
        expect(testUnit.selected).to.be.false;
        testUnit.generateTickPassed();
        expect(testUnit.quantity).to.equal(1)
    });

    it('Tick advance test - multitick', () => { // the single test
        expect(testUnit.quantity).to.equal(0);
        expect(testUnit.spawnPerTick).to.equal(1);
        expect(testUnit.selected).to.be.false;
        testUnit.generateTickPassed(10);
        expect(testUnit.quantity).to.equal(10)
    });

    it('Tick advance test - multitick selected', () => { // the single test
        expect(testUnit.quantity).to.equal(0);
        expect(testUnit.spawnPerTick).to.equal(1);
        expect(testUnit.selected).to.be.false;
        testUnit.setSelectFlag(true);
        testUnit.generateTickPassed(10);
        expect(testUnit.quantity).to.equal(100)
    });

    it('Attack basic test', () => { // the single test
        testUnit.quantity = 1
        let enemyUnit = new Unit()
        let xpAccumulated: number
        enemyUnit.quantity = 1
        expect(testUnit.quantity).to.equal(1)
        expect(enemyUnit.quantity).to.equal(1)
        xpAccumulated = testUnit.attackEnemy(enemyUnit)
        expect(testUnit.quantity).to.equal(1)
        expect(enemyUnit.quantity).to.equal(1)
        expect(xpAccumulated).to.equal(0)
        xpAccumulated = enemyUnit.attackEnemy(testUnit)
        expect(testUnit.quantity).to.equal(1)
        expect(enemyUnit.quantity).to.equal(1)
        expect(xpAccumulated).to.equal(0)
    });

    it('Attack advanced test', () => { // the single test
        testUnit.quantity = 100
        let enemyUnit = new Unit()
        enemyUnit.quantity = 175
        let xpAccumulated: number

        expect(testUnit.quantity).to.equal(100)
        expect(enemyUnit.quantity).to.equal(175)
        xpAccumulated = testUnit.attackEnemy(enemyUnit)
        expect(testUnit.quantity).to.equal(100)
        expect(enemyUnit.quantity).to.equal(175)
        expect(xpAccumulated).to.equal(0)
        xpAccumulated = enemyUnit.attackEnemy(testUnit)
        expect(testUnit.quantity).to.equal(25)
        expect(enemyUnit.quantity).to.equal(175)
        expect(xpAccumulated).to.equal(75)
        xpAccumulated = enemyUnit.attackEnemy(testUnit)
        expect(testUnit.quantity).to.equal(0)
        expect(enemyUnit.quantity).to.equal(175)
        expect(xpAccumulated).to.equal(25)

    });

});