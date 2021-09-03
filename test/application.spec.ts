import { expect } from 'chai'
import { Application, msPerTurn, Status } from "../src/application"
import { Unit } from "../src/unit"

var testApplication = new Application();

beforeEach(function () {
    testApplication = new Application()
})

describe('Application creation test', () => { // the tcd te   ests container
    it('checking constructor', () => { // the single test
        expect(testApplication.status).to.equal(Status.Generation);
        expect(testApplication.playerUnits).to.be.an.instanceOf(Array);
        expect(testApplication.enemyUnits).to.be.an.instanceOf(Array);
        expect(testApplication.xp).to.equal(0);
        expect(testApplication.gold).to.equal(0);
        expect(Math.floor(testApplication.lastInteractionTime / 1000)).to.equal(Math.floor(Date.now() / 1000));
    });

    it('Level calculation test', () => { // the single test
        expect(testApplication.getLevel()).to.equal(10);
    });

    it('Turn advance test - generation - one tick', () => { // the single test
        testApplication.playerUnits.push(new Unit())
        expect(testApplication.playerUnits[0].quantity).to.equal(0)
        expect(testApplication.playerUnits[0].selected).to.be.false
        expect(testApplication.status).to.be.equal(Status.Generation)
        testApplication.lastInteractionTime = Date.now() - msPerTurn
        testApplication.progressGenerationTurns()
        expect(testApplication.playerUnits[0].quantity).to.equal(testApplication.playerUnits[0].spawnPerTick)
        expect(testApplication.playerUnits[0].quantity).to.equal(1)
        expect(testApplication.xp).to.equal(0);
        expect(Math.floor(testApplication.lastInteractionTime / 1000)).to.equal(Math.floor(Date.now() / 1000));
    });

    it('Turn advance test - - generation - multiple ticks', () => { // the single test
        testApplication.playerUnits.push(new Unit())
        expect(testApplication.playerUnits[0].quantity).to.equal(0)
        expect(testApplication.playerUnits[0].selected).to.be.false
        expect(testApplication.status).to.be.equal(Status.Generation)
        testApplication.lastInteractionTime = Date.now() - msPerTurn * 3
        testApplication.progressGenerationTurns()
        expect(testApplication.playerUnits[0].quantity).to.equal(testApplication.playerUnits[0].spawnPerTick * 3)
        expect(testApplication.xp).to.equal(0);
        expect(Math.floor(testApplication.lastInteractionTime / 1000)).to.equal(Math.floor(Date.now() / 1000));

    });

    it('Turn advance test - fight - advanced', () => { // the single test
        testApplication.playerUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.playerUnits[0].quantity = 175
        testApplication.enemyUnits[0].quantity = 100
        testApplication.progressAttackTurn()
        expect(testApplication.playerUnits[0].quantity).to.be.equal(175)
        expect(testApplication.enemyUnits[0].quantity).to.be.equal(25)
        expect(testApplication.xp).to.equal(75);

        expect(Math.floor(testApplication.lastInteractionTime / 1000)).to.equal(Math.floor(Date.now() / 1000));
        testApplication.progressAttackTurn()
        expect(testApplication.playerUnits[0].quantity).to.be.equal(175)
        expect(testApplication.enemyUnits[0].quantity).to.be.equal(0)
        expect(testApplication.xp).to.equal(100);

    });

    it('Turn advance test - fight - multiple units', () => { // the single test
        testApplication.playerUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.playerUnits[0].quantity = 175
        testApplication.enemyUnits[0].quantity = 100
        testApplication.enemyUnits[1].quantity = 200
        expect(testApplication.playerUnits[0].quantity).to.be.equal(175)
        expect(testApplication.enemyUnits[0].quantity).to.be.equal(100)
        expect(testApplication.enemyUnits[1].quantity).to.be.equal(200)
        testApplication.progressAttackTurn()
        expect(testApplication.playerUnits[0].quantity).to.be.equal(150)
        expect(testApplication.enemyUnits[0].quantity).to.be.oneOf([25,50]) // TODO - review values
        expect(testApplication.enemyUnits[1].quantity).to.be.equal(200)
        expect(testApplication.xp).to.be.oneOf([75,50])

    });

    it('Test array shuffle - internal debug', () => { // the single test
        testApplication.playerUnits.push(new Unit())
        testApplication.playerUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.enemyUnits.push(new Unit())
        testApplication.progressAttackTurn()

    });

});