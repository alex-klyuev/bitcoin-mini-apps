let obj1 = { val: 3, txid: 7 };

let txid = 6;

let obj2 = { txid, ...obj1 };

console.log(obj2);