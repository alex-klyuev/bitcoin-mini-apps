# Trace A Transaction's Ancestry

Given a transaction, this app will analyze the transaction "ancestry" of the input transaction.

At each transaction, pick the input with the largest value as the "parent" transaction.

In other words, we track the "lineage" of biggest inputs of the transaction.

The first transaction in every ancestry will be a coinbase transaction.

The app records data on each transaction in the ancestry at data/ancestors.txt

The transactions in the ancestry with the largest transaction value, most number of inputs, and other variables are recorded at data/ancestry-summary.txt

### Example Usage

Let's trace the [transaction referenced](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch02.asciidoc#buying-a-cup-of-coffee) in 'Mastering Bitcoin' by Andreas Antonopoulos:

```
node apps/traceTxBiggestAncestors 0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2
```

Find output at [apps/traceTxBiggestAncestor/data/0627052.txt](./data/0627052.txt)