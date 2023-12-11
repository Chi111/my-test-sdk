import { useWallet } from "@solana/wallet-adapter-react";
import { Client } from "@ladderlabs/buddy-sdk";
import { Connection, Keypair, Transaction, Signer } from "@solana/web3.js";

export const MyComponent = () => {
  const { connected } = useWallet();

  const sendTransaction = async (
    transaction: Transaction,
    connection: Connection,
    payer: Keypair,
    signers: Signer[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    commitment?: any
  ) => {
    const { blockhash } = await connection.getLatestBlockhash();

    transaction.feePayer = payer.publicKey;
    transaction.recentBlockhash = blockhash;

    for (const signer of signers) {
      transaction.partialSign(signer);
    }

    transaction.partialSign(payer);

    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );

    await connection.confirmTransaction(signature, commitment);
  };

  const handleClick = async () => {
    if (connected) {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      // const connection = new Connection("https://api.testnet.solana.com");
      const wallet = Keypair.generate();
      const client = new Client(connection, wallet.publicKey);
      const organizationName = "laddercaster";
      const transaction = new Transaction();

      // ... building instruction for buying the NFT

      const member = await client.member.getByName(organizationName, "bar");

      // Transferring 1 SOL to foo's treasury
      transaction.add(
        ...await client.transfer.transferRewards(member.account.pda, 1 * 1e9)
      );

      await sendTransaction(transaction, connection, wallet, []);
      const res = await sendTransaction(transaction, connection, wallet, []);
      console.log(res);
    }
  };

  return <button onClick={handleClick}>sendTransaction</button>;
};
