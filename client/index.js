const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

// making the merkel tree 
const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();
async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name ="Harsh";
  const index = niceList.findIndex(n=>n===name);
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name :name,
    index:index,
    proof:proof,
    root:root

  });

  console.log({ gift });
}

main();