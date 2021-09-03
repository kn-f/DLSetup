import { expect } from 'chai'
import 'mock-local-storage'
import { Application, Status } from "../src/application"
import { loadApplication, saveApplication } from '../src/main'

// var testApplication = new Application();

// beforeEach(function () {
//     testApplication = new Application()
// })

describe('Check application load', () => { // the tcd te   ests container
    it('checking empty localStorage', () => { // the single test
        localStorage.clear()
        let testApplication = loadApplication();
        expect(testApplication.status).to.equal(Status.Generation);
        expect(testApplication.playerUnits).to.be.an.instanceOf(Array);
        expect(testApplication.enemyUnits).to.be.an.instanceOf(Array);
        expect(testApplication.xp).to.equal(0);
        expect(testApplication.gold).to.equal(0);
        expect(Math.floor(testApplication.lastInteractionTime / 1000)).to.equal(Math.floor(Date.now() / 1000));
    });
    it('checking full localStorage', () => { // the single test
        localStorage.clear()
        let testApplication = new Application()
        let savedDate = Date.now()-100000
        testApplication.lastInteractionTime = savedDate
        testApplication.gold = 100
        testApplication.status = Status.Attack
        saveApplication(testApplication)
        let loadedTestApplication=loadApplication()
        expect(loadedTestApplication.status).to.equal(Status.Attack);
        expect(loadedTestApplication.playerUnits).to.be.an.instanceOf(Array);
        expect(loadedTestApplication.enemyUnits).to.be.an.instanceOf(Array);
        expect(loadedTestApplication.xp).to.equal(0);
        expect(loadedTestApplication.gold).to.equal(100);
        expect(loadedTestApplication.lastInteractionTime).to.equal(savedDate);
    });

});