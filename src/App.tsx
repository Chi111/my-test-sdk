import { useEffect } from "react";
// import { hashToHex } from "@glitterprotocol/glitter-sdk/dist/util/index";
// import { hashToHex } from "@glitterprotocol/glitter-sdk";
import { Searcher } from "@glitterprotocol/glitter-sdk";
import "./App.css";

export interface IDataType {
  id: string;
  title: string;
  createTime: string;
  updateTime: string;
  status: 0 | 1;
  sql: string;
  address?: string;
}

function App() {
  const init = () => {
    const searcher = new Searcher({
      URL: "https://gateway.magnode.ru/",
    });
    console.log(searcher);
    // const res = hashToHex("12312321321");
    // console.log(res);
  };
  useEffect(() => {
    init();
  });

  return <>asdjijasji</>;
}

export default App;
