const assert = require("assert");
const ganache = require("ganache");
const { beforeEach } = require("mocha");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let acounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Smart Contract", () => {
  it("deployment is ok", () => {
    assert.ok(lottery.options.address);
  });
});
