import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ListOfCharacters } from "./ListOfCharacters";
const { ipcRenderer, remote } = window.require("electron");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const BattleParser = () => {
  let q = useQuery();

  const [characters, setCharacters] = useState();
  const [variant, setVariant] = useState("vertical");

  useEffect(() => {
    remote.getCurrentWindow().toggleDevTools(); 
    setCharacters(JSON.parse(q.get("data")));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { width, height } = remote.screen.getPrimaryDisplay().bounds;
    const IMAGE_HEIGHT = 216;
    const IMAGE_WIDTH = 152;
    if (characters) {
      const [x, y] =
        variant === "vertical"
          ? [IMAGE_HEIGHT, IMAGE_WIDTH * characters.length]
          : [IMAGE_WIDTH * characters.length, IMAGE_HEIGHT];
      remote
        .getCurrentWindow()
        .setSize(Math.min(x, width), Math.min(y, height));
    }
  }, [variant, characters]);

  useEffect(() => {
    ipcRenderer.on("dataUpdate", (e, a) => {
      setCharacters(a.data);
    });
    return () => ipcRenderer.removeAllListeners("hp");
  }, [setCharacters]);

  useEffect(() => {
    ipcRenderer.on("variant", (e, a) => {
      setVariant(a.variant);
    });
    return () => ipcRenderer.removeAllListeners("variant");
  }, [setVariant]);

  return (
    <>
      {characters && (
        <ListOfCharacters variant={variant} characters={characters} />
      )}
    </>
  );
};