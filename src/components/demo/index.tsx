import { useWallet } from "@solana/wallet-adapter-react";
import { Client } from "@ladderlabs/buddy-sdk";

import { Connection, Keypair, Transaction, Signer } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const MyComponent = () => {
  const { connected, publicKey } = useWallet();

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
      const connection = new Connection(WalletAdapterNetwork.Testnet);
      const wallet = Keypair.generate();

      const client = new Client(connection, publicKey || undefined);
      const organizationName = "laddercaster";

      const transaction = new Transaction();
      transaction.add(
        ...(await client.initialize.createMember(organizationName, "foo"))
      );

      await sendTransaction(transaction, connection, wallet, []);
    }
  };

  return <button onClick={handleClick}>sendTransaction</button>;
};
