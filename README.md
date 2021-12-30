# Bitcoin Mini Apps

Mini apps to learn Bitcoin & Lightning development

Focus on interacting with self-hosted Bitcoin & Lightning nodes

## Trace Ancestry

Given a txid, this app analyzes the transaction ancestry of that transaction.

It climbs the chain by selecting the biggest input of each transaction as the "parent".

Some interesting data points about the ancestry are written to /data.

Found at apps/traceTxBiggestAncestors.

## CLI Tools

Handy CLI tools to query your node for info that requires one or more RPC calls.

Example: place the following into your ~/.bash_aliases

```
alias get-block="node /<path>/bitcoin-mini-apps/utils/cli-tools/getBlock.js"
```

Now use get-block on the command line to get a block object from a block header number.