const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Newsletter", function () {
  it("Should return the new greeting once it's changed", async function () {
  const Newsletter = await ethers.getContractFactory("Newsletter");
  const newsletter = await Newsletter.deploy();

  await newsletter.deployed();
  console.log("Newsletter deployed to: ", newsletter.address);

  await newsletter.subscribe();
  expect('subscribe').to.be.calledOnContract(newsletter);

  console.log("Subscribed to newsletter!");
  });
});

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
