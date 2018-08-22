import { expect, assert } from 'chai';
import { ApplicationMaster } from './ApplicationMaster';

class App extends ApplicationMaster {

}

const app = new App({});

app.start();

describe('Workers should start', () => {

});

describe('Worker exit should refork a new one', () => {

});

describe('Agent exit should throw an error', () => {

});

describe('Call exit agent should get an error', () => {

});

describe('Agent can be restart', () => {

});
